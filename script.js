const root = document.documentElement;
const themeButton = document.getElementById("theme-toggle");
const themeLabel = themeButton.querySelector(".theme-label");
const themeIcon = themeButton.querySelector(".theme-icon");

function setTheme(theme) {
  root.dataset.theme = theme;
  const isDark = theme === "dark";
  themeLabel.textContent = isDark ? "Light mode" : "Dark mode";
  themeIcon.textContent = isDark ? "◐" : "◑";
  try { localStorage.setItem("portfolio-theme", theme); } catch (_) {}
}

let savedTheme = "dark";
try { savedTheme = localStorage.getItem("portfolio-theme") || "dark"; } catch (_) {}
setTheme(savedTheme);
themeButton.addEventListener("click", () => {
  setTheme(root.dataset.theme === "dark" ? "light" : "dark");
});

document.getElementById("year").textContent = new Date().getFullYear();

// Projects are stored separately so adding work does not require editing the layout.
const projectGrid = document.getElementById("project-grid");
const filterContainer = document.getElementById("project-filters");
let allProjects = [];

function makeProjectCard(project) {
  const article = document.createElement("article");
  article.className = "project-card";

  if (project.image) {
    const img = document.createElement("img");
    img.className = "project-image";
    img.src = project.image;
    img.alt = project.imageAlt || `${project.title} project image`;
    img.loading = "lazy";
    img.onerror = () => img.replaceWith(makePlaceholder());
    article.appendChild(img);
  } else {
    article.appendChild(makePlaceholder());
  }

  const content = document.createElement("div");
  content.className = "project-content";

  const meta = document.createElement("div");
  meta.className = "project-meta";
  const category = document.createElement("span");
  category.textContent = project.category || "Project";
  const date = document.createElement("span");
  date.textContent = project.date || "";
  meta.append(category, date);

  const title = document.createElement("h3");
  title.textContent = project.title || "Untitled project";
  const description = document.createElement("p");
  description.textContent = project.description || "";

  content.append(meta, title, description);

  if (Array.isArray(project.technologies) && project.technologies.length) {
    const tags = document.createElement("div");
    tags.className = "tags";
    project.technologies.forEach(technology => {
      const tag = document.createElement("span");
      tag.className = "tag";
      tag.textContent = technology;
      tags.appendChild(tag);
    });
    content.appendChild(tags);
  }

  if (project.github) {
    const link = document.createElement("a");
    link.className = "project-link";
    link.href = project.github;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = "View project ↗";
    content.appendChild(link);
  }
  article.appendChild(content);
  return article;
}

function makePlaceholder() {
  const placeholder = document.createElement("div");
  placeholder.className = "project-placeholder";
  placeholder.setAttribute("aria-hidden", "true");
  placeholder.textContent = "＋";
  return placeholder;
}

function renderProjects(filter = "All") {
  projectGrid.replaceChildren();
  const visible = filter === "All"
    ? allProjects
    : allProjects.filter(project => project.category === filter);

  if (!visible.length) {
    const empty = document.createElement("div");
    empty.className = "empty-state";
    const mark = document.createElement("span");
    mark.className = "empty-mark";
    mark.textContent = allProjects.length ? "⌕" : "＋";
    const heading = document.createElement("h3");
    heading.textContent = allProjects.length ? "No projects in this category." : "Your first project goes here.";
    const message = document.createElement("p");
    message.textContent = allProjects.length
      ? "Choose another category to see more projects."
      : "Add a project to data/projects.json and it will appear here automatically.";
    empty.append(mark, heading, message);
    projectGrid.appendChild(empty);
    return;
  }
  visible.forEach(project => projectGrid.appendChild(makeProjectCard(project)));
}

function renderFilters() {
  const categories = ["All", ...new Set(allProjects.map(project => project.category).filter(Boolean))];
  filterContainer.replaceChildren();
  categories.forEach((category, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `filter-button${index === 0 ? " active" : ""}`;
    button.dataset.filter = category;
    button.textContent = category;
    button.addEventListener("click", () => {
      filterContainer.querySelectorAll("button").forEach(item => item.classList.remove("active"));
      button.classList.add("active");
      renderProjects(category);
    });
    filterContainer.appendChild(button);
  });
}

async function loadProjects() {
  try {
    const response = await fetch("data/projects.json");
    if (!response.ok) throw new Error("Could not load project data");
    const projects = await response.json();
    allProjects = Array.isArray(projects) ? projects : [];
    renderFilters();
    renderProjects();
  } catch (error) {
    projectGrid.innerHTML = '<div class="empty-state"><h3>Projects could not be loaded.</h3><p>Check that data/projects.json exists and that the site is being viewed through a web server.</p></div>';
    console.error(error);
  }
}

loadProjects();
