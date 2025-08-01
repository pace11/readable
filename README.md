<h1 align="center">📖 READable</h1>
<p align="center">Simple News APP with integration using NYT (New York Times) API</p>
<p align="center">
<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
<img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" />
<img src="https://img.shields.io/badge/bun-282a36?style=for-the-badge&logo=bun&logoColor=fbf0df" />
<img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E"  />
<img src="https://img.shields.io/badge/shadcn%2Fui-000000?style=for-the-badge&logo=shadcnui&logoColor=white" />
<img src="https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white" />
<img src="https://img.shields.io/badge/Docker%20Compose-2496ED?style=for-the-badge&logo=docker&logoColor=white" />
</p>
<p align="center"><img src="./readable-logo.png" width="300" /></p>

## 🕸️ Stack

- Reactjs + Typescript ✅
- Shadcn (UI Library) ✅
- Bun ✅
- Vite ✅
- Zustand (Store Management) ✅
- Tanstack Query (Client Data Fetching) ✅
- Tanstack Router (Filesystem Routing) ✅
- Github Actions and Docker (Deployment, Infra) ✅

## ✏️ Script

| Script Name       | Description                  | Command                   |
| ----------------- | ---------------------------- | ------------------------- |
| `dev`             | Start development server     | `bun run dev`             |
| `generate-routes` | Generate tanstack routes gen | `bun run generate-routes` |
| `build`           | Build for production         | `bun run build`           |
| `preview`         | Preview production build     | `bun run preview`         |
| `lint`            | Lint codebase                | `bun run lint`            |

## 🌟 Features

- Keyword-based search functionality implemented ✅
- Suggestions appear while typing, sourced from extracted keywords in the API response ✅
- Users can bookmark articles, stored locally on browser using Zustand ✅

## ▶️ How to run

- Clone this repository
- Makesure you already install bun on globally
- Install dependency first with `bun install`
- Run development mode with `bun run dev`

## 🚀 How to deploy

- Branching Strategy with Git Flow
- First, Create new branch with prefix `feature_*` example `feature_bookmark`
- Open Pull Request and target merging branch is `master`
- Put the title and description and then please wait until reviewing and runner testing finished
- Reviewing is finished, Merging `_feature_*` branch into `master` and deployment flow is ready to go 🏃
- Flow Deployment 👇👇👇

1. Trigger GitHub Actions when push branch `master`

```yaml
on:
  push:
    branches:
      - master
```

2. Setup Docker Buildx, Login Docker Hub, Build and Push to Docker Hub

```yaml
steps:
    - name: Checkout repo
    uses: actions/checkout@v4

    - name: Set up Docker Buildx
    uses: docker/setup-buildx-action@v3

    - name: Login to Docker Hub
    uses: docker/login-action@v3
    with:
        username: ${{ secrets.DOCKER_USERNAME }}
        password: ${{ secrets.DOCKER_TOKEN }}

    - name: Build and Push to Docker Hub
    uses: docker/build-push-action@v5
    with:
        context: .
        file: ./Dockerfile
        push: true
        tags: ${{ secrets.DOCKER_USERNAME }}/readable-app:latest
        build-args: |
        VITE_NEWS_API_URL=${{ secrets.VITE_NEWS_API_URL }}
        VITE_NEWS_API_KEY=${{ secrets.VITE_NEWS_API_KEY }}
```

3. SSH to Production Server and Pull Latest Changes

```yaml
steps:
    - name: SSH to Production Server and Pull Latest Changes
    uses: appleboy/ssh-action@master
    with:
        host: ${{ secrets.HOST }}
        username: ${{ secrets.USERNAME }}
        password: ${{ secrets.PASSWORD }}
        port: ${{ secrets.PORT }}
        script: |
        cd pace-app-neo
        sudo docker pull ${{ secrets.DOCKER_USERNAME }}/readable-app:latest
        sudo docker compose up -d readable-app
```
