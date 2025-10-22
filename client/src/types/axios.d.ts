import "axios";

// --- Extension de config Axios pour nos drapeaux internes ---
declare module "axios" {
  export interface AxiosRequestConfig {
    _retry?: boolean;           // éviter boucles sur 401
    skipAuthRefresh?: boolean;  // ne pas intercepter /auth/refresh
  }
}