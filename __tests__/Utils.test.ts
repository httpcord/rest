import { assertEquals } from "./deps.ts";
import { makeURLSearchParams } from "../mod.ts";

Deno.test("makeURLSearchParams", () => {
  Deno.test("GIVEN undefined THEN returns empty URLSearchParams", () => {
    const params = makeURLSearchParams();

    assertEquals([...params.entries()], []);
  });

  Deno.test("GIVEN empty object THEN returns empty URLSearchParams", () => {
    const params = makeURLSearchParams({});

    assertEquals([...params.entries()], []);
  });

  Deno.test(
    "GIVEN a record of strings THEN returns URLSearchParams with strings",
    () => {
      const params = makeURLSearchParams({ foo: "bar", hello: "world" });

      assertEquals(
        [...params.entries()],
        [
          ["foo", "bar"],
          ["hello", "world"],
        ]
      );
    }
  );

  Deno.test(
    "GIVEN a record of strings with nullish values THEN returns URLSearchParams without nullish values",
    () => {
      const params = makeURLSearchParams({
        foo: "bar",
        hello: null,
        one: undefined,
      });

      assertEquals([...params.entries()], [["foo", "bar"]]);
    }
  );

  Deno.test(
    "GIVEN a record of non-string values THEN returns URLSearchParams with string values",
    () => {
      const params = makeURLSearchParams({ life: 42, big: 100n, bool: true });

      assertEquals(
        [...params.entries()],
        [
          ["life", "42"],
          ["big", "100"],
          ["bool", "true"],
        ]
      );
    }
  );

  Deno.test("objects", () => {
    Deno.test(
      "GIVEN a record of date values THEN URLSearchParams with ISO string values",
      () => {
        const params = makeURLSearchParams({
          before: new Date("2022-04-04T15:43:05.108Z"),
          after: new Date(NaN),
        });

        assertEquals(
          [...params.entries()],
          [["before", "2022-04-04T15:43:05.108Z"]]
        );
      }
    );

    Deno.test(
      "GIVEN a record of plain object values THEN returns empty URLSearchParams",
      () => {
        const params = makeURLSearchParams({ foo: {}, hello: { happy: true } });

        assertEquals([...params.entries()], []);
      }
    );

    Deno.test(
      "GIVEN a record of objects with overridden toString THEN returns non-empty URLSearchParams",
      () => {
        const params = makeURLSearchParams({ foo: { toString: () => "bar" } });

        assertEquals([...params.entries()], [["foo", "bar"]]);
      }
    );
  });
});
