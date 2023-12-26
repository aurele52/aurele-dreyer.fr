# Transcendence

## Prerequisites
```bash
$ npm -v
10.1.0
$ node -v
v20.9.0
```
Create a .env.docker file and a .env.local file from the empty.env.docker and empty.env.local files

## Dev
```
$ make dev
```
## Seed
```
$ source .env.local
$ export DATABASE_URL
$ (cd apps/api && npm run seed)
```

## Prod
```
$ make
```
