# MOONFALL — The Last Star 🌙

Original cinematic anime-fantasy web experience. This repository was empty before the initial build. It now contains 10 sections powered by a small dependency-free JavaScript frontend.

## Sections

Home · Worlds · Characters · Stories · Arena · Quests · Collection · Guild · Chronicles · Profile

Features include responsive night-sky layouts, original SVG art, interactive character favorites, a tactical arena mini-game, three quests, a crystal balance, browser-local profile and guild choice.

**Scope / honesty:** This is a frontend prototype. The mini-game and points system use local browser storage; they are not secure server-side systems. No real accounts, multiplayer, leaderboards or database exist yet. The musical icon is a placeholder and does not play audio. Character artwork is original illustrative SVG rather than animated 3D models. No third-party anime character assets or official franchise branding are used.

## Quick start

```bash
python3 -m http.server 8080
```

Open http://127.0.0.1:8080. No API key, GPU, npm dependencies or database is required. Images and fonts work offline except the optional Google Fonts request; system fonts are used if it fails.

## Docker / future DevOps practice

```bash
docker build -t moonfall:local .
docker run --rm -p 127.0.0.1:8080:80 moonfall:local
curl -I http://127.0.0.1:8080/
```

Docker configuration listens on port 80 *inside* the container and the run command binds localhost only. For a public deployment, add HTTPS and deployment security configuration.

Useful next phases: CI lint + build checks, Compose with PostgreSQL for authenticated users, Kubernetes manifests/Helm, GitOps with Argo CD, OpenTelemetry metrics/tracing and monitored canary deployment.

**Status:** Initial code committed. Real browser QA and live deployment have not been performed yet.

## Repository structure

```text
index.html      Document shell / navigation
style.css       Responsive visual design
app.js          Routes, content and local interactions
assets/         Original fantasy SVG illustrations
Dockerfile      Static Nginx deployment image
nginx.conf      Static SPA and caching configuration
```
