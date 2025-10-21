import mongoose from "mongoose";
import { env } from "../config/env";

export async function connectMongo() {
  if (mongoose.connection.readyState === 1) return;
  await mongoose.connect(env.MONGO_URL);
  console.log("[mongo] connected");
}

const AuditSchema = new mongoose.Schema({
  at: { type: Date, default: Date.now },
  userId: Number,
  action: String,
  meta: mongoose.Schema.Types.Mixed
});

export const AuditLog = mongoose.model("AuditLog", AuditSchema);

/// ============================================================================
/// 📘 Résumé pédagogique complet — Connexion MongoDB et journalisation (AuditLog)
/// ----------------------------------------------------------------------------
/// 🔹 1. Objectif du fichier
/// Ce fichier définit la **connexion à MongoDB** (via Mongoose)
/// et déclare un modèle `AuditLog` utilisé pour enregistrer les actions effectuées
/// par les utilisateurs dans l’application (journal d’audit).
///
/// ➤ Il joue donc deux rôles :
/**
 * 1️⃣ Gérer la connexion unique et persistante à la base Mongo.
 * 2️⃣ Définir le schéma Mongoose servant à stocker les traces (Audit Logs).
 */
///
/// ----------------------------------------------------------------------------
/// 🔹 2. Dépendances
/// - `mongoose` : ORM (Object Data Modeling) pour MongoDB, proche de Prisma pour SQL.
/// - `env.MONGO_URL` : variable d’environnement contenant l’URL MongoDB,
///   injectée depuis `config/env.ts`.
///
/// Exemple d’URL :
/**
 * mongodb://mongo:27017/appdb
 *  ↳ mongo = nom du service Docker
 *  ↳ 27017 = port standard de MongoDB
 *  ↳ appdb  = nom de la base utilisée
 */
///
/// ----------------------------------------------------------------------------
/// 🔹 3. Fonction `connectMongo()`
/// Cette fonction établit la connexion avec MongoDB en évitant les doublons.
///
/// Étapes :
/**
 * 1️⃣ Vérifie `mongoose.connection.readyState` :
 *     - 0 → disconnected
 *     - 1 → connected
 *     - 2 → connecting
 *     - 3 → disconnecting
 *
 *  Si la connexion est déjà active (1), on quitte immédiatement.
 *
 * 2️⃣ Sinon, appelle `mongoose.connect(env.MONGO_URL)` :
 *     - établit la connexion
 *     - crée automatiquement le pool de connexions
 *     - garantit la persistance pour toutes les requêtes Mongoose.
 *
 * 3️⃣ Affiche `[mongo] connected` pour confirmer le succès.
 */
///
/// ✅ Avantage : la fonction peut être appelée depuis plusieurs fichiers
/// (par exemple lors du démarrage du serveur ou dans les scripts de seed),
/// sans risquer de créer plusieurs connexions simultanées.
///
/// ----------------------------------------------------------------------------
/// 🔹 4. Définition du schéma `AuditSchema`
/// Le schéma décrit la structure des documents stockés dans la collection Mongo.
///
/// Champs :
/**
 * - at       : Date de création du log (défaut = Date.now)
 * - userId   : identifiant numérique de l’utilisateur (issu de PostgreSQL)
 * - action   : chaîne indiquant l’action réalisée (ex: "POST_CREATED", "LOGIN_SUCCESS")
 * - meta     : champ flexible (type "Mixed") pour stocker tout type de données
 *              liées à l’événement (id du post, IP, contexte, etc.)
 */
///
/// Exemple de document enregistré :
/**
 * {
 *   "_id": "6717085eab92c83b1f9c1234",
 *   "at": "2025-10-21T12:00:00.000Z",
 *   "userId": 42,
 *   "action": "POST_CREATED",
 *   "meta": { "postId": 17 }
 * }
 */
///
/// ----------------------------------------------------------------------------
/// 🔹 5. Déclaration du modèle `AuditLog`
/// `mongoose.model("AuditLog", AuditSchema)` :
/**
 * ➜ Crée (ou récupère si déjà défini) un modèle lié à la collection "auditlogs".
 * ➜ Ce modèle est utilisé dans tout le projet pour insérer ou lire des journaux :
 *
 * Exemple :
 * await AuditLog.create({ userId, action: "LOGIN_SUCCESS" });
 * const logs = await AuditLog.find({ userId });
 */
///
/// ----------------------------------------------------------------------------
/// 🔹 6. Intérêt pédagogique
///
/// ✅ **Hybridation SQL + NoSQL**
/// Ce fichier illustre un cas fréquent en architecture moderne :
/// - PostgreSQL gère les données structurées (Users, Posts, Comments...),
/// - MongoDB stocke des données non-structurées ou volumineuses (logs, historiques...).
///
/// ✅ **Découplage des responsabilités**
/// - Le modèle `AuditLog` est indépendant des entités métier.
/// - Il sert à l’observabilité, sans impacter la logique principale.
///
/// ✅ **Souplesse de MongoDB**
/// - Le type `Mixed` permet de stocker des métadonnées hétérogènes
///   (pas besoin de structure fixe comme en SQL).
///
/// ✅ **Bonnes pratiques Mongoose**
/// - Connexion unique, réutilisable.
/// - Schéma clair + modèle exporté.
/// - Utilisation d’`async/await` pour gérer les opérations asynchrones.
///
/// ----------------------------------------------------------------------------
/// 🔹 7. Bonnes pratiques à retenir
/// - Toujours isoler la logique de connexion dans une fonction réutilisable.
/// - Utiliser des schémas explicites (même si Mongo est flexible).
/// - Ne jamais mélanger les logs avec les données métier.
/// - Préférer la création d’un module `db/mongo.ts` dédié (comme ici)
///   plutôt que de connecter Mongo dans plusieurs fichiers.
///
/// ----------------------------------------------------------------------------
/// 💡 En résumé
/**
 * Ce fichier est un excellent exemple d’intégration NoSQL simple et claire :
 *
 *   - Une seule fonction pour gérer la connexion (idempotente).
 *   - Un schéma `AuditLog` pour tracer les actions utilisateurs.
 *   - Un usage typique de MongoDB : stockage flexible des événements.
 *
 * ➤ Pédagogiquement :
 *   - Il montre comment compléter une stack SQL avec du NoSQL.
 *   - Il introduit Mongoose et son typage.
 *   - Il illustre l’importance des journaux applicatifs (audit, traçabilité, sécurité).
 */
/// ============================================================================