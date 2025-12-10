# Theme Resolver Plugin

This file implements a Vite plugin for resolving theme-specific file overrides in a project. It allows you to map imports to theme directories, enabling easy customization of components and assets per theme.

> TL;DR: Keep your canonical sources in `src/…`, then drop overrides under `themes/<theme>/…`. When the plugin sees a themed counterpart, it resolves to that file instead.

---

## Why?

Large apps often share 90% of code across brands but need per‑brand overrides for a subset of files (components, styles, assets, config JSON…). This plugin lets you ship those differences in a clean directory layer without changing import sites.

---

## How it works

- The plugin activates based on the active theme set in the environment variable `VITE_APP_THEME`.
 <br> **IMPORTANT**: The value must match the theme folder name exactly for example: `your-theme-name` must math <i>src/themes/</i>`your-theme-name`.
- Supported file extensions and directory structure are configurable in `themeResolver/config.ts`.
- During vite run on build each import, the plugin:
    1. Resolves the original file using Vite.
    2. If the resolved file is absolute and matches a supported extension, it checks for a themed override.
    3. If a themed file exists, it returns that path; otherwise, it falls back to the default file.
- The resolution logic:
    - Computes the relative path from the project root.
    - Normalizes path separators.
    - Prevents infinite loops by ignoring files already inside the theme directory.
    - Strips the leading `src/` from the path before joining with the theme base.
    - Checks for the existence of files with supported extensions or index files.
- You can also add your own custom modules and components inside the theme directory.

---

## Configuration

All configurable values (extensions, theme directory, source directory) are defined in `themeResolver/config.ts`:

---

## Usage

**Import and use the plugin in your Vite config:**

   ```typescript
   import { ThemeResolver } from './ngui/ui/src/utils/themeSupport/themeResolver';

   export default {
     plugins: [
       ThemeResolver(process.env.VITE_APP_THEME || 'default')
     ]
   };
   ```

1. **Set the active theme:**
   In your .env file, set:
   VITE_APP_THEME=your-theme-name

2. Project structure example:
    ```
    src/
    └── components/
    │   └── Button.tsx <-- Default button component
    └── themes/
        └── your-theme-name/
            └── components/
                └── Button.tsx <-- Themed button component override
    ```
   If `themes/your-theme-name/components/Button.tsx` exists, imports from `src/components/Button.tsx` will be redirected to the theme file.

# Features
- Resolves file paths with multiple extensions and index files.
- Redirects imports to theme-specific files if available.
- Falls back to default files if no override exists.
- Works with TypeScript, JavaScript, CSS, and other common file types.
- All configuration is centralized in themeResolver/config.ts.
- Hot reload is supported during development.

# Limitations
- Theme can only be selected at build time (via .env or config)
- No runtime switching of themes
- No deep merging of default and override logic—manual file updates required.
- Potential for drift between theme and upstream if not monitored
- Slightly increased build complexity due to virtual resolution.
