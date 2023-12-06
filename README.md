# Transcendence

## Prerequisites
```bash
$ npm -v
10.1.0
$ node -v
v20.9.0
```
Create a .env.docker file and a .env.localhost file from the empty.env.docker and empty.env.localhost files

## Dev
```
$ make dev
```
## Seed
```
$ source .env.localhost
$ export DATABASE_URL
$ (cd apps/api && npm run seed)
```

## Prod
```
$ make
```
