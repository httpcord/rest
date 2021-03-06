import { build, emptyDir } from "https://deno.land/x/dnt@0.23.0/mod.ts";

await emptyDir("./npm");

await build({
  entryPoints: ["./mod.ts"],
  outDir: "npm",
  shims: {
    blob: true,
    timers: true,
    undici: true,
    deno: { test: "dev" },
  },
  test: false, // currently broken...
  package: {
    name: "@httpcord/rest",
    version: "1.0.0",
    description: "Friendly, standalone Discord HTTP API client",
    homepage: "https://github.com/httpcord/rest#readme",
    repository: "git+https://github.com/httpcord/rest.git",
    author: "andre4ik3",
    license: "Apache-2.0",
    private: false,
    bugs: {
      url: "https://github.com/httpcord/rest/issues",
    },
    devDependencies: { "@types/node": "^17.0.24" },
  },
});

// post build steps
await Deno.copyFile("LICENSE", "npm/LICENSE");
await Deno.copyFile("README.md", "npm/README.md");
