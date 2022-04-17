import { REST } from "../mod.ts";
import { assertEquals, assertRejects } from "./deps.ts";

const api = new REST();

Deno.test("no token", async () => {
  const promise = () => api.get("/gateway");
  await assertRejects(promise, (e: Error) =>
    assertEquals(
      e.message,
      "Expected token to be set for this request, but none was present"
    )
  );
});

Deno.test("negative offset", () => {
  const badREST = new REST({ offset: -5000 });
  assertEquals(badREST.requestManager.options.offset, 0);

  // Cleanup bad sweepers to prevent leaking async ops
  badREST.requestManager.clearHashSweeper();
  badREST.requestManager.clearHandlerSweeper();
});
