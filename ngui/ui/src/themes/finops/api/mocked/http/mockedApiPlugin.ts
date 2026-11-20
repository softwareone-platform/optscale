import type { Connect, Plugin } from "vite";
// vite.config.mts loads this file without path aliases: config.ts imports nothing, and the
// handlers import is type-only, so it is erased.
import { MOCKED_HANDLERS_MODULE, MOCKED_PATH_PREFIX } from "../config";
import type { MockedHandler } from "./handlers";

/**
 * Serves the mocked endpoints over real HTTP on the dev server, so a call the backend cannot
 * answer yet still goes out as `fetch` and shows up in the Network panel with its real status.
 *
 * The app keeps calling `/api/auth/v2/…` exactly as it will in production — see `getApiUrl`,
 * which adds the `/api` prefix in dev. This middleware is registered before Vite's proxy, so a
 * route listed in `handlers.ts` is answered here and everything else falls through upstream.
 *
 * On while the `mfa_login` theme flag is; `VITE_MOCKED_API=false` opts out — see `isMockedApiEnabled`.
 */

type MockedHandlers = Record<string, MockedHandler>;

const readJsonBody = (request: Connect.IncomingMessage) =>
  new Promise<Record<string, string>>((resolve) => {
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
      const path = request.url?.split("?")[0] ?? "";

      if (!path.startsWith(MOCKED_PATH_PREFIX)) {
        next();
        return;
      }

      const route = `${request.method} ${path.slice("/api".length)}`;

      // Loaded through Vite so the handlers can keep using the app's aliases and TypeScript.
      server
        .ssrLoadModule(MOCKED_HANDLERS_MODULE)
        .then(async (module) => {
          const { MOCKED_ROUTES } = module as { MOCKED_ROUTES: MockedHandlers };
          const handler = MOCKED_ROUTES[route];

          if (!handler) {
            next();
            return;
          }

          const { status, body } = await handler(await readJsonBody(request), { cookie: request.headers.cookie ?? "" });

          server.config.logger.info(`[mocked-api] ${route} → ${status}`);

          response.writeHead(status, { "Content-Type": "application/json" });
          response.end(JSON.stringify(body));
        })
        .catch(next);
    });
  }
});
