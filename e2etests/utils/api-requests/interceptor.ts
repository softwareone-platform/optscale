import {Page, expect} from "@playwright/test";
import {debugLog} from "../debug-logging";
import {InterceptionEntry} from "../../types/interceptor.types";
import {createInterceptorId, interceptGraphQLRequest, interceptRESTRequest} from "./helpers";

export async function apiInterceptors<T>(page: Page, config: InterceptionEntry[]): Promise<() => void> {

  const interceptorHits = new Map<string, boolean>();

  const createHitTracker = (id: string): () => void => {
    debugLog(`(HIT) Request intercepted&mocked ${id}`);
    return () => interceptorHits.set(id, true);
  };

  const interceptPromises = config.map(({url, mock, gql}, index) => {
    const urlRegExp = new RegExp(url || "/api$");
    const interceptorId = createInterceptorId(gql, url);

    debugLog(`(${index + 1}/${config.length}) Setting up interceptor for ${interceptorId}`);


    // Initialize hit tracking
    interceptorHits.set(interceptorId, false);

    if(gql) {
      return interceptGraphQLRequest(
        page,
        urlRegExp,
        gql,
        mock,
        createHitTracker(interceptorId)
      );
    }else {
      return interceptRESTRequest(
        page,
        urlRegExp,
        mock,
        createHitTracker(interceptorId)
      );
    }
  });

  await Promise.all(interceptPromises);

  return () => {
    const missingInterceptions = Array.from(interceptorHits.entries())
      .filter(([_, wasHit]) => !wasHit)
      .map(([id]) => id);

    if (missingInterceptions.length > 0) {
      const message =
        `Test failed: ${missingInterceptions.length} API interception(s) never occurred:\n` +
        missingInterceptions.map(x => `- ${x}`).join("\n");

      debugLog(message);

      expect.soft(missingInterceptions, message).toHaveLength(0);
    }
  };
}

