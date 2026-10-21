import type { Connect, Plugin } from "vite";

/**
 * Serves the mocked endpoints over real HTTP on the dev server, so a call the backend cannot
 * answer yet still goes out as `fetch` and shows up in the Network panel with its real status.
 *
 * The app keeps calling `/api/auth/v2/…` exactly as it will in production — see `getApiUrl`,
 * which adds the `/api` prefix in dev. This middleware is registered before Vite's proxy, so a
 * route listed in `handlers.ts` is answered here and everything else falls through upstream.
 *
 * Opt out with `VITE_MOCKED_API=false` once the real endpoints ship.
 */

/** Only requests under this prefix are inspected; the rest skip the handler lookup entirely. */
const MOCKED_PATH_PREFIX = "/api/auth/v2/";

const HANDLERS_MODULE = "/src/themes/finops/api/mocked/http/handlers.ts";

type MockedResponse = { status: number; body: unknown };

type MockedHandlers = Record<string, (body: Record<string, string>) => Promise<MockedResponse>>;

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
        .ssrLoadModule(HANDLERS_MODULE)
        .then(async (module) => {
          const { MOCKED_ROUTES } = module as { MOCKED_ROUTES: MockedHandlers };
          const handler = MOCKED_ROUTES[route];

          if (!handler) {
            next();
            return;
          }

          const { status, body } = await handler(await readJsonBody(request));

          server.config.logger.info(`[mocked-api] ${route} → ${status}`);

          response.writeHead(status, { "Content-Type": "application/json" });
          response.end(JSON.stringify(body));
        })
        .catch(next);
    });
  }
});
