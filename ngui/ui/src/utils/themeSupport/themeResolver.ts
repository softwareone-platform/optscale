import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import type { Plugin } from "vite";

export function ThemeResolver(theme: string): Plugin {
  const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../");
  const themeBase = path.resolve(projectRoot, `themes/${theme}`);

  const getFileStatIfExists = (p: string) => {
    try {
      return fs.statSync(p);
    } catch {
      return null;
    }
  };

  const resolveWithExtensions = (p: string): string | null => {
    const extensions = [
      "",
      ".ts",
      ".tsx",
      ".js",
      ".jsx",
      ".mjs",
      ".cjs",
      ".css",
      ".scss",
      ".sass",
      ".less",
      ".json",
      "/index.tsx",
      "/index.ts",
      "/index.js",
      "/index.jsx",
      "/index.mjs",
      "/index.cjs",
      "/index.css"
    ];

    return (
      extensions
        .map((ext) => (ext.startsWith("/") ? path.join(p, ext) : `${p}${ext}`))
        .find((filePath) => getFileStatIfExists(filePath)?.isFile()) || null
    );
  };

  const toThemePath = (absPath: string): string | null => {
    const relativePath = path.relative(projectRoot, absPath).replace(/\\/g, "/");
    if (relativePath.startsWith(`themes/${theme}/`)) return null;
    return resolveWithExtensions(path.join(themeBase, relativePath.replace(/^src\//, "")));
  };

  return {
    name: "vite-theme-resolver",
    enforce: "pre",

    async resolveId(source, importer, options) {
      if (!importer) return null;

      const resolved = await this.resolve(source, importer, { skipSelf: true, ...options });
      if (!resolved?.id?.startsWith("/")) return null;

      return toThemePath(resolved.id);
    }
  };
}
