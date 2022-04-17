import { assertEquals, assertThrows } from "./deps.ts";
import { CDN } from "../mod.ts";

const base = "https://discord.com";
const id = "123456";
const hash = "abcdef";
const animatedHash = "a_bcdef";
const defaultAvatar = 1234 % 5;

const cdn = new CDN(base);

Deno.test("appAsset default", () => {
  assertEquals(cdn.appAsset(id, hash), `${base}/app-assets/${id}/${hash}.webp`);
});

Deno.test("appIcon default", () => {
  assertEquals(cdn.appIcon(id, hash), `${base}/app-icons/${id}/${hash}.webp`);
});

Deno.test("avatar default", () => {
  assertEquals(cdn.avatar(id, hash), `${base}/avatars/${id}/${hash}.webp`);
});

Deno.test("avatar dynamic-animated", () => {
  assertEquals(
    cdn.avatar(id, animatedHash),
    `${base}/avatars/${id}/${animatedHash}.gif`
  );
});

Deno.test("avatar dynamic-not-animated", () => {
  assertEquals(cdn.avatar(id, hash), `${base}/avatars/${id}/${hash}.webp`);
});

Deno.test("banner default", () => {
  assertEquals(cdn.banner(id, hash), `${base}/banners/${id}/${hash}.webp`);
});

Deno.test("channelIcon default", () => {
  assertEquals(
    cdn.channelIcon(id, hash),
    `${base}/channel-icons/${id}/${hash}.webp`
  );
});

Deno.test("defaultAvatar default", () => {
  assertEquals(
    cdn.defaultAvatar(defaultAvatar),
    `${base}/embed/avatars/${defaultAvatar}.png`
  );
});

Deno.test("discoverySplash default", () => {
  assertEquals(
    cdn.discoverySplash(id, hash),
    `${base}/discovery-splashes/${id}/${hash}.webp`
  );
});

Deno.test("emoji default", () => {
  assertEquals(cdn.emoji(id), `${base}/emojis/${id}.webp`);
});

Deno.test("emoji gif", () => {
  assertEquals(cdn.emoji(id, "gif"), `${base}/emojis/${id}.gif`);
});

Deno.test("guildMemberAvatar default", () => {
  assertEquals(
    cdn.guildMemberAvatar(id, id, hash),
    `${base}/guilds/${id}/users/${id}/avatars/${hash}.webp`
  );
});

Deno.test("guildMemberAvatar dynamic-animated", () => {
  assertEquals(
    cdn.guildMemberAvatar(id, id, animatedHash),
    `${base}/guilds/${id}/users/${id}/avatars/${animatedHash}.gif`
  );
});

Deno.test("guildMemberAvatar dynamic-not-animated", () => {
  assertEquals(
    cdn.guildMemberAvatar(id, id, hash),
    `${base}/guilds/${id}/users/${id}/avatars/${hash}.webp`
  );
});

Deno.test("icon default", () => {
  assertEquals(cdn.icon(id, hash), `${base}/icons/${id}/${hash}.webp`);
});

Deno.test("icon dynamic-animated", () => {
  assertEquals(
    cdn.icon(id, animatedHash),
    `${base}/icons/${id}/${animatedHash}.gif`
  );
});

Deno.test("icon dynamic-not-animated", () => {
  assertEquals(cdn.icon(id, hash), `${base}/icons/${id}/${hash}.webp`);
});

Deno.test("role icon default", () => {
  assertEquals(cdn.roleIcon(id, hash), `${base}/role-icons/${id}/${hash}.webp`);
});

Deno.test("splash default", () => {
  assertEquals(cdn.splash(id, hash), `${base}/splashes/${id}/${hash}.webp`);
});

Deno.test("sticker default", () => {
  assertEquals(cdn.sticker(id), `${base}/stickers/${id}.png`);
});

Deno.test("stickerPackBanner default", () => {
  assertEquals(
    cdn.stickerPackBanner(id),
    `${base}/app-assets/710982414301790216/store/${id}.webp`
  );
});

Deno.test("teamIcon default", () => {
  assertEquals(cdn.teamIcon(id, hash), `${base}/team-icons/${id}/${hash}.webp`);
});

Deno.test("makeURL throws on invalid size", () => {
  // @ts-expect-error: Invalid size
  assertThrows(() => cdn.avatar(id, animatedHash, { size: 5 }), RangeError);
});

Deno.test("makeURL throws on invalid extension", () => {
  assertThrows(
    () =>
      // @ts-expect-error: Invalid extension
      cdn.avatar(id, animatedHash, { extension: "tif", forceStatic: true }),
    RangeError
  );
});

Deno.test("makeURL valid size", () => {
  assertEquals(
    cdn.avatar(id, animatedHash, { size: 512 }),
    `${base}/avatars/${id}/${animatedHash}.gif?size=512`
  );
});
