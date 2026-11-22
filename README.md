# Saravanasai Hardware & Embedded Systems Portfolio

Interactive engineering portfolio built with React, TypeScript, Vite, Tailwind CSS, and serverless API endpoints (compatible with both Express local dev and Netlify Functions).

## Deploying to Netlify from GitHub

1. Push this repository to GitHub.
2. In **Netlify**, click **Add new site** → **Import an existing project** → select your GitHub repository.
3. Netlify automatically reads `netlify.toml` with the following settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
   - **Functions directory:** `netlify/functions`
4. (Optional) Add Environment Variables under **Site configuration → Environment variables**:
   - `GEMINI_API_KEY` — enables live Gemini AI responses in `/api/assistant/chat` (falls back to built-in project knowledge if omitted).
   - `GITHUB_CLIENT_ID` & `GITHUB_CLIENT_SECRET` — optional, raises GitHub repository API rate limits from 60 to 5,000 requests/hour.
5. Click **Deploy site**.

## Local Development

```bash
npm install
npm run dev
```
