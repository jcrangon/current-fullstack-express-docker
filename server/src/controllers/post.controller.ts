import { Request, Response } from "express";
import { prisma } from "../db/postgres";
import { AuditLog } from "../db/mongo";

export async function listPosts(_req: Request, res: Response) {
  const posts = await prisma.post.findMany({ include: { author: { select: { id: true, name: true } } } });
  res.json(posts);
}
export async function getPost(req: Request, res: Response) {
  const id = Number(req.params.id);
  const post = await prisma.post.findUnique({ where: { id }, include: { author: { select: { id: true, name: true } } } });
  if (!post) return res.status(404).json({ error: "Not found" });
  res.json(post);
}
export async function createPost(req: Request, res: Response) {
  const userId = Number((req as any).user.sub);
  const { title, content } = req.body;
  const coverUrl = req.file ? `/uploads/${req.file.filename}` : undefined;
  const post = await prisma.post.create({ data: { title, content, authorId: userId, coverUrl } });
  await AuditLog.create({ userId, action: "POST_CREATED", meta: { postId: post.id } });
  res.status(201).json(post);
}
export async function updatePost(req: Request, res: Response) {
  const id = Number(req.params.id);
  const { title, content } = req.body;
  const coverUrl = req.file ? `/uploads/${req.file.filename}` : undefined;
  const post = await prisma.post.update({
    where: { id },
    data: { title, content, ...(coverUrl ? { coverUrl } : {}) }
  });
  res.json(post);
}
export async function deletePost(req: Request, res: Response) {
  const id = Number(req.params.id);
  await prisma.post.delete({ where: { id } });
  res.json({ ok: true });
}


/// ============================================================================
/// 📘 Résumé pédagogique complet — Contrôleur de gestion des publications (Posts)
/// ----------------------------------------------------------------------------
/// 🔹 1. Objectif du fichier
/// Ce fichier définit un **ensemble de fonctions contrôleurs** Express dédiées
/// à la ressource `Post`.  
/// Chaque fonction correspond à une action de type CRUD :
/**
 * - listPosts   → lecture de tous les posts
 * - getPost     → lecture d’un post unique
 * - createPost  → création d’un nouveau post
 * - updatePost  → mise à jour d’un post existant
 * - deletePost  → suppression d’un post
 */
///
/// Ces fonctions sont destinées à être utilisées dans des routes Express :
///
/// ```ts
/// import { Router } from "express";
/// import * as postCtrl from "../controllers/post.controller";
///
/// const r = Router();
/// r.get("/", postCtrl.listPosts);
/// r.get("/:id", postCtrl.getPost);
/// r.post("/", postCtrl.createPost);
/// r.put("/:id", postCtrl.updatePost);
/// r.delete("/:id", postCtrl.deletePost);
/// export default r;
/// ```
///
/// ----------------------------------------------------------------------------
/// 🔹 2. Les dépendances
/// - `prisma` : client Prisma connecté à PostgreSQL (données structurées).
/// - `AuditLog` : modèle MongoDB servant à enregistrer les actions des utilisateurs.
/// - `express.Request/Response` : types HTTP d’Express.
///
/// Ce mélange Postgres + Mongo illustre un **pattern hybride** :
/**
 * - PostgreSQL → données transactionnelles (posts, utilisateurs…)
 * - MongoDB → logs, traces, analytics non structurés
 */
///
/// ----------------------------------------------------------------------------
/// 🔹 3. Détails des fonctions
///
/// 🟢 **listPosts**
/// - Récupère tous les posts avec les infos minimales de l’auteur (`id`, `name`).
/// - Utilise Prisma `findMany` avec un `include` pour effectuer une jointure.
/// - Envoie la liste au format JSON.
///
/// 🟢 **getPost**
/// - Récupère un post unique à partir de `req.params.id`.
/// - Si le post n’existe pas → statut `404` et message d’erreur JSON.
/// - Sinon, retourne le post complet.
///
/// 🟢 **createPost**
/// - Récupère `userId` depuis le token JWT (`req.user.sub`, injecté par un middleware d’authentification).
/// - Lit le `title`, `content` et éventuellement `req.file` (upload de couverture).
/// - Crée un post dans PostgreSQL via `prisma.post.create`.
/// - Ajoute un enregistrement dans MongoDB (table `AuditLog`) pour tracer l’action.
/// - Retourne le post créé avec un code `201 Created`.
///
/// 🟢 **updatePost**
/// - Met à jour un post existant (`title`, `content`, `coverUrl` si nouveau fichier).
/// - Utilise l’opérateur JS `(coverUrl ? { coverUrl } : {})` pour ne modifier que si fourni.
/// - Retourne le post mis à jour.
///
/// 🟢 **deletePost**
/// - Supprime le post par son `id`.
/// - Retourne un JSON `{ ok: true }` en confirmation.
///
/// ----------------------------------------------------------------------------
/// 🔹 4. Points pédagogiques clés
///
/// ✅ **Architecture REST**
/// Chaque fonction correspond à une méthode HTTP (GET, POST, PUT, DELETE) et une intention métier :
/**
 * - GET /posts        → listPosts
 * - GET /posts/:id    → getPost
 * - POST /posts       → createPost
 * - PUT /posts/:id    → updatePost
 * - DELETE /posts/:id → deletePost
 */
///
/// ✅ **ORM et relations**
/// L’utilisation de Prisma permet d’effectuer facilement des requêtes relationnelles
/// sans écrire de SQL :
/**
 * include: { author: { select: { id: true, name: true } } }
 * ➜ équivaut à une jointure "JOIN author ON post.authorId = author.id"
 */
///
/// ✅ **Typage & sécurité**
/// - Les paramètres (`req.params.id`) sont convertis en `Number` pour éviter les erreurs.
/// - Les accès utilisateurs passent par `req.user` (middleware JWT).
/// - Les réponses sont toujours formatées en JSON (bonne pratique API).
///
/// ✅ **Audit et observabilité**
/// - `AuditLog.create(...)` démontre comment enregistrer les actions
///   dans une base séparée (Mongo), illustrant la séparation entre données
///   **fonctionnelles** et **techniques/logiques**.
///
/// ✅ **Gestion des fichiers**
/// - `req.file` provient d’un middleware type `multer` chargé avant la route.
/// - `coverUrl` stocke uniquement le chemin relatif, jamais le fichier lui-même.
///
/// ----------------------------------------------------------------------------
/// 🔹 5. Bonnes pratiques à rappeler
/// - Toujours valider les entrées (`title`, `content`) avant d’insérer en DB.
/// - Gérer les erreurs avec un `try/catch` global ou un middleware d’erreurs.
/// - Ne pas exposer d’informations sensibles dans les réponses.
/// - Documenter les endpoints via Swagger / OpenAPI pour clarté pédagogique.
/// - Séparer les fonctions contrôleurs du code routeur (MVC).
///
/// ----------------------------------------------------------------------------
/// 💡 En résumé
/**
 * Ce fichier illustre un contrôleur complet CRUD moderne, combinant :
 *   - Express (routing)
 *   - Prisma (ORM SQL)
 *   - Mongo (audit/logs)
 *
 * ➤ Pédagogiquement :
 *   - Il démontre le modèle MVC : routes → contrôleur → base de données.
 *   - Il montre la valeur d’un ORM pour manipuler des données relationnelles.
 *   - Il sensibilise à l’observation et à la traçabilité des actions utilisateurs.
 *   - Il prépare les étudiants à concevoir une API REST propre et cohérente.
 */
/// ============================================================================