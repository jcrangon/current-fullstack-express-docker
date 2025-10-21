import { Router } from "express";
import { register, login, logout, me, refreshToken } from "../controllers/auth.controller";

const r = Router();

r.post("/register", register);
r.post("/login", login);
r.post("/logout", logout);
r.get("/me", me);
r.post("/refresh", refreshToken);

export default r;

/// ============================================================================
/// 📘 Résumé pédagogique complet — Comprendre ce fichier de routeur Express
/// ----------------------------------------------------------------------------
/// 🔹 1. Son rôle dans une application Express
/// Ce fichier définit et exporte un **routeur Express**.
/// Un *routeur* est un mini-module capable de gérer un sous-ensemble
/// de routes (endpoints) de l’application.
///
/// ➜ Il permet de découper ton application en plusieurs fichiers clairs :
/**
 * - `routes/user.routes.ts`   → gère les routes liées aux utilisateurs
 * - `routes/auth.routes.ts`   → gère la connexion / inscription
 * - `routes/task.routes.ts`   → gère les tâches, projets, etc.
 * - `routes/index.ts`         → regroupe et monte tous les routeurs
 */
///
/// Sans cette modularisation, tout le code de routage serait concentré dans
/// ton `index.ts` ou `app.ts`, rendant le projet difficile à maintenir.
///
/// ----------------------------------------------------------------------------
/// 🔹 2. Détail du code
///
/// ```ts
/// import { Router } from "express";
/// ```
/// 👉 On importe la fonction `Router()` depuis le module **Express**.
///    Cette fonction crée un *routeur isolé* : une instance légère d’Express
///    capable de gérer ses propres routes, middlewares et paramètres.
///
/// ```ts
/// const r = Router();
/// ```
/// 👉 On crée un nouveau routeur.  
///    Ce routeur va pouvoir recevoir des définitions comme :
///
///    ```ts
///    r.get("/users", (req, res) => { ... });
///    r.post("/login", (req, res) => { ... });
///    ```
///
/// ```ts
/// export default r;
/// ```
/// 👉 On exporte le routeur afin qu’il puisse être importé ailleurs :
///
///    ```ts
///    import userRoutes from "./routes/user.routes";
///    app.use("/api", userRoutes);
///    ```
///
/// Cela permet de **monter** les routes de manière hiérarchique :
/**
 * Requête reçue → Express la transmet au routeur correspondant
 *                → le routeur décide quelle fonction exécuter selon l’URL et la méthode HTTP.
 */
///
/// ----------------------------------------------------------------------------
/// 🔹 3. Exemple d’extension typique
///
/// Par défaut ici, le routeur est vide.
/// Tu peux le compléter ainsi :
/**
 * import { Router } from "express";
 * const r = Router();
 *
 * // Exemple : route GET
 * r.get("/hello", (req, res) => {
 *   res.json({ message: "Hello world!" });
 * });
 *
 * export default r;
 */
///
/// Et l’utiliser dans ton serveur :
/**
 * import express from "express";
 * import apiRoutes from "./routes";
 *
 * const app = express();
 * app.use("/api", apiRoutes);
 * app.listen(8080);
 */
///
/// ➜ Résultat : une requête `GET http://localhost:8080/api/hello` renverra le message.
///
/// ----------------------------------------------------------------------------
/// 🔹 4. Objectif pédagogique
///
/// Ce fichier montre :
/**
 * ✅ Comment isoler les responsabilités dans une application Express.
 * ✅ L’importance de modulariser les routes pour la lisibilité et la maintenance.
 * ✅ Comment Express permet de chaîner plusieurs routeurs dans une architecture en couches.
 * ✅ La différence entre `app` (instance principale d’Express) et `Router()` (sous-applications).
 */
///
/// ----------------------------------------------------------------------------
/// En résumé :
/**
 * Ce fichier définit et exporte un **routeur Express vide**.
 * C’est une brique de base que tu étendras pour y ajouter des routes REST.
 *
 * Pédagogiquement :
 * - il initie les étudiants à la modularisation du routage,
 * - il leur fait comprendre la notion de "mini-app" (Router),
 * - et il prépare le terrain pour une architecture MVC ou modulaire.
 *
 * ➤ En pratique : un bon découpage de routeurs rend ton API maintenable,
 *   testable et évolutive.
 */
/// ============================================================================
