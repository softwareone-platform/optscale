import {Page, test} from "@playwright/test";
import {debugLog} from "../debug-logging";
import {InterceptionEntry} from "../../types/interceptor.types";
import {createInterceptorId, interceptGraphQLRequest, interceptRESTRequest} from "./helpers";

/**
 * Sets up API interceptors for Playwright tests and returns a function to verify if all interceptions occurred.
 *
 * @template T - Generic type parameter for flexibility.
 * @param {Page} page - The Playwright `Page` object where the interceptors will be applied.
 * @param {InterceptionEntry[]} config - Array of interception configurations, each specifying the URL, mock data, and whether it's a GraphQL request.
 * @param {boolean} forceFailure - Determines whether the test should fail if some interceptions are not triggered.
 * @returns {Promise<() => void>} - A function that verifies if all configured interceptions were triggered.
 */
export async function apiInterceptors<T>(page: Page, config: InterceptionEntry[], forceFailure: boolean): Promise<() => void> {

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

        if (gql) {
            return interceptGraphQLRequest(
                page,
                urlRegExp,
                gql,
                mock,
                createHitTracker(interceptorId)
            );
        } else {
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
                `${missingInterceptions.length} API interception(s) never occurred:\n` +
                missingInterceptions.map(x => `- ${x}`).join("\n");

            debugLog(message);

            // E2E tests need to set up all interceptions at the test.describe level to avoid
            // duplication for each test. However, not all tests will trigger all interceptions.
            // Therefore, we make this optional to force failure or not.
            test.fail(forceFailure, 'Some API interceptions were not triggered and forceFailure is set to true. See logs for details.');
        }
    };
}

