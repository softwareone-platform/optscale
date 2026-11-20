import type { Connect, Plugin } from "vite";
// vite.config.mts loads this file without path aliases: config.ts imports nothing, and the
// handlers import is type-only, so it is erased.
import { MOCKED_HANDLERS_MODULE, MOCKED_PATH_PREFIX } from "../config";
import type { findMockedHandler } from "./handlers";

/**
 * Serves the mocked endpoints over real HTTP on the dev server, so a call the backend cannot
 * answer yet still goes out as `fetch` and shows up in the Network panel with its real status.
 *
 * The app keeps calling `/api/auth/v2/…` exactly as it will in production — see `getApiUrl`,
 * which adds the `/api` prefix in dev. This middleware is registered before Vite's proxy, so a
 * route `handlers.ts` answers is served here and everything else falls through upstream.
 *
 * On while the MFA login flag is; `VITE_MOCKED_API=false` opts out — see `isMockedApiEnabled`.
 */

const readJsonBody = (request: Connect.IncomingMessage) =>
  new Promise<Record<string, unknown>>((resolve) => {
    let raw = "";

    request.setEncoding("utf8");
    request.on("data", (chunk: string) => {
      raw += chunk;
    });
    request.on("end", () => {
      try {
        resolve(JSON.parse(raw || "{}"));
      } catch {
        resolve({});
      }
    });
  });

export const MockedApi = (enabled: boolean): Plugin => ({
  name: "finops-mocked-api",
  apply: "serve",
  configureServer(server) {
    if (!enabled) {
      return;
    }

    server.middlewares.use((request, response, next) => {
      const url = new URL(request.url ?? "", "http://localhost");

      if (!url.pathname.startsWith(MOCKED_PATH_PREFIX)) {
        next();
        return;
      }

      const method = request.method ?? "";
      const path = url.pathname.slice("/api".length);
      const cookie = request.headers.cookie ?? "";

      // Loaded through Vite so the handlers can keep using the app's aliases and TypeScript.
      server
        .ssrLoadModule(MOCKED_HANDLERS_MODULE)
        .then(async (module) => {
          const handle = (module as { findMockedHandler: typeof findMockedHandler }).findMockedHandler({
            method,
            path,
            cookie
          });

          // Decided before the body is read, so a request left to the proxy still has its body.
          if (!handle) {
            next();
            return;
          }

          const { status, body } = await handle({
            body: await readJsonBody(request),
            query: Object.fromEntries(url.searchParams),
            authorization: request.headers.authorization ?? ""
          });

          server.config.logger.info(`[mocked-api] ${method} ${path} → ${status}`);

          if (body === undefined) {
            response.writeHead(status);
            response.end();
            return;
          }

          response.writeHead(status, { "Content-Type": "application/json" });
          response.end(JSON.stringify(body));
        })
        .catch(next);
    });
  }
});
