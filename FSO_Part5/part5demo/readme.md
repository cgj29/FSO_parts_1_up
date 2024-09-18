when transferring to new directory and redeploying to fly.io
1) Fly Luanch to create new app (overwrite existing data)
2) If cross-env is being used in NPM RUN START command, remove it (needed for windows compatibility)
3) set port and MONGO_DB connections through fly set secrets
4) change deploy:full command to copy dist into correct directory
5) Add below to fly.toml (adjust PORT value so that it matches env value that was specified via secrets)
  [env]
    PORT="8080"
6)   internal_port = 8080 in fly.toml should match env value
7) fly scale count 1 (to limit number machines to 1)