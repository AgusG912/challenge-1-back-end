import { customFetch } from "./http-fetch.plugin.js";

export const buildHttpClient = ({ baseUrl, baseHeaders = {} }) => {
    return {
        get: async (endpoint, headers) => {
            return await customFetch(`${baseUrl}${endpoint}`, "GET", { baseHeaders, headers });
        },
        patch: async (endpoint, body, headers) => {
            return await customFetch(`${baseUrl}${endpoint}`, "PATCH", { baseHeaders, body, headers });
        }
    }
}