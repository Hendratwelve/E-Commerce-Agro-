# Ronnie's Agro Foods

A static storefront website for Ronnie's Agro Foods.

## Run locally

Open `index.html` in a browser, or serve the folder with a simple local web server:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Publish to GitHub Pages

1. Create a new GitHub repository.
2. Push this project to the repository's `main` branch:

```bash
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

3. In GitHub, open the repository.
4. Go to Settings > Pages.
5. Set source to `Deploy from a branch`.
6. Choose the `main` branch and root folder `/`.
7. Save.

Your site will be published at:

`https://<your-username>.github.io/<your-repo-name>/`

## Keep product updates synced across all devices

This storefront used to save product edits in each browser's `localStorage`, which means one device could not update the other devices. To make product changes visible everywhere, set up a shared realtime database and enable it in `data.js`.

1. Create a Firebase project and a Realtime Database.
2. In the Realtime Database, set the rules to allow reads and writes for the demo project:

```json
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```

3. In `data.js`, change:

```js
window.RONNIES_FIREBASE_CONFIG = {
  enabled: false,
  databaseURL: 'https://your-project-default-rtdb.firebaseio.com'
};
```

to:

```js
window.RONNIES_FIREBASE_CONFIG = {
  enabled: true,
  databaseURL: 'https://your-project-default-rtdb.firebaseio.com'
};
```

Once that is enabled, every admin edit updates the shared database and all devices read the same product list.
