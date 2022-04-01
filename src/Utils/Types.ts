import type { Routes } from "discord-api-types/rest/v10";

// strong-type route strings
export type Route = ReturnType<typeof Routes[keyof typeof Routes]>;
