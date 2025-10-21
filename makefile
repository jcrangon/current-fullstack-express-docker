# =========================================================
# Makefile — Dev & Prod helpers (Docker Compose + Prisma)
# Usage:
#   make up               # dev: build + up
#   make down             # stop
#   make logs             # logs API
#   make restart          # restart API
#   make sh               # /bin/sh in API
#   make ps               # list containers
#   make studio           # open Prisma Studio (port 5555)
#   make migrate NAME=init   # prisma migrate dev --name init
#   make generate         # prisma generate
#   make deploy           # prisma migrate deploy (prod)
#   make seed             # runs npm run seed (if exists)
#   make clean            # stop + remove volumes
#   make init-env         # bootstrap .env from .env.example (if missing)
#   make up-prod          # (optionnel) build server image prod + run API only
# =========================================================

# --- Config variables ---
DC ?= docker compose
SERVICE_API ?= api
SERVICE_CLIENT ?= client
SERVICE_DB ?= postgres
PORT_API ?= 8080
PORT_STUDIO ?= 5555

# --- Helpers ---
.PHONY: up down logs restart sh ps studio migrate generate deploy seed clean init-env up-prod build-prod

# -------- Dev lifecycle --------
up:
	$(DC) up -d --build

down:
	$(DC) down

logs:
	$(DC) logs -f $(SERVICE_API)

restart:
	$(DC) restart $(SERVICE_API)

ps:
	$(DC) ps

sh:
	$(DC) exec $(SERVICE_API) sh

# -------- Prisma (dev) --------
# Exemple: make migrate NAME=add_user_profile
migrate:
	@if [ -z "$(NAME)" ]; then echo "👉 Usage: make migrate NAME=your_migration_name"; exit 1; fi
	$(DC) run --rm $(SERVICE_API) npx prisma migrate dev --name "$(NAME)"

generate:
	$(DC) run --rm $(SERVICE_API) npx prisma generate

studio:
	$(DC) exec -e BROWSER=none $(SERVICE_API) npx prisma studio --port $(PORT_STUDIO)

# -------- Prisma (prod) --------
deploy:
	$(DC) run --rm $(SERVICE_API) npx prisma migrate deploy

# Optionnel: script de seed si ton package.json définit "seed"
seed:
	$(DC) run --rm $(SERVICE_API) npm run seed

# -------- Env & housekeeping --------
init-env:
	@test -f .env || (cp .env.example .env && echo "✅ .env créé depuis .env.example")
	@echo "Vérifie/complète .env et .env.docker si besoin."

clean:
	$(DC) down -v

# -------- Prod (option simple sans compose prod dédié) --------
# Build image prod du serveur (Dockerfile multi-stage) puis run conteneur API seulement.
# Utilise les variables d'env de .env + .env.docker (comme en dev), mais sans volumes de code.
build-prod:
	docker build -t server-api:prod -f server/Dockerfile ./server

up-prod: build-prod
	@echo "🚀 Démarrage API prod (port $(PORT_API))"
	docker run --rm -d \
		--name server-api-prod \
		--env-file .env \
		--env-file .env.docker \
		-p $(PORT_API):8080 \
		server-api:prod
	@echo "➡️  http://localhost:$(PORT_API)"

# ============================================================================
# 📘 Résumé pédagogique complet — Comprendre et utiliser ce Makefile
# ----------------------------------------------------------------------------
# 🎯 Rôle du fichier
# Ce Makefile est une "télécommande" pour piloter votre stack Docker (client, API,
# bases de données) et vos tâches Prisma. Il encapsule des commandes verbeuses
# en cibles simples et mémorisables (make up, make logs, make migrate, etc.).
#
# 👉 Avantages :
#   - Productivité : une seule commande au lieu d’un long docker compose ...
#   - Cohérence d’équipe : tout le monde lance les mêmes actions.
#   - Documentation vivante : les cibles servent d’aide-mémoire.
#
# ----------------------------------------------------------------------------
# 🧩 Variables de config (section "Config variables")
# - DC             : binaire utilisé (docker compose). Surchargable : `make up DC="docker-compose"`.
# - SERVICE_API    : nom du service API dans docker-compose.yml (par défaut "api").
# - SERVICE_CLIENT : idem pour le client (non utilisé ici, mais prêt si besoin).
# - SERVICE_DB     : service DB principal (postgres).
# - PORT_API       : port de l’API publié côté hôte (pour up-prod).
# - PORT_STUDIO    : port utilisé par Prisma Studio.
#
# ➜ Ces variables rendent le Makefile adaptable sans modifier le code.
#
# ----------------------------------------------------------------------------
# 🚀 Cycle de dev (up, down, logs, restart, ps, sh)
# - `make up`     : build + démarrage des services en détaché.
# - `make down`   : arrêt propre des services.
# - `make logs`   : suit les logs du service API (utile pour debug).
# - `make restart`: redémarre uniquement l’API.
# - `make ps`     : liste l’état des conteneurs.
# - `make sh`     : ouvre un shell dans le conteneur API (diagnostic rapide).
#
# ----------------------------------------------------------------------------
# 🗃️ Tâches Prisma (dev & prod)
# - `make migrate NAME=...` : crée/applique une migration en dev (exige NAME).
# - `make generate`         : régénère le client Prisma (à faire après modif du schéma).
# - `make studio`           : ouvre Prisma Studio à PORT_STUDIO (5555).
# - `make deploy`           : applique les migrations en prod (sans générer de nouvelles).
# - `make seed`             : exécute un script de seed si défini dans package.json.
#
# 💡 Intérêt pédagogique : séparer "dev" (migrate dev) et "prod" (migrate deploy).
#
# ----------------------------------------------------------------------------
# 🧹 Entretien & env
# - `make init-env` : crée un .env depuis .env.example si absent (onboarding express).
# - `make clean`    : down + suppression des volumes (-v). ⚠️ détruit les données locales (DB, uploads).
#
# ----------------------------------------------------------------------------
# 🏗️ Prod minimaliste sans compose prod dédié
# - `make build-prod` : construit l’image prod via le Dockerfile multi-stage de `server/`.
# - `make up-prod`    : lance **uniquement** l’API en mode prod, en important .env et .env.docker,
#                       et en publiant $(PORT_API):8080. Idéal pour un test local de l’image.
#
# ⚠️ up-prod ne démarre pas Postgres/Mongo : utilisez une DB existante (locale, cloud)
#    ou démarrez-les via docker compose séparément.
#
# ----------------------------------------------------------------------------
# 🛠️ Utilisation pratique
#   # 1) Lancer la stack de dev
#   make up
#
#   # 2) Voir les logs API (Ctrl+C pour quitter l’affichage, la stack reste up)
#   make logs
#
#   # 3) Modifier le schéma Prisma puis créer une migration
#   make migrate NAME=add_profile
#   make generate
#
#   # 4) Ouvrir Prisma Studio
#   make studio
#
#   # 5) Arrêter et nettoyer complètement (attention aux données)
#   make clean
#
# ----------------------------------------------------------------------------
# ✅ Bonnes pratiques
# - Documenter vos scripts npm (dev, dev:wait, build, start) pour qu’ils soient appelables ici.
# - Garder la parité entre .env (local) et .env.docker (overrides Docker) :
#   init-env aide à standardiser l’onboarding des étudiants/collègues.
# - Utiliser des cibles Make plutôt que des README à rallonge : moins d’erreurs de saisie.
#
# ----------------------------------------------------------------------------
# 🧭 En résumé
# Ce Makefile centralise les tâches récurrentes (Docker & Prisma) en commandes
# simples, reproductibles et faciles à mémoriser. Il matérialise un workflow
# professionnel : dev fluide (up/logs/migrate), prod contrôlée (deploy/build-prod),
# et gestion d’environnement soignée (init-env/clean).
# ============================================================================