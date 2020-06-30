# Deno🦕 + Rust⚙ + Wasm🦀 !


```
docker build ./ -t deno-docker
```


```
docker container run -it -e USER=$USER  --rm -p 8080:8080 --mount src=`pwd`,target=/var/www/html,type=bind --disable-content-trust deno-docker
```


```
rustup target add wasm32-unknown-unknown && cargo install wasm-gc
```


```
cargo new --lib wasm_deno_example
```


```
cd wasm_deno
```


```
cargo build --target wasm32-unknown-unknown
```


```
wasm-gc target/wasm32-unknown-unknown/debug/wasm_deno.wasm
```


```
deno run --allow-read main.ts
```