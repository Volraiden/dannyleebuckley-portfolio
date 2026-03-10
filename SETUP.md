# Setup (Netlify)

## Running locally with AI chat

The AI chat now works with plain `npm run dev`.

1. In the project root, create a `.env` file (don't commit it).
2. Add: `DEEPSEEK_API_KEY=your_key`
3. Run: `npm run dev`

Then open the Vite URL it prints (usually `http://localhost:5173`). The app will serve the same `/.netlify/functions/*` endpoints locally through Vite middleware.

If you also want booking emails locally, add:

`FORMSPREE_BOOKING_ENDPOINT=https://formspree.io/f/xxxxx`

## AI Chat on the live site – DEEPSEEK_API_KEY

The AI chat runs in a **Netlify Function**. The API key must be set in Netlify (not in code) so it stays secret.

1. Open your site in **Netlify** → **Site configuration** → **Environment variables**.
2. Click **Add a variable** or **Add from .env**.
3. **Key:** `DEEPSEEK_API_KEY`  
   **Value:** your DeepSeek API key (from https://platform.deepseek.com).
4. Set **Scopes** so the variable is available to **Functions** (e.g. choose “All” or enable “Functions”).
5. **Save**, then go to **Deploys** → **Trigger deploy** → **Deploy site** (or **Clear cache and deploy site**).

After the new deploy finishes, the AI chat should work. If it still says “not configured”, double-check the variable name is exactly `DEEPSEEK_API_KEY` and that you triggered a new deploy after adding it.
