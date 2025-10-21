FROM node:20-alpine
WORKDIR /usr/src/app

RUN apk add --no-cache openssl

COPY package*.json ./
RUN npm install --no-audit --no-fund

COPY prisma ./prisma
RUN npx prisma generate

COPY tsconfig.json ./
COPY src ./src

EXPOSE 8080 5555
CMD ["npm","run","dev"]

# ============================================================================
# 📘 Résumé pédagogique complet — Comprendre le rôle et la logique de ce Dockerfile
# ----------------------------------------------------------------------------
# 🔹 1. Objectif du fichier
#
# Ce fichier Docker décrit **comment construire l’image du serveur Node.js**.
# Il permet de créer un environnement isolé contenant tout le nécessaire
# pour exécuter ton application Express + Prisma + TypeScript.
#
# En résumé :
#   ➜ Dockerfile = "recette" utilisée par Docker pour bâtir un conteneur exécutable.
#
# ----------------------------------------------------------------------------
# 🔹 2. Ligne par ligne
#
# --------------------------------------------------------------------------
# FROM node:20-alpine
# --------------------------------------------------------------------------
# ➜ On part d’une image officielle Node.js basée sur **Alpine Linux**.
#   - Alpine est une distribution très légère, donc rapide à télécharger.
#   - Node 20 est la version LTS (Long Term Support).
#
# ⚠️ Inconvénient : Alpine utilise musl (et non glibc),
# ce qui peut parfois poser des problèmes avec certaines dépendances binaires,
# comme Prisma (qui nécessite souvent libssl).
#
# --------------------------------------------------------------------------
# WORKDIR /usr/src/app
# --------------------------------------------------------------------------
# ➜ Définit le **répertoire de travail** à l’intérieur du conteneur.
#   Toutes les commandes suivantes s’exécuteront dans ce dossier.
#
# Exemple :
#   COPY . .  → copiera les fichiers dans /usr/src/app
#
# --------------------------------------------------------------------------
# RUN apk add --no-cache openssl
# --------------------------------------------------------------------------
# ➜ Installe la librairie OpenSSL (obligatoire pour Prisma).
#   Sans cette dépendance, Prisma renverrait une erreur du type :
#     "Prisma failed to detect libssl version"
#
#   - `apk` = gestionnaire de paquets d’Alpine.
#   - `--no-cache` = évite de stocker les fichiers d’installation.
#
# --------------------------------------------------------------------------
# COPY package*.json ./
# RUN npm install --no-audit --no-fund
# --------------------------------------------------------------------------
# ➜ Étape de copie et d’installation des dépendances :
#   - `COPY package*.json ./` → copie uniquement les manifestes npm.
#   - `RUN npm install` → installe les dépendances du projet.
#
# 💡 Astuce :
#   Copier d’abord les fichiers `package*.json` permet à Docker
#   de **mettre en cache** cette étape si les dépendances ne changent pas,
#   ce qui accélère les builds suivants.
#
#   Les flags `--no-audit` et `--no-fund` évitent les messages inutiles.
#
# --------------------------------------------------------------------------
# COPY prisma ./prisma
# RUN npx prisma generate
# --------------------------------------------------------------------------
# ➜ Copie le dossier Prisma et génère le client.
#   - `npx prisma generate` crée le client JavaScript/TypeScript
#     à partir du fichier `prisma/schema.prisma`.
#
#   Cela permet d’utiliser Prisma directement dans le code :
#     import { PrismaClient } from "@prisma/client";
#
# --------------------------------------------------------------------------
# COPY tsconfig.json ./
# COPY src ./src
# --------------------------------------------------------------------------
# ➜ Copie la configuration TypeScript et le dossier source de ton application.
#   Tu pourrais aussi copier d’autres fichiers (ex: `.env`, `README`, etc.)
#   si nécessaire.
#
# --------------------------------------------------------------------------
# EXPOSE 8080 5555
# --------------------------------------------------------------------------
# ➜ Indique que le conteneur utilisera les ports :
#   - `8080` → pour ton API Express,
#   - `5555` → pour Prisma Studio (interface graphique optionnelle).
#
# 💡 Ces lignes ne publient pas réellement les ports, elles servent
#   de **documentation interne** à Docker.
#   La publication réelle se fait dans `docker-compose.yml` via `ports:`.
#
# --------------------------------------------------------------------------
# CMD ["npm","run","dev"]
# --------------------------------------------------------------------------
# ➜ Commande de démarrage par défaut du conteneur.
#   Elle lance le script `dev` défini dans ton `package.json`,
#   qui exécute probablement :
#       "dev": "tsx watch src/index.ts"
#
#   Donc, en dev : hot-reload activé à chaque changement de fichier.
#
# ----------------------------------------------------------------------------
# 🔹 3. Cycle de vie du build
#
# 1️⃣ Docker lit ce fichier ligne par ligne.
# 2️⃣ Chaque instruction crée une "couche" (layer) dans l’image.
# 3️⃣ Les couches inchangées sont mises en cache pour accélérer les builds.
# 4️⃣ Une fois l’image construite, tu peux lancer ton app avec :
#     docker build -t myapp .
#     docker run -p 8080:8080 myapp
#
# ----------------------------------------------------------------------------
# 🔹 4. Bonnes pratiques pédagogiques
#
# ✅ Toujours utiliser une image Node LTS (20 ou 22).
# ✅ Isoler le dossier de travail (`WORKDIR`).
# ✅ Installer uniquement les dépendances nécessaires.
# ✅ Copier `package*.json` avant le reste pour tirer parti du cache Docker.
# ✅ Générer Prisma dans l’image pour ne pas avoir à le régénérer au runtime.
# ✅ Exposer les bons ports pour la clarté.
# ✅ Utiliser `CMD` (et non `RUN`) pour définir la commande par défaut.
#
# ----------------------------------------------------------------------------
# 💡 En résumé :
# ----------------------------------------------------------------------------
# Ce Dockerfile :
#   - crée une image légère basée sur Node 20 Alpine ;
#   - installe les dépendances de ton projet ;
#   - génère le client Prisma ;
#   - copie le code source ;
#   - expose les ports nécessaires ;
#   - et lance ton serveur Express en mode développement.
#
# ➤ Pédagogiquement :
#   - Il illustre la structure d’un Dockerfile Node moderne.
#   - Il montre l’importance des couches Docker et du cache.
#   - Il relie la logique Prisma + TypeScript à l’environnement conteneurisé.
#   - Il prépare les étudiants à comprendre les workflows Docker (build, run, cache).
# ============================================================================