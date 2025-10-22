import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8080";

// --- Instance unique ---
export const api: AxiosInstance = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
  headers: { "Content-Type": "application/json", Accept: "application/json" },
});

// --- État partagé pour la file d’attente pendant un refresh ---
let isRefreshing = false;
let pendingQueue: { resolve: () => void; reject: (e: unknown) => void }[] = [];

const resolveQueue = () => {
  pendingQueue.forEach(({ resolve }) => resolve());
  pendingQueue = [];
};

const rejectQueue = (error: unknown) => {
  pendingQueue.forEach(({ reject }) => reject(error));
  pendingQueue = [];
};

// --- Appel de refresh: on passe skipAuthRefresh pour ne PAS intercepter ce call ---
async function refreshAccessToken() {
  const refreshToken =
    typeof window !== "undefined" ? localStorage.getItem("refreshToken") : null;

  if (!refreshToken) throw new Error("No refresh token");

  const { data } = await api.post(
    "/auth/refresh",
    { refreshToken },                    // ← garde une forme cohérente partout
    { skipAuthRefresh: true }            // ← clé: on n’intercepte pas ce call
  );

  // Si l’API renvoie un nouveau refreshToken, on le remplace
  if (data?.refreshToken) {
    localStorage.setItem("refreshToken", data.refreshToken);
  }

  // Rien à faire pour l’access token si tu utilises un cookie httpOnly:
  // il est mis à jour côté navigateur automatiquement via Set-Cookie.
}

// --- Intercepteur global (401 -> refresh -> rejouer) ---
api.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    const original = (error.config || {}) as AxiosRequestConfig;

    // Si ce n’est pas une 401, ou si on a explicitement demandé d’ignorer,
    // ou si on a déjà retenté: on laisse l’erreur remonter.
    if (
      error.response?.status !== 401 ||
      original._retry ||
      original.skipAuthRefresh
    ) {
      return Promise.reject(error);
    }

    // Si un refresh est déjà en cours, on attend qu’il se termine
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        pendingQueue.push({
          resolve: () => resolve(api(original)),
          reject,
        });
      });
    }

    // Lance le refresh
    original._retry = true;
    isRefreshing = true;

    try {
      await refreshAccessToken();
      resolveQueue();
      return api(original); // rejoue la requête d’origine
    } catch (e) {
      rejectQueue(e);
      // Nettoyage local si le refresh échoue
      if (typeof window !== "undefined") {
        localStorage.removeItem("refreshToken");
      }
      return Promise.reject(e);
    } finally {
      isRefreshing = false;
    }
  }
);
