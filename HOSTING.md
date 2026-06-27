# 🌍 Share Ilm Adventure with a free link

The app is a plain website (no server needed), so you can put it online for **free**
and just share **one link**. Two easy options below — pick whichever you prefer.

> 💡 Good to know
> - Each child's stars, name and best scores are saved **only on their own device** — nothing comes back to you, and there are no logins. (So progress doesn't move between devices.)
> - Once a child opens the link, it also works **offline**.
> - On a phone/tablet they can **Add to Home Screen** to get an app-style icon (steps at the bottom).

---

## Option A — Netlify Drop (easiest, no account needed to try)

1. Go to **https://app.netlify.com/drop** in your web browser.
2. Open the folder that contains this project. Drag the **whole `ilm_learning` folder**
   onto the Netlify Drop page. *(Make sure `index.html` is directly inside the folder you drag — it is.)*
3. Wait a few seconds. Netlify uploads it and shows a **live link** like
   `https://shiny-pixie-12345.netlify.app` — that's your shareable URL! 🎉
4. **Share that link** with other kids/parents.

To **keep it permanently** and give it a nicer name, click **Sign up** (free) when prompted,
then in **Site settings → Change site name** rename it to something like `ilm-adventure-aaliyah`,
giving `https://ilm-adventure-aaliyah.netlify.app`.

To **update it later** after editing files: drag the folder onto the same site's
"Deploys" page (or onto app.netlify.com/drop again for a new link).

---

## Option B — GitHub Pages (best if you want a stable, free home for it)

1. Create a free account at **https://github.com**.
2. Click **New repository** → name it `ilm-adventure` → set it **Public** → **Create repository**.
3. On the new repo page, click **Add file → Upload files**. Drag in **all the files and
   folders** from this project (`index.html`, `css/`, `js/`, `icon.svg`,
   `manifest.webmanifest`, `lessons/`). Keep `index.html` at the top level. Click **Commit changes**.
4. Go to **Settings → Pages**.
5. Under **Build and deployment → Source**, choose **Deploy from a branch**.
   Pick branch **`main`** and folder **`/ (root)`**, then **Save**.
6. Wait about a minute, refresh, and GitHub shows your link, like
   `https://YOUR-USERNAME.github.io/ilm-adventure/`. **Share that link!** 🎉

To update it later: edit/upload files in the repo and the site refreshes automatically.

---

## 📲 Add it to a phone or tablet home screen (optional)

Once a child opens the link:

- **iPad / iPhone (Safari):** tap the **Share** button → **Add to Home Screen** → **Add**.
- **Android (Chrome):** tap the **⋮** menu → **Add to Home screen** / **Install app**.

It then opens full-screen with the ✨ icon, just like a real app.

---

## What to upload (if asked)

Everything in the project works, but the only files actually **needed** to run online are:

```
index.html
css/styles.css
js/data.js
js/app.js
icon.svg
manifest.webmanifest
```

The `lessons/` folder (the original source text) and the README/HOSTING notes are optional
to upload — they don't affect the app. Uploading everything is perfectly fine too.
