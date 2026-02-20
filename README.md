<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Enquête Rhône Solaire Pro

Application de questionnaire commerciale pour Rhône Solaire Pro — Découverte client & Enquête Perception des Réseaux.

## Stack

- React 19 + TypeScript
- Vite 6
- Tailwind CSS (CDN)
- Webhooks n8n pour la collecte des réponses

## Développement local

**Prérequis :** Node.js 18+

1. Cloner le dépôt :
   ```bash
   git clone <url-du-repo>
   cd enquête-rhône-solaire-pro
   ```

2. Installer les dépendances :
   ```bash
   npm install
   ```

3. Copier le fichier d'environnement :
   ```bash
   cp .env.example .env.local
   ```

4. Remplir `.env.local` avec votre clé Gemini API.

5. Lancer le serveur de développement :
   ```bash
   npm run dev
   ```

L'app sera disponible sur `http://localhost:3000`.

## Déploiement Netlify

### Via l'interface Netlify (recommandé)

1. Pusher ce dépôt sur GitHub
2. Connecter le dépôt sur [netlify.com](https://netlify.com)
3. Les paramètres de build sont détectés automatiquement via `netlify.toml` :
   - **Build command :** `npm run build`
   - **Publish directory :** `dist`
4. Dans **Site settings → Environment variables**, ajouter :
   - `GEMINI_API_KEY` = votre clé API

### Via Netlify CLI

```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod
```

## Variables d'environnement

| Variable | Description |
|---|---|
| `GEMINI_API_KEY` | Clé API Google Gemini (optionnelle si l'app n'utilise pas l'IA directement) |
