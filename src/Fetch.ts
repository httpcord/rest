import pony from "fetch-ponyfill";

// Initialize fetch ponyfill
const Pony = pony();

// Check if we are running in a browser-compatible environment, and maybe if
// fetch api is already implemented.
const isWindowPresent = typeof window !== "undefined";
const isFetchPresent = isWindowPresent && "fetch" in window;

// Use the native API if it is supported. In some places (e.g. Deno) there is
// fetch but no XHR. Plus avoid reinventing the wheel.
export const fetch = isFetchPresent ? window.fetch : Pony.fetch;
export const Request = isFetchPresent ? window.Request : Pony.Request;
export const Response = isFetchPresent ? window.Response : Pony.Response;
export const Headers = isFetchPresent ? window.Headers : Pony.Headers;
