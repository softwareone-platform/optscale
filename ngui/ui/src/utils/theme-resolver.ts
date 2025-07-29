import fs from "fs";
import path from "path";
import type { Plugin } from "vite";

export function ThemeResolver(theme: string): Plugin {
  const themeBase = path.resolve(__dirname, `../../../themes/${theme}`);
  const srcBase = path.resolve(__dirname, "../");

  return {
    name: "vite-theme-resolver",

    load(id: string) {
      if (!id.startsWith(srcBase)) return null;

      const relativePath = path.relative(srcBase, id);
      const defaultFilePath = path.resolve(srcBase, relativePath);
      const themeFilePath = path.resolve(themeBase, relativePath);

      // If a theme file exists and we're loading the default version, override it
      if (id === defaultFilePath && fs.existsSync(themeFilePath)) {
        return fs.readFileSync(themeFilePath, "utf-8");
      }

      return null;
    }
  };
}
