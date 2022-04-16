// export deps with no need for conversion, thanks github for these long urls
export { AsyncQueue } from "https://raw.githubusercontent.com/sapphiredev/utilities/d8b23f00c563b0edfb8edb2e5307206d3c86f486/packages/async-queue/src/lib/AsyncQueue.ts";
export { Collection } from "https://raw.githubusercontent.com/discordjs/discord.js/e4bd07b2394f227ea06b72eb6999de9ab3127b25/packages/collection/src/index.ts";
export { EventEmitter } from "https://deno.land/std@0.135.0/node/events.ts";
export * from "https://deno.land/x/discord_api_types@0.31.1/v10.ts";

// Now convert deps that do need to be converted.
export { DiscordSnowflake } from "./Snowflake.ts";
