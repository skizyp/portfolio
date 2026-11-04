# Personal portfolio

A small, responsive portfolio built with plain HTML, CSS and JavaScript. It is designed for GitHub Pages and does not require a framework or build step.

## 1. Personalise it

Open `index.html` and replace:
- `YOUR NAME` and `Your Name`
- The short introduction in the About section
- Skills and interests with your real experience
- `your.email@example.com` with a public contact email, or remove the contact section

The example skills and interests are starter text. Remove anything that does not accurately describe you.

## 2. Add a project

Open `data/projects.json`. Add an object inside the array:

```json
[
  {
    "title": "World Geography Quiz",
    "description": "A desktop application for practising country locations.",
    "category": "Software",
    "date": "2026",
    "technologies": ["Python", "Qt"],
    "image": "assets/images/geography-quiz.png",
    "github": "https://github.com/YOUR-USERNAME/YOUR-REPOSITORY"
  }
]
```

For another project, add a comma after the previous `}` and paste another object. Keep the outer square brackets. JSON does not allow comments or a trailing comma.

Put the image in `assets/images/`. The `image` field is optional. The `github` field is optional too.

Categories create the filter buttons automatically. Examples: `Software`, `CAD`, `Electronics`, `Research`, `Design`.

## 3. Preview it locally

Because the project list is loaded with `fetch`, open it through a local web server rather than double-clicking `index.html`.

With Python installed, open a terminal in this folder and run:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## 4. Publish with GitHub Pages

1. Create a GitHub repository, for example `portfolio`.
2. Upload the contents of this folder to the repository's root. `index.html` must be in the root.
3. Open the repository's **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Choose branch `main` and folder `/ (root)`, then save.
6. Wait for GitHub Pages to publish. Your site will be available at `https://YOUR-USERNAME.github.io/portfolio/`.

If you name the repository `YOUR-USERNAME.github.io`, the site will instead be at `https://YOUR-USERNAME.github.io/`.

## 5. Update it later

To add or change something, edit `data/projects.json`, add images under `assets/images/`, or edit `index.html` for the text sections. Commit the changes and GitHub Pages will publish the update automatically.
