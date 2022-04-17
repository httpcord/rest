import { denock, DenockOptions, assertObjectMatch } from "./deps.ts";
import { DiscordSnowflake, Routes, Snowflake } from "../lib/deps/mod.ts";
import { REST, DefaultRestOptions, APIRequest } from "../mod.ts";

const newSnowflake: Snowflake = DiscordSnowflake.generate().toString();

const api = new REST().setToken("A-Very-Fake-Token");
const url = new URL(`${DefaultRestOptions.api}/v${DefaultRestOptions.version}`);

function nock(
  method: DenockOptions["method"],
  route: string,
  opts: Partial<DenockOptions> & Pick<DenockOptions, "responseBody">
) {
  return denock({
    method,
    host: url.host,
    path: `${url.pathname}${route}`,
    protocol: "https",
    ...opts,
  });
}

// nock(`${DefaultRestOptions.api}/v${DefaultRestOptions.version}`)
//   .get("/getQuery")
//   .query({ foo: "bar", hello: "world" })
//   .reply(200, { test: true })
//   .get("/getAuth")
//   .times(3)
//   .reply(200, function handler() {
//     // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
//     return { auth: this.req.headers.authorization?.[0] ?? null };
//   })
//   .get("/getReason")
//   .times(3)
//   .reply(200, function handler() {
//     // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
//     return { reason: this.req.headers["x-audit-log-reason"]?.[0] ?? null };
//   })
//   .post("/urlEncoded")
//   .reply(200, (_, body) => body)
//   .post("/postEcho")
//   .reply(200, (_, body) => body)
//   .post("/postFile")
//   .times(5)
//   .reply(200, (_, body) => ({
//     // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
//     body: body
//       .replace(/\r\n/g, "\n")
//       .replace(/-+\d+-*\n?/g, "")
//       .trim(),
//   }))
//   .delete("/channels/339942739275677727/messages/392063687801700356")
//   .reply(200, { test: true })
//   .delete(`/channels/339942739275677727/messages/${newSnowflake}`)
//   .reply(200, { test: true })
//   .get("/request")
//   .times(2)
//   .reply(200, { test: true });

Deno.test("simple GET", async () => {
  nock("GET", "/gateway", { responseBody: { test: true } });
  const r = await api.get("/gateway");
  assertObjectMatch(r!, { test: true });
});

Deno.test("simple DELETE", async () => {
  nock("DELETE", "/gateway", { responseBody: { test: true } });
  const r = await api.delete("/gateway");
  assertObjectMatch(r!, { test: true });
});

Deno.test("simple PATCH", async () => {
  nock("PATCH", "/gateway", { responseBody: { test: true } });
  const r = await api.patch("/gateway");
  assertObjectMatch(r!, { test: true });
});

Deno.test("simple PUT", async () => {
  nock("PUT", "/gateway", { responseBody: { test: true } });
  const r = await api.put("/gateway");
  assertObjectMatch(r!, { test: true });
});

Deno.test("simple POST", async () => {
  nock("POST", "/gateway", { responseBody: { test: true } });
  const r = await api.post("/gateway");
  assertObjectMatch(r!, { test: true });
});

// test("getQuery", async () => {
//   expect(
//     await api.get("/getQuery", {
//       query: new URLSearchParams([
//         ["foo", "bar"],
//         ["hello", "world"],
//       ]),
//     })
//   ).toStrictEqual({ test: true });
// });

// test("getAuth default", async () => {
//   expect(await api.get("/getAuth")).toStrictEqual({
//     auth: "Bot A-Very-Fake-Token",
//   });
// });

// test("getAuth unauthorized", async () => {
//   expect(await api.get("/getAuth", { auth: false })).toStrictEqual({
//     auth: null,
//   });
// });

// test("getAuth authorized", async () => {
//   expect(await api.get("/getAuth", { auth: true })).toStrictEqual({
//     auth: "Bot A-Very-Fake-Token",
//   });
// });

// test("getReason default", async () => {
//   expect(await api.get("/getReason")).toStrictEqual({ reason: null });
// });

// test("getReason plain text", async () => {
//   expect(await api.get("/getReason", { reason: "Hello" })).toStrictEqual({
//     reason: "Hello",
//   });
// });

// test("getReason encoded", async () => {
//   expect(await api.get("/getReason", { reason: "😄" })).toStrictEqual({
//     reason: "%F0%9F%98%84",
//   });
// });

// test("postFile empty", async () => {
//   expect(await api.post("/postFile", { files: [] })).toStrictEqual({
//     body: "",
//   });
// });

// test("postFile file (string)", async () => {
//   expect(
//     await api.post("/postFile", {
//       files: [{ name: "out.txt", data: "Hello" }],
//     })
//   ).toStrictEqual({
//     body: [
//       'Content-Disposition: form-data; name="files[0]"; filename="out.txt"',
//       "Content-Type: text/plain",
//       "",
//       "Hello",
//     ].join("\n"),
//   });
// });

// test("postFile file and JSON", async () => {
//   expect(
//     await api.post("/postFile", {
//       files: [{ name: "out.txt", data: Buffer.from("Hello") }],
//       body: { foo: "bar" },
//     })
//   ).toStrictEqual({
//     body: [
//       'Content-Disposition: form-data; name="files[0]"; filename="out.txt"',
//       "Content-Type: text/plain",
//       "",
//       "Hello",
//       'Content-Disposition: form-data; name="payload_json"',
//       "",
//       '{"foo":"bar"}',
//     ].join("\n"),
//   });
// });

// test("postFile files and JSON", async () => {
//   expect(
//     await api.post("/postFile", {
//       files: [
//         { name: "out.txt", data: Buffer.from("Hello") },
//         { name: "out.txt", data: Buffer.from("Hi") },
//       ],
//       body: { files: [{ id: 0, description: "test" }] },
//     })
//   ).toStrictEqual({
//     body: [
//       'Content-Disposition: form-data; name="files[0]"; filename="out.txt"',
//       "Content-Type: text/plain",
//       "",
//       "Hello",
//       'Content-Disposition: form-data; name="files[1]"; filename="out.txt"',
//       "Content-Type: text/plain",
//       "",
//       "Hi",
//       'Content-Disposition: form-data; name="payload_json"',
//       "",
//       '{"files":[{"id":0,"description":"test"}]}',
//     ].join("\n"),
//   });
// });

// test("postFile sticker and JSON", async () => {
//   expect(
//     await api.post("/postFile", {
//       files: [
//         { key: "file", name: "sticker.png", data: Buffer.from("Sticker") },
//       ],
//       body: { foo: "bar" },
//       appendToFormData: true,
//     })
//   ).toStrictEqual({
//     body: [
//       'Content-Disposition: form-data; name="file"; filename="sticker.png"',
//       "Content-Type: image/png",
//       "",
//       "Sticker",
//       'Content-Disposition: form-data; name="foo"',
//       "",
//       "bar",
//     ].join("\n"),
//   });
// });

// test("urlEncoded", async () => {
//   const body = new URLSearchParams([
//     ["client_id", "1234567890123545678"],
//     ["client_secret", "totally-valid-secret"],
//     ["redirect_uri", "http://localhost"],
//     ["grant_type", "authorization_code"],
//     ["code", "very-invalid-code"],
//   ]);
//   expect(
//     new Uint8Array(
//       (await api.post("/urlEncoded", {
//         body,
//         passThroughBody: true,
//         auth: false,
//       })) as ArrayBuffer
//     )
//   ).toStrictEqual(new Uint8Array(Buffer.from(body.toString())));
// });

// test("postEcho", async () => {
//   expect(await api.post("/postEcho", { body: { foo: "bar" } })).toStrictEqual({
//     foo: "bar",
//   });
// });

// test("Old Message Delete Edge-Case: Old message", async () => {
//   expect(
//     await api.delete(
//       Routes.channelMessage("339942739275677727", "392063687801700356")
//     )
//   ).toStrictEqual({
//     test: true,
//   });
// });

// test("Old Message Delete Edge-Case: New message", async () => {
//   expect(
//     await api.delete(Routes.channelMessage("339942739275677727", newSnowflake))
//   ).toStrictEqual({ test: true });
// });

// test("Request and Response Events", async () => {
//   const requestListener = jest.fn();
//   const responseListener = jest.fn();

//   api.on("request", requestListener);
//   api.on("response", responseListener);

//   await api.get("/request");

//   expect(requestListener).toHaveBeenCalledTimes(1);
//   expect(responseListener).toHaveBeenCalledTimes(1);
//   expect(requestListener).toHaveBeenLastCalledWith<[APIRequest]>(
//     expect.objectContaining({
//       method: "get",
//       path: "/request",
//       route: "/request",
//       data: { files: undefined, body: undefined, auth: true },
//       retries: 0,
//     }) as APIRequest
//   );
//   expect(responseListener).toHaveBeenLastCalledWith<[APIRequest, Response]>(
//     expect.objectContaining({
//       method: "get",
//       path: "/request",
//       route: "/request",
//       data: { files: undefined, body: undefined, auth: true },
//       retries: 0,
//     }) as APIRequest,
//     expect.objectContaining({ status: 200, statusText: "OK" }) as Response
//   );

//   api.off("request", requestListener);
//   api.off("response", responseListener);

//   await api.get("/request");

//   expect(requestListener).toHaveBeenCalledTimes(1);
//   expect(responseListener).toHaveBeenCalledTimes(1);
// });
