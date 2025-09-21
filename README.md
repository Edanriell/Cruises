# Cruises

A non-responsive website experiment by Edanriell. Built to explore layout, visual design, tooling, and simple backend/stub integrations. Includes mock data, server support, and modern JS/CSS workflow.

## Table of Contents

- [Overview](#overview)
- [Image](#image)
- [Technologies](#technologies)  
- [Project Structure](#project-structure)  
- [Getting Started](#getting-started)  
- [Mock Data / Server Setup](#mock-data--server-setup)  
- [Contributing](#contributing)  
- [License & Reuse](#license--reuse)  
- [Contact](#contact)  

---

## Overview

This project is a visual and interactive website layout that is not responsive (desktop-focused). It integrates front-end tooling and a simple backend stub to support mock data. Good for seeing how projects are organized with builds, mock APIs, server scripts, and asset bundling.

---

# Image
![Cruises](https://github.com/Edanriell/Cruises/blob/master/cruises.png?raw=true)

---

## Technologies

- HTML5  
- CSS with Sass  
- JavaScript (ES6+)  
- Webpack for bundling and asset management  
- PHP (small server stub)  
- Mock data in JSON (`db.json`)  
- Configuration and style tools: `.editorconfig`, `.eslintrc`, `.prettierrc`  

---

## Project Structure

| File / Folder           | Purpose / Description                                   |
|--------------------------|----------------------------------------------------------|
| `src/`                   | Front-end source code (HTML, Sass, JS, etc.)            |
| `package.json` / `package-lock.json` | Dependencies, scripts, and builds        |
| `webpack.config.js`      | Webpack configuration for bundling, loaders, etc.       |
| `db.json`                | Mock data used for demonstration / API stubs            |
| `server.php`             | Server stub file for backend stubbing or fetching data   |
| `cruises.png`            | Screenshot or visual preview of the site                |
| `.editorconfig`, `.eslintrc`, `.prettierrc` | Coding style / lint & formatting settings |

---

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/Edanriell/Cruises.git
   cd Cruises

2. Install dependencies:

   ```bash
   npm install

3. Start development / build (depending on project):

   ```bash
   npm run dev      # or npm run build, if that is the setup

4. View the project:
   
If using static files, open the generated HTML in your browser.
If the server.php stub is used, run a PHP server (for example, php -S localhost:8000) to enable backend functionality or mock data access.

---

## Mock Data & Server Setup

db.json provides sample data for dynamic parts of the site.
server.php acts as a simple backend/API stub so that you can simulate requests (if needed).
Ensure your local environment can run PHP scripts if you want those features.

---

## Contributing

This repo is mostly about experimentation and visual / tooling proficiency. If you want to suggest improvements, refactor code structure, update build or tooling workflows, or add responsiveness, pull requests and issues are welcome. Please document changes clearly.

---

## License & Reuse

Everything here is intended for learning, experimentation, and demonstration. You are free to view, clone, and adapt. If you reuse code or assets, please give credit to Edanriell. If desired, adding an explicit license (e.g. MIT) is encouraged for clarity.

---

## Contact

GitHub: [Edanriell](https://github.com/Edanriell)
