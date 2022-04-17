import { assertEquals, assertObjectMatch } from "../deps.ts";
import { DiscordAPIError } from "../../mod.ts";

Deno.test("Unauthorized", () => {
  const error = new DiscordAPIError(
    { message: "401: Unauthorized", code: 0 },
    0,
    401,
    "PATCH",
    "https://discord.com/api/v10/guilds/:id",
    {
      files: undefined,
      body: undefined,
    }
  );

  assertEquals(error.code, 0);
  assertEquals(error.message, "401: Unauthorized");
  assertEquals(error.method, "PATCH");
  assertEquals(error.name, "DiscordAPIError[0]");
  assertEquals(error.status, 401);
  assertEquals(error.url, "https://discord.com/api/v10/guilds/:id");
  assertEquals(error.requestBody.files, undefined);
  assertEquals(error.requestBody.json, undefined);
});

Deno.test("Invalid Form Body Error (error.{property}._errors.{index})", () => {
  const error = new DiscordAPIError(
    {
      code: 50035,
      errors: {
        username: {
          _errors: [
            {
              code: "BASE_TYPE_BAD_LENGTH",
              message: "Must be between 2 and 32 in length.",
            },
          ],
        },
      },
      message: "Invalid Form Body",
    },
    50035,
    400,
    "PATCH",
    "https://discord.com/api/v10/users/@me",
    {
      files: undefined,
      body: {
        username: "a",
      },
    }
  );

  assertEquals(error.code, 50035);
  assertEquals(
    error.message,
    [
      "Invalid Form Body",
      "username[BASE_TYPE_BAD_LENGTH]: Must be between 2 and 32 in length.",
    ].join("\n")
  );
  assertEquals(error.method, "PATCH");
  assertEquals(error.name, "DiscordAPIError[50035]");
  assertEquals(error.status, 400);
  assertEquals(error.url, "https://discord.com/api/v10/users/@me");
  assertEquals(error.requestBody.files, undefined);
  // @ts-expect-error: shut up
  assertObjectMatch(error.requestBody.json, { username: "a" });
});

Deno.test(
  "Invalid FormFields Error (error.errors.{property}.{property}.{index}.{property}._errors.{index})",
  () => {
    const error = new DiscordAPIError(
      {
        code: 50035,
        errors: {
          embed: {
            fields: {
              "0": {
                value: {
                  _errors: [
                    {
                      code: "BASE_TYPE_REQUIRED",
                      message: "This field is required",
                    },
                  ],
                },
              },
            },
          },
        },
        message: "Invalid Form Body",
      },
      50035,
      400,
      "POST",
      "https://discord.com/api/v10/channels/:id",
      {}
    );

    assertEquals(error.code, 50035);
    assertEquals(
      error.message,
      [
        "Invalid Form Body",
        "embed.fields[0].value[BASE_TYPE_REQUIRED]: This field is required",
      ].join("\n")
    );
    assertEquals(error.method, "POST");
    assertEquals(error.name, "DiscordAPIError[50035]");
    assertEquals(error.status, 400);
    assertEquals(error.url, "https://discord.com/api/v10/channels/:id");
  }
);

Deno.test(
  "Invalid FormFields Error (error.errors.{property}.{property}._errors.{index}._errors)",
  () => {
    const error = new DiscordAPIError(
      {
        code: 50035,
        errors: {
          form_fields: {
            label: {
              _errors: [
                {
                  _errors: [
                    {
                      code: "BASE_TYPE_REQUIRED",
                      message: "This field is required",
                    },
                  ],
                },
              ],
            },
          },
        },
        message: "Invalid Form Body",
      },
      50035,
      400,
      "PATCH",
      "https://discord.com/api/v10/guilds/:id",
      {}
    );

    assertEquals(error.code, 50035);
    assertEquals(
      error.message,
      [
        "Invalid Form Body",
        "form_fields.label[0][BASE_TYPE_REQUIRED]: This field is required",
      ].join("\n")
    );
    assertEquals(error.method, "PATCH");
    assertEquals(error.name, "DiscordAPIError[50035]");
    assertEquals(error.status, 400);
    assertEquals(error.url, "https://discord.com/api/v10/guilds/:id");
  }
);

Deno.test("Invalid Oauth Code Error (error.error)", () => {
  const error = new DiscordAPIError(
    {
      error: "invalid_request",
      error_description: 'Invalid "code" in request.',
    },
    "invalid_request",
    400,
    "POST",
    "https://discord.com/api/v10/oauth2/token",
    {
      body: new URLSearchParams([
        ["client_id", "1234567890123545678"],
        ["client_secret", "totally-valid-secret"],
        ["redirect_uri", "http://localhost"],
        ["grant_type", "authorization_code"],
        ["code", "very-invalid-code"],
      ]),
    }
  );

  assertEquals(error.code, "invalid_request");
  assertEquals(error.message, 'Invalid "code" in request.');
  assertEquals(error.method, "POST");
  assertEquals(error.name, "DiscordAPIError[invalid_request]");
  assertEquals(error.status, 400);
  assertEquals(error.url, "https://discord.com/api/v10/oauth2/token");
});
