import {Page} from "@playwright/test";
import {debugLog} from "../debug-logging";
import {InterceptionEntry} from "../../types/interceptor.types";
import {createInterceptorId, interceptGraphQLRequest, interceptRESTRequest} from "./helpers";

export async function apiInterceptors<T>(page: Page, config: InterceptionEntry[]): Promise<() => void> {

  const interceptorHits = new Map<string, boolean>();

  const interceptPromises = config.map(({url, mock, gql}, index) => {
    const urlRegExp = new RegExp(url || "/api$");
    const interceptorId = createInterceptorId(gql, url);

    debugLog(`[${index + 1}/${config.length}] Setting up interceptor for ${interceptorId}`);


    // Initialize hit tracking
    interceptorHits.set(interceptorId, false);

    if(gql) {
      return interceptGraphQLRequest(
        page,
        urlRegExp,
        gql,
        mock,
        () => interceptorHits.set(interceptorId, true)
      );
    }else {
      return interceptRESTRequest(
        page,
        urlRegExp,
        mock,
        () => interceptorHits.set(interceptorId, true)
      );
    }
  });

  await Promise.all(interceptPromises);

  return () => {
    const missingInterceptions = Array.from(interceptorHits.entries())
      .filter(([_, wasHit]) => !wasHit)
      .map(([id]) => id);

    if (missingInterceptions.length > 0) {
      const message = `Test failed: ${missingInterceptions.length} API interceptions never occurred: ${missingInterceptions.join(', ')}`;
      throw new Error(message);
    }
  };
}

