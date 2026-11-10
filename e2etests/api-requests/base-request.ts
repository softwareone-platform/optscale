import { type APIRequestContext } from '@playwright/test';
import { APIResponse } from 'playwright';

export abstract class BaseRequest {
  readonly request: APIRequestContext;

  protected constructor(request: APIRequestContext) {
    this.request = request;
  }

  /**
   * Sends a POST request to the specified endpoint with the provided headers and data,
   * and returns the HTTP status code of the response.
   *
   * @param {string} endpoint - The API endpoint to send the POST request to.
   * @param {{ [key: string]: string }} headers - An object containing the headers to include in the request.
   * @param {unknown} data - The data to include in the body of the POST request.
   * @returns {Promise<number>} A promise that resolves to the HTTP status code of the response.
   */
  async getPostResponseStatus(endpoint: string, headers: { [key: string]: string }, data: unknown): Promise<number> {
    const response = await this.request.post(endpoint, { headers, data });
    return response.status();
  }

  /**
   * Sends a GET request to the specified endpoint with the provided headers,
   * and returns the HTTP status code of the response.
   *
   * @param {string} endpoint - The API endpoint to send the GET request to.
   * @param {{ [key: string]: string }} headers - An object containing the headers to include in the request.
   * @returns {Promise<number>} A promise that resolves to the HTTP status code of the response.
   */
  async getGetResponseStatus(endpoint: string, headers: { [key: string]: string }): Promise<number> {
    const response = await this.request.get(endpoint, {
      headers,
    });
    await response.text();
    return response.status();
  }

  /**
   * Sends a GET request to the specified endpoint with the provided headers,
   * measures the duration of the request, and returns the duration in milliseconds.
   * Throws an error if the response status is not 200.
   *
   * @param {string} endpoint - The API endpoint to send the GET request to.
   * @param {{ [key: string]: string }} headers - An object containing the headers to include in the request.
   * @returns {Promise<number>} A promise that resolves to the duration of the request in milliseconds.
   * @throws Will throw an error if the response status is not 200.
   */
  async getGetResponseDuration(endpoint: string, headers: { [key: string]: string }): Promise<number> {
    const start = Date.now();
    const response = await this.request.get(endpoint, {
      headers,
    });
    await response.body();
    const end = Date.now();
    const duration = end - start;
    if (response.status() !== 200) {
      throw new Error(`Request failed with status ${response.status()}`);
    }
    console.log(`Request duration for ${endpoint}: ${duration} ms`);
    return duration;
  }

  /**
   * Sends a POST request to the specified endpoint with the provided headers and data,
   * and returns the full API response object.
   *
   * @param {string} endpoint - The API endpoint to send the POST request to.
   * @param {{ [key: string]: string }} headers - An object containing the headers to include in the request.
   * @param {unknown} data - The data to include in the body of the POST request.
   * @returns {Promise<APIResponse>} A promise that resolves to the API response object.
   */
  async getPostResponse(endpoint: string, headers: { [key: string]: string }, data: unknown): Promise<APIResponse> {
    return await this.request.post(endpoint, { headers, data });
  }

  /**
   * Sends a GET request to the specified endpoint with the provided headers.
   *
   * @param {string} endpoint - The API endpoint to send the GET request to.
   * @param {{ [key: string]: string }} headers - An object containing the headers to include in the request.
   * @returns {Promise<APIResponse>} A promise that resolves to the API response object.
   */
  async getGetResponse(endpoint: string, headers: { [key: string]: string }): Promise<APIResponse> {
    return await this.request.get(endpoint, {
      headers,
    });
  }
}
