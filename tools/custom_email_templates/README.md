# Email Template Generator

**Author**: Dawid Wołosz (<dawid.wolosz@softwareone.com>)  
**Script**: `generateEmails.js`

---

## 📋 Description

This Node.js script automates the generation of HTML email templates by merging a common header and footer with individual content files. It's designed to streamline email creation and ensure consistent structure across templates.

Content files and partials (header and footer) are pulled from an input directory, and the resulting templates are saved to an output directory.

---

## ⚙️ Requirements

- [Node.js](https://nodejs.org/) v12 or higher
- A folder structure containing:
    - A `partials` subfolder inside your input directory, with:
        - `header.html`
        - `footer.html`
    - One or more `.html` content files in the input directory (not in `partials`)
- File system access (the script uses `fs` and `path` from Node.js)

> ✅ No additional npm packages are required – everything uses built-in Node.js modules.

---

## 🚀 Usage

```bash
node tools/generate-emails/generateEmails.js --input <input_directory> --output <output_directory>
