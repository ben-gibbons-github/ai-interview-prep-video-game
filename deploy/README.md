# Deploy Folder

This folder contains the production-ready build for GitHub Pages hosting.

## Contents

- `index.html` - Main application entry point
- `assets/` - Bundled JavaScript, CSS, and WASM files (all question banks included)
- `favicon.svg`, `icons.svg` - Static assets

## How to Deploy to GitHub Pages

### Option 1: Using GitHub Pages settings
1. Go to your repository Settings → Pages
2. Set "Source" to "Deploy from a branch"
3. Select `main` branch and `/deploy` folder
4. GitHub will automatically serve the content

### Option 2: Custom domain
If using a custom domain, configure it in the same Pages settings section.

## What's Included

All question banks (easy, medium, hard, raw coding, system design, STAR stories, capacity, CTO questions, etc.) are compiled into the JavaScript bundles and will be available immediately upon first load.

No backend server is required to play the game.
