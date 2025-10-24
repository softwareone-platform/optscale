# Theme Resolver Plugin

This file implements a Vite plugin for resolving theme-specific file overrides in a project. It allows you to map imports to theme directories, enabling easy customization of components and assets per theme.

> TL;DR: Keep your canonical sources in `src/…`, then drop overrides under `themes/<theme>/…`. When the plugin sees a themed counterpart, it resolves to that file instead.

---

## Why?

Large apps often share 90% of code across brands but need per‑brand overrides for a subset of files (components, styles, assets, config JSON…). This plugin lets you ship those differences in a clean directory layer without changing import sites.

---

## Features

- Resolves file paths with multiple possible extensions and index files.
- Redirects imports to theme-specific files if available.
- Falls back to default files if no theme override exists.
- Works with TypeScript, JavaScript, CSS, and other common file types.

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
    project-root/
    ├── src/
    │   └── components/
    │       └── Button.tsx
    └── themes/
    └── your-theme-name/
    └── components/
    └── Button.tsx
    ```
   If `themes/your-theme-name/components/Button.tsx` exists, imports from `src/components/Button.tsx` will be redirected to the theme file.

# Limitations
- Theme can only be selected at build time (via .env or config)
- No runtime switching of themes
- No support for deep merging of default and override logic — manula file update is required
- Potential for drift between theme and upstream if not monitored
- Slightly increased build complexity due to virtual resolution layer
