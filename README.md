# 🦕 deno with Docker 🐳

## Build Image

```
docker build ./ -t deno-docker
```

## Run the Container

```
docker container run -it --rm -p 8080:8080 --mount src=`pwd`,target=/var/www/html,type=bind --disable-content-trust deno-docker
```

## Check If It's Installed Correctly

```
deno run https://deno.land/std/examples/welcome.ts
# Welcome to Deno 🦕
```

## ...or Start Web Server with Deno🦕

```
cd app && deno run --allow-net hello_http.ts
```
