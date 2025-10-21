# Fullstack React + Express + Prisma + PostgreSQL + Mongo (Docker dev)

## Lancer

```bash
docker compose build
docker compose up -d

# Init DB Prisma
docker compose exec api npx prisma generate
docker compose exec api npx prisma db push

# (option) Prisma Studio
docker compose exec api npx prisma studio --hostname 0.0.0.0 --port 5555
# Ouvrez http://localhost:5555
```

- Front (Vite): http://localhost:5173  
- API: http://localhost:8080  
- Uploads: http://localhost:8080/uploads/…  
- PostgreSQL: host `postgres`, db `appdb`, user `postgres`, pwd `postgres`  
- MongoDB: host `mongo`, db `appdb`  

## Variable DATABASE_URL utilisée
```
postgresql://postgres:postgres@postgres:5432/appdb?schema=public
```
