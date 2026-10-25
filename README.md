# The Makers Collective – Website Prototype

A static site built with plain HTML, CSS and JavaScript. No build step, no backend.

## Run locally
Open `index.html` in your browser. Or run `python3 -m http.server` in this folder and visit http://localhost:8000.

## Deploy on Render (Static Site)
1. Push this folder (`index.html`, `style.css`, `script.js`, `README.md` and the `images/` folder) to a GitHub or GitLab repository.
2. In the Render dashboard, choose **New → Static Site** and connect the repository.
3. Set **Build Command** to empty (or `echo "no build"`) and **Publish Directory** to `.`
4. Click **Create Static Site**. Render gives you a live URL when the deploy finishes.

## Customise
- Products, categories and creators are plain lists at the top of `script.js`.
- Photos are in the `images/` folder. Replace a file with the same name to change a photo, or add a new one and point a product's `img` to it.
- Colours are CSS variables at the top of `style.css`.

## Notes
- The cart is saved in your browser's LocalStorage. Checkout and the creator form are demos; nothing is sent anywhere.
- Fonts load from Google Fonts. Without internet, system serif and sans fonts are used.
