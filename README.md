### Installation SF 5 avec docker
```
// Initialiser les images docker
docker-compose build --no-cache
// Lancer les containers docker
docker-compose up -d
```

##### Debug docker
```
docker-compose logs -f [CONTAINER_NAME: php|nginx|db|node]
```