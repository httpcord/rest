import type { APIVersion } from "../deps/mod.ts";
import type { RESTOptions } from "../REST.ts";

// make sure the typedefs match the version we're expecting
export const DefaultVersion: typeof APIVersion = "10";
export const DefaultUserAgent = "httpcord/1.0";

export const DefaultRestOptions: RESTOptions = {
  api: "https://discord.com/api",
  cdn: "https://cdn.discordapp.com",
  headers: {},
  invalidRequestWarningInterval: 0,
  globalRequestsPerSecond: 50,
  offset: 50,
  rejectOnRateLimit: null,
  retries: 3,
  timeout: 15_000,
  version: DefaultVersion,
  hashSweepInterval: 14_400_000, // 4 Hours
  hashLifetime: 86_400_000, // 24 Hours
  handlerSweepInterval: 3_600_000, // 1 Hour
};

/**
 * The events that the REST manager emits
 */
export const enum RESTEvents {
  Debug = "restDebug",
  InvalidRequestWarning = "invalidRequestWarning",
  RateLimited = "rateLimited",
  Request = "request",
  Response = "response",
  HashSweep = "hashSweep",
  HandlerSweep = "handlerSweep",
}

export const ALLOWED_EXTENSIONS = [
  "webp",
  "png",
  "jpg",
  "jpeg",
  "gif",
] as const;
export const ALLOWED_STICKER_EXTENSIONS = ["png", "json"] as const;
export const ALLOWED_SIZES = [
  16, 32, 64, 128, 256, 512, 1024, 2048, 4096,
] as const;

export type ImageExtension = typeof ALLOWED_EXTENSIONS[number];
export type StickerExtension = typeof ALLOWED_STICKER_EXTENSIONS[number];
export type ImageSize = typeof ALLOWED_SIZES[number];
