# Email Template Generator

**Author**: Dawid Wolosz (<dawid.wolosz@softwareone.com>)  
**Script**: `generateEmails.js`

# Email Template Generator

**Author**: Dawid Wolosz (<dawid.wolosz@softwareone.com>)  
**Script**: `generateEmails.js`

---

## 📋 Description

This tool generates HTML email templates by merging reusable header.html and footer.html partials with individual content files. You can run it in two ways:

- With Node.js – for direct execution on your local machine using the generateEmails.js script.

- With Docker – for a portable, dependency-free workflow using the provided Dockerfile and copy-templates.sh script. 

Both approaches produce consistent, ready-to-use email templates for your projects or campaigns.

---

## Requirements

### CLI version
- [Node.js](https://nodejs.org/) v12 or higher
- A folder structure containing:
    - A `partials` subfolder inside your input directory, with:
        - `header.html`
        - `footer.html`
    - One or more `.html` content files in the input directory (not in `partials`)
- File system access (uses built-in Node.js modules: `fs`, `path`)

### Docker version
- [Docker](https://www.docker.com/) installed (v20+ recommended)
- Docker Desktop (optional, for managing images and containers visually)
- No need to install Node.js locally — everything runs inside the container

---

## 🚀 Usage

## CLI version
```bash
node tools/custom_email_templates/generateEmails.js --input <input_directory> --output <output_directory>
```
## 🐳 Docker Usage

### 📦 1. Run from anywhere using the helper script:

```bash
bash copy-templates.sh
```
