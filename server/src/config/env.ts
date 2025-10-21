import "dotenv/config";

const required = [
  "DATABASE_URL",
  "MONGO_URL",
  "JWT_ACCESS_SECRET",
  "JWT_REFRESH_SECRET",
  "UPLOAD_DIR"
] as const;

for (const k of required) {
  if (!process.env[k]) throw new Error(`Missing env var: ${k}`);
}

export const env = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: Number(process.env.PORT || 8080),
  DATABASE_URL: process.env.DATABASE_URL!,
  MONGO_URL: process.env.MONGO_URL!,
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET!,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET!,
  ACCESS_TOKEN_TTL: process.env.ACCESS_TOKEN_TTL || "15m",
  REFRESH_TOKEN_TTL: process.env.REFRESH_TOKEN_TTL || "7d",
  COOKIE_DOMAIN: process.env.COOKIE_DOMAIN || "localhost",
  CORS_ORIGIN: process.env.CORS_ORIGIN || "http://localhost:5173",
  UPLOAD_DIR: process.env.UPLOAD_DIR!
};

/// ============================================================================
/// 📘 Résumé pédagogique complet — Comprendre le fichier `env.ts`
/// ----------------------------------------------------------------------------
/// Ce fichier est un **point central de configuration** pour l'application.
/// Il assure à la fois :
///   ✅ le chargement automatique des variables d’environnement,  
///   ✅ la vérification de leur présence,  
///   ✅ et la centralisation de toutes les valeurs importantes dans un objet `env`.
///
/// 🔹 1. Chargement des variables avec `dotenv`
///    - La ligne `import "dotenv/config"` lit automatiquement le fichier `.env`
///      présent à la racine du projet.
///    - Chaque ligne du `.env` (ex: `DATABASE_URL=...`) est injectée dans `process.env`.
///    - Cela permet de configurer des valeurs sensibles (URL, clés JWT, etc.)
///      sans les écrire directement dans le code source.
///
/// 🔹 2. Liste des variables obligatoires
///    - Le tableau `required` énumère les clés considérées comme **indispensables**.
///      Exemple :
///        ```ts
///        const required = [ "DATABASE_URL", "MONGO_URL", ... ] as const;
///        ```
///    - Si une de ces variables n’est pas définie, le programme s’arrête
///      immédiatement avec une erreur claire :
///        ```bash
///        Error: Missing env var: DATABASE_URL
///        ```
///    - Cette vérification évite des comportements imprévisibles plus tard
///      (par exemple, un crash au moment de se connecter à la base).
///
/// 🔹 3. L’objet `env` exporté
///    - C’est **l’interface propre et typée** que tout le reste du code importe.
///      Exemple d’utilisation :
///        ```ts
///        import { env } from "./config/env";
///        console.log(env.DATABASE_URL);
///        app.listen(env.PORT);
///        ```
///    - Les valeurs sont soit :
/**       • extraites directement du fichier `.env`
 *        • soit dotées de valeurs par défaut (pour le mode développement).
 */
///
/// 🔹 4. Contenu détaillé de l’objet `env`
///
/// | Champ | Description | Exemple ou défaut |
/// |--------|--------------|------------------|
/// | `NODE_ENV` | Environnement de travail | `"development"` ou `"production"` |
/// | `PORT` | Port HTTP utilisé par le serveur | `8080` par défaut |
/// | `DATABASE_URL` | Chaîne de connexion PostgreSQL pour Prisma | `"postgresql://..."` |
/// | `MONGO_URL` | Chaîne de connexion MongoDB (second stockage) | `"mongodb://..."` |
/// | `JWT_ACCESS_SECRET` | Clé secrète pour signer les tokens d’accès | — |
/// | `JWT_REFRESH_SECRET` | Clé secrète pour les tokens de rafraîchissement | — |
/// | `ACCESS_TOKEN_TTL` | Durée de vie du token d’accès | `"15m"` |
/// | `REFRESH_TOKEN_TTL` | Durée de vie du token de rafraîchissement | `"7d"` |
/// | `COOKIE_DOMAIN` | Domaine utilisé pour les cookies | `"localhost"` |
/// | `CORS_ORIGIN` | Origine autorisée par le serveur | `"http://localhost:5173"` |
/// | `UPLOAD_DIR` | Répertoire local pour les fichiers uploadés | `"./uploads"` |
///
/// 🔹 5. Avantages pédagogiques
///    ✅ **Lisibilité** : les variables sont toutes regroupées ici, évitant
///       les `process.env.XYZ` dispersés dans tout le projet.
///    ✅ **Sécurité** : le programme s’arrête dès qu’une variable critique
///       est manquante.
///    ✅ **Portabilité** : le même code fonctionne en local et dans Docker
///       (les variables changent simplement de fichier `.env`).
///    ✅ **Typage fort** : le `as const` permet à TypeScript d’assurer une
///       vérification stricte des noms de variables requises.
///
/// 🔹 6. Bonnes pratiques à enseigner
///    - Toujours valider les variables dès le démarrage de l’application.
///    - Jamais de clé ou mot de passe codé en dur dans le code source.
///    - Utiliser différents fichiers `.env` selon l’environnement :
/**       • `.env` pour le développement
 *        • `.env.docker` pour Docker
 *        • `.env.production` pour le déploiement
 */
///    - Éviter de committer ces fichiers sensibles (ajouter `.env*` dans `.gitignore`).
///
/// ----------------------------------------------------------------------------
/// En résumé :
/**
 * `env.ts` agit comme une **passerelle de sécurité** entre ton code et ton
 * environnement d’exécution.
 * Il t’assure que toutes les variables critiques sont présentes avant que
 * l’application ne démarre, et t’offre un accès centralisé et typé à toutes
 * ces valeurs.
 *
 * L’objectif pédagogique :
 *  - Comprendre comment Node.js gère la configuration par environnement.
 *  - Apprendre à sécuriser les secrets et les clés API.
 *  - Favoriser une architecture claire, portable et maintenable.
 */
/// ============================================================================
