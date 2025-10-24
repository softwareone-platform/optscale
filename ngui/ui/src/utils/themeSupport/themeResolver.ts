import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import type { Plugin } from "vite";

export function ThemeResolver(theme: string): Plugin {
  const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../");
  const themeBase = path.resolve(projectRoot, `themes/${theme}`);

  /**
   Returns the file stats for the given path if the file exists.
   If the file does not exist or an error occurs, returns null.

   @param filePath - Path to the file to check.
   @returns fs.Stats object if the file exists, otherwise null.
   */
  const getFileStatIfExists = (filePath: string) => {
    try {
      return fs.statSync(filePath);
    } catch {
      return null;
    }
  };

  /**
   * Attempts to resolve a file path by checking for the existence of the file
   * with various possible extensions and index files. Returns the first valid
   * file path found, or null if none exist.
   *
   * @param filePath - The base file path to resolve.
   * @returns The resolved file path with a valid extension, or null.
   */
  const resolveWithExtensions = (filePath: string): string | null => {
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
        .map((ext) => (ext.startsWith("/") ? path.join(filePath, ext) : `${filePath}${ext}`))
        .find((filePath) => getFileStatIfExists(filePath)?.isFile()) || null
    );
  };

  /**
   * Maps an absolute file path to its theme-specific equivalent.
   * Computes the relative path from the project root, normalizes separators,
   * and checks if the file is already inside the theme directory.
   * If not, constructs the theme-specific path and attempts to resolve it
   * with possible extensions or index files.
   *
   * @param absolutePath - The absolute path to the original file.
   * @returns The resolved theme-specific file path, or null if not found or already themed.
   */
  const redirectToThemePath = (absolutePath: string): string | null => {
    const relativePath = path.relative(projectRoot, absolutePath).replace(/\\/g, "/");
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

      return redirectToThemePath(resolved.id);
    }
  };
}
