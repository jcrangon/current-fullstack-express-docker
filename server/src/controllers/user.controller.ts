import { Request, Response } from "express";
import { prisma } from "../db/postgres";

export async function listUsers(_req: Request, res: Response) {
  const users = await prisma.user.findMany({ select: { id: true, email: true, name: true } });
  res.json(users);
}
export async function getUser(req: Request, res: Response) {
  const id = Number(req.params.id);
  const user = await prisma.user.findUnique({ where: { id }, select: { id: true, email: true, name: true } });
  if (!user) return res.status(404).json({ error: "Not found" });
  res.json(user);
}
export async function updateUser(req: Request, res: Response) {
  const id = Number(req.params.id);
  const { name } = req.body;
  const user = await prisma.user.update({ where: { id }, data: { name }, select: { id: true, email: true, name: true } });
  res.json(user);
}
export async function deleteUser(req: Request, res: Response) {
  const id = Number(req.params.id);
  await prisma.user.delete({ where: { id } });
  res.json({ ok: true });
}


/// ============================================================================
/// 📘 Résumé pédagogique complet — Contrôleur de gestion des utilisateurs (Users)
/// ----------------------------------------------------------------------------
/// 🔹 1. Objectif du fichier
/// Ce fichier regroupe les fonctions **contrôleurs Express** associées à la ressource `User`.
/// Il permet d’interagir avec la base PostgreSQL via Prisma pour effectuer les opérations
/// CRUD classiques sur les utilisateurs :
///
/// - **listUsers**  → Récupérer la liste de tous les utilisateurs
/// - **getUser**    → Obtenir un utilisateur spécifique par son ID
/// - **updateUser** → Modifier un utilisateur existant
/// - **deleteUser** → Supprimer un utilisateur
///
/// Ces contrôleurs sont connectés à des routes Express (souvent via un fichier `user.routes.ts`).
///
/// ----------------------------------------------------------------------------
/// 🔹 2. Dépendances
/// - `express` : fournit les types `Request` et `Response`.
/// - `prisma` : client ORM connecté à PostgreSQL, simplifie les requêtes SQL.
///   Ici, Prisma remplace les requêtes SQL brutes par des appels lisibles et typés.
///
/// ----------------------------------------------------------------------------
/// 🔹 3. Détails des fonctions
///
/// 🟢 **listUsers**
/// - Exécute `prisma.user.findMany()` pour lister tous les utilisateurs.
/// - Le `select` limite les champs retournés (`id`, `email`, `name`) pour éviter
///   d’exposer des données sensibles (comme les mots de passe).
/// - Renvoie la liste en JSON.
///
/// 🟢 **getUser**
/// - Récupère un utilisateur par son identifiant (`req.params.id` → converti en `Number`).
/// - Utilise `findUnique` pour une recherche par clé primaire (`id`).
/// - Si aucun utilisateur n’est trouvé → réponse `404 Not Found`.
/// - Sinon → réponse JSON avec les infos basiques.
///
/// 🟢 **updateUser**
/// - Met à jour le nom de l’utilisateur (`req.body.name`).
/// - Utilise `prisma.user.update()` avec un `where` sur l’`id`.
/// - Ne renvoie que les champs publics (id, email, name).
/// - Exemple d’usage : route PUT `/users/:id`.
///
/// 🟢 **deleteUser**
/// - Supprime l’utilisateur identifié par `req.params.id`.
/// - Réponse simple `{ ok: true }` indiquant le succès.
/// - Bonne pratique : ne renvoyer aucune donnée supprimée pour éviter des incohérences.
///
/// ----------------------------------------------------------------------------
/// 🔹 4. Points pédagogiques essentiels
///
/// ✅ **Architecture REST**
/// Ce fichier illustre parfaitement la correspondance entre les routes HTTP et les
/// opérations CRUD sur une ressource `User` :
/**
 * GET    /users        → listUsers
 * GET    /users/:id    → getUser
 * PUT    /users/:id    → updateUser
 * DELETE /users/:id    → deleteUser
 */
///
/// ✅ **Prisma comme ORM**
/// - Prisma traduit les appels JS en requêtes SQL sûres et performantes.
/// - `select` protège contre la surexposition de champs sensibles.
/// - Le typage TypeScript empêche les fautes de frappe et incohérences de types.
///
/// ✅ **Simplicité et sécurité**
/// - Les identifiants sont convertis en `Number` pour éviter les injections SQL.
/// - Aucune donnée confidentielle (ex. `password`) n’est exposée.
/// - Les statuts HTTP (200, 404) respectent les conventions REST.
///
/// ✅ **Structure claire**
/// Chaque fonction est **pure** et **indépendante** :
/// - Elle ne contient pas de logique métier (uniquement du CRUD pur).
/// - Elle s’appuie sur Prisma pour les accès DB.
/// - Elle délègue les erreurs au middleware global (`errorHandler`).
///
/// ----------------------------------------------------------------------------
/// 🔹 5. Bonnes pratiques à rappeler
/// - Toujours valider les entrées (`name`, `id`) avant utilisation (via Zod ou Joi).
/// - En production, ajouter une vérification d’autorisation (ex: un user ne peut
///   modifier que son propre compte).
/// - Gérer proprement les erreurs Prisma (`try/catch` → `res.status(400)`).
/// - Ne jamais exposer `password` ou `tokens` dans les sélections Prisma.
/// - Préparer une version `createUser` si le registre d’utilisateurs est ouvert.
///
/// ----------------------------------------------------------------------------
/// 💡 En résumé
/**
 * Ce fichier illustre un **contrôleur REST minimaliste** et bien structuré :
 *   - chaque fonction correspond à une action CRUD claire ;
 *   - les sélections Prisma évitent toute fuite d’informations sensibles ;
 *   - le code est concis, lisible et aisément testable.
 *
 * ➤ Pédagogiquement :
 *   - il enseigne l’usage basique mais sûr de Prisma ;
 *   - il montre le lien entre routes Express et modèle de données ;
 *   - il sensibilise à la sécurité applicative (exposition minimale, statuts HTTP corrects).
 */
/// ============================================================================