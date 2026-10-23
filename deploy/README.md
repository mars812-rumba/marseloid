# Deployment

Production deployment: 2026-10-23, https://marseloid.online.
Repository: git@github.com:mars812-rumba/marseloid.git, branch main.
Isolated Docker compose project `marseloid`; localhost ports 3102/8102.

## Public ingress and SSL

Only `/etc/nginx/sites-available/marseloid.online` and its sites-enabled symlink belong to this project.
Templates: `deploy/nginx.http.conf` (ACME bootstrap), `deploy/nginx.https.conf` (production).
Apply with `bash deploy/apply-nginx.sh http|https`; it saves a private backup outside Nginx includes, validates, reloads gracefully and restores on failure. Never run it for another domain.

Certificate: `/etc/letsencrypt/live/marseloid.online/`, managed by Certbot's existing timer.
HTTP ACME webroot: `/var/www/letsencrypt`. Keep the challenge exception when redirecting HTTP to HTTPS.
Domain-specific renewal hook: `/etc/letsencrypt/renewal-hooks/deploy/50-marseloid-nginx`, sourced from `deploy/renew-nginx.sh`.
No private keys or certificates belong in Git.

Bootstrap backups: `/home/marseloid-nginx-backup-Y8SlRCFU` (no prior vhost).
The original HTTP config is backed up at `/home/marseloid-nginx-backup-9zO58nIg/marseloid.online`.

To disable a newly created ingress, unlink only `/etc/nginx/sites-enabled/marseloid.online`, then run `nginx -t` and `systemctl reload nginx`. Do not touch other sites.

## Local preview

```
npm ci
python3 -m venv .venv
.venv/bin/pip install -r backend/requirements.txt
.venv/bin/uvicorn backend.app:app --host 127.0.0.1 --port 8102
# Separate terminal:
npm run build
npm start
```

These production ports are now occupied by Docker. Stop only the Marseloid containers before using these local preview commands, or select other development ports.
Preview: http://127.0.0.1:3102. API: http://127.0.0.1:8102/api/health.
For a remote VS Code workspace, forward port 3102 to inspect locally.

## Isolated production containers

```
docker compose config --quiet
docker compose up -d --build --wait
docker compose ps
```

Only localhost ports 3102/8102; no production host changes. The frontend image builds its API rewrite for api:8102. Local npm builds default to 127.0.0.1:8102.
Docker must be run with the host's configured daemon permissions; never chmod 666 the socket.

Normal application updates require only `docker compose up -d --build --wait`; no Nginx or certificate changes. Do not expose port 8102 publicly. Docker logs rotate at 10 MiB × 3 files per container.

## Bot

Project key `marseloid`, root `/home/marseloid`, branch `main`.
Tests never deploy. Deployment uses this compose project only.
The user-approved remote is `origin`, git@github.com:mars812-rumba/marseloid.git. Do not force-push or push unrelated projects. The bot's confirmed release workflow runs project checks, scoped commit/push and this compose deployment.
Editorial schedules of Sunny and Dimohod are not connected to this site.
