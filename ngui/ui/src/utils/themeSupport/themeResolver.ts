import fs from "fs";
import path from "path";
import {fileURLToPath} from "url";
import type {Plugin} from "vite";

const currentFilename = fileURLToPath(import.meta.url);
const currentDirname = path.dirname(currentFilename);

export function ThemeResolver(theme: string): Plugin {
  const themeBase = path.resolve(currentDirname, `../../themes/${theme}`);
  const srcBase = path.resolve(currentDirname, "../../");

  console.log(`ThemeResolver: Using theme base at ${themeBase}`);

  return {
    name: "vite-theme-resolver",

    load(id: string) {
      if (!id.startsWith(srcBase)) return null;

      const relativePath = path.relative(srcBase, id);
      const defaultFilePath = path.resolve(srcBase, relativePath);
      const themeFilePath = path.resolve(themeBase, relativePath);

      // If a theme file exists, and we're loading the default version, override it
      if (id === defaultFilePath && fs.existsSync(themeFilePath)) {
        console.log(`Resolving theme file: ${id} ${relativePath} and defaultFilePath: ${defaultFilePath}`);
        return fs.readFileSync(themeFilePath, "utf-8");
      }

      return null;
    },
    handleHotUpdate({ file, server }) {
      // TODO: Add logic to handle hot updates for theme files
      if (file.includes("/themes/")) {
        console.log(`Theme file changed: ${file}`);

        server.ws.send({
          type: "full-reload",
          path: file
        });

        // Return empty array to prevent default HMR handling
        return [];
      }

      // Return undefined for non-theme files to use default HMR
      return undefined;
    }
  };
}
