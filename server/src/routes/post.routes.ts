import { Router } from "express";
import { requireAuth } from "../middlewares/auth.middleware";
import { upload } from "../middlewares/multer.middleware";
import { createPost, listPosts, getPost, updatePost, deletePost } from "../controllers/post.controller";

const r = Router();
r.get("/", listPosts);
r.get("/:id", getPost);
r.post("/", requireAuth, upload.single("cover"), createPost);
r.put("/:id", requireAuth, upload.single("cover"), updatePost);
r.delete("/:id", requireAuth, deletePost);
export default r;


/// ============================================================================
/// 📘 Résumé pédagogique complet — Comprendre la structure et le rôle d’un routeur Express
/// ----------------------------------------------------------------------------
/// 🔹 1. Qu’est-ce qu’un routeur Express ?
///
/// Un **routeur** est un composant interne d’Express qui agit comme une
/// **mini-application** : il peut contenir ses propres routes, middlewares
/// et comportements.  
/// On peut donc créer plusieurs routeurs spécialisés (authentification, utilisateurs,
/// produits, etc.) et les regrouper dans une seule application principale.
///
/// 👉 En d’autres termes :
/**
 * - `app` (l’instance principale Express) → le point d’entrée global du serveur.
 * - `Router()` → des sous-modules de routage pour organiser le code.
 */
///
/// ----------------------------------------------------------------------------
/// 🔹 2. Ligne par ligne
///
/// ```ts
/// import { Router } from "express";
/// ```
/// ➜ On importe la fonction `Router()` fournie par Express.
///
/// ```ts
/// const r = Router();
/// ```
/// ➜ On crée une nouvelle instance de routeur.
///    Ce routeur est vide pour l’instant, mais il pourra ensuite contenir :
///
/// ```ts
/// r.get("/users", getAllUsers);
/// r.post("/login", loginHandler);
/// r.delete("/tasks/:id", deleteTask);
/// ```
///
/// ```ts
/// export default r;
/// ```
/// ➜ On exporte le routeur pour pouvoir le **monter** dans le fichier principal
/// de l’application (`app.ts` ou `index.ts`), par exemple :
///
/// ```ts
/// import express from "express";
/// import apiRoutes from "./routes";
///
/// const app = express();
/// app.use("/api", apiRoutes);
/// ```
///
/// Cela permet à Express de déléguer toutes les requêtes commençant par `/api`
/// à ce routeur, qui se chargera de les traiter.
///
/// ----------------------------------------------------------------------------
/// 🔹 3. Intérêt de ce fichier vide au départ
///
/// Même vide, ce fichier sert de **point central de regroupement** :
/// - Il permet de **préparer la structure** avant d’ajouter les routes.
/// - Il rend le projet immédiatement **modulaire et extensible**.
/// - Tu peux facilement ajouter ou supprimer des groupes de routes
///   sans modifier le cœur de l’application.
///
/// Exemple d’évolution :
/**
 * import { Router } from "express";
 * import userRoutes from "./user.routes";
 * import authRoutes from "./auth.routes";
 *
 * const r = Router();
 * r.use("/users", userRoutes);
 * r.use("/auth", authRoutes);
 *
 * export default r;
 */
///
/// ----------------------------------------------------------------------------
/// 🔹 4. Objectif pédagogique
///
/// Ce fichier illustre plusieurs concepts clés :
///
/// ✅ **La modularisation** : découper le code en modules indépendants.
/// ✅ **Le principe de composition** : chaque routeur est une mini-application.
/// ✅ **La maintenabilité** : ajouter un nouveau module de routes n’affecte pas les autres.
/// ✅ **La hiérarchie d’URL** : les routeurs peuvent être montés sous des chemins différents.
///
/// ----------------------------------------------------------------------------
/// 🔹 5. En résumé :
/**
 * Ce fichier définit et exporte un **routeur Express vide**,
 * servant de squelette pour organiser ton API.
 *
 * ➤ Il prépare la structure d’un projet Express modulaire :
 *   - Un point d’entrée principal (`app.ts`)
 *   - Plusieurs routeurs spécialisés (`user.routes.ts`, `auth.routes.ts`, etc.)
 *   - Un routeur global d’agrégation (`index.ts`)
 *
 * 💡 Pédagogiquement :
 *   - Les étudiants comprennent comment Express gère les routes.
 *   - Ils apprennent à créer une architecture claire et évolutive.
 *   - Ils voient qu’un routeur peut être instancié même avant d’être rempli.
 */
/// ============================================================================
