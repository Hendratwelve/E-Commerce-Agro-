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
