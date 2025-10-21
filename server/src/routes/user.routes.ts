import { Router } from "express";
import { requireAuth } from "../middlewares/auth.middleware";
import { listUsers, getUser, updateUser, deleteUser } from "../controllers/user.controller";
const r = Router();
r.get("/", requireAuth, listUsers);
r.get("/:id", requireAuth, getUser);
r.put("/:id", requireAuth, updateUser);
r.delete("/:id", requireAuth, deleteUser);
export default r;


/// ============================================================================
/// 📘 Résumé pédagogique complet — Introduction au routeur Express
/// ----------------------------------------------------------------------------
/// 🔹 1. Objectif du fichier
///
/// Ce fichier crée et exporte un **routeur Express**.  
/// Un *routeur* est une **mini-application Express** qui gère un ensemble
/// spécifique de routes et de middlewares.  
///
/// ➜ Il permet de **découper** le code de ton serveur en modules logiques,
/// pour éviter que toutes les routes ne soient définies dans un seul fichier
/// `app.ts` ou `index.ts`.
///
/// Exemple d’organisation typique :
///
/// ```bash
/// routes/
/// ├── index.ts         # regroupe les autres routeurs
/// ├── user.routes.ts   # routes liées aux utilisateurs
/// ├── auth.routes.ts   # routes d’authentification
/// └── task.routes.ts   # routes liées aux tâches
/// ```
///
/// ----------------------------------------------------------------------------
/// 🔹 2. Ligne par ligne
///
/// ```ts
/// import { Router } from "express";
/// ```
/// ➜ On importe la fonction `Router()` depuis Express.  
///   C’est une fonction qui crée un **objet routeur** indépendant.
///
/// ```ts
/// const r = Router();
/// ```
/// ➜ On crée une nouvelle instance de routeur.  
///   Pour l’instant, il ne contient **aucune route** ni **aucun middleware**,  
///   mais on pourra y ajouter ensuite des routes spécifiques :
///
/// ```ts
/// r.get("/hello", (req, res) => res.send("Hello world!"));
/// r.post("/login", loginController);
/// ```
///
/// ```ts
/// export default r;
/// ```
/// ➜ On exporte ce routeur pour l’utiliser ailleurs, généralement dans
/// le fichier principal du serveur :
///
/// ```ts
/// import express from "express";
/// import apiRoutes from "./routes";
///
/// const app = express();
/// app.use("/api", apiRoutes);
/// ```
///
/// ➜ Ainsi, toute requête commençant par `/api` sera redirigée vers ce routeur.
///
/// ----------------------------------------------------------------------------
/// 🔹 3. Intérêt d’un routeur vide au début
///
/// Même si ce routeur est vide, il **prépare la structure du projet**.
/// Cela permet :
///
/// ✅ d’instaurer une architecture claire et extensible,  
/// ✅ de définir un point d’entrée unique pour toutes les routes,  
/// ✅ de rendre ton code plus facile à lire et à maintenir.
///
/// Exemple d’évolution future :
///
/// ```ts
/// import { Router } from "express";
/// import userRoutes from "./user.routes";
/// import authRoutes from "./auth.routes";
///
/// const r = Router();
/// r.use("/users", userRoutes);
/// r.use("/auth", authRoutes);
///
/// export default r;
/// ```
///
/// ----------------------------------------------------------------------------
/// 🔹 4. Points pédagogiques clés
///
/// ✅ **Compréhension du modèle Express :**
///    - `app` = application principale
///    - `Router()` = sous-application pour un groupe de routes
///
/// ✅ **Modularisation du code :**
///    - Chaque fichier devient un module clair, isolé et testable.
///
/// ✅ **Réutilisabilité et maintenance :**
///    - On peut facilement ajouter ou supprimer des fonctionnalités
///      sans casser la structure globale.
///
/// ✅ **Architecture MVC possible :**
///    - Les routeurs peuvent correspondre à des contrôleurs ou des domaines du projet.
///
/// ----------------------------------------------------------------------------
/// 🔹 5. En résumé :
/**
 * Ce fichier crée et exporte un **routeur Express vide**.
 * Il constitue une brique de base pour organiser ton application web en modules.
 *
 * ➤ En pratique :
 *   - Le routeur est un point d’attache pour les futures routes.
 *   - Il facilite la maintenance et la compréhension du code.
 *
 * 💡 Pédagogiquement :
 *   - Il illustre la notion de "sous-application" dans Express.
 *   - Il introduit la modularisation du routage.
 *   - Il prépare les étudiants à structurer leurs API REST de manière claire et évolutive.
 */
/// ============================================================================
