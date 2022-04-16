import { build, emptyDir } from "https://deno.land/x/dnt@0.23.0/mod.ts";

// Compute version
const gitVersion = `0.0.0-${Deno.args[0].slice(0, 7)}`;

await emptyDir("./npm");

await build({
  entryPoints: ["./mod.ts"],
  outDir: "./npm",
  shims: {
    blob: true,
    timers: true,
    undici: true,
    custom: [
      {
        typesPackage: { name: "@types/node", version: "17.0.24" },
        package: { name: "@types/node", version: "17.0.24" },
        globalNames: [],
      },
    ],
  },
  compilerOptions: { target: "Latest", types: ["node"] } as any,
  package: {
    name: "@httpcord/rest",
    version: gitVersion,
    description: "Friendly, standalone Discord HTTP API client",
    homepage: "https://github.com/httpcord/rest#readme",
    repository: "git+https://github.com/username/repo.git",
    author: "andre4ik3",
    license: "Apache-2.0",
    bugs: {
      url: "https://github.com/username/repo/issues",
    },
    private: false,
  },
});

// post build steps
await Deno.copyFile("LICENSE", "npm/LICENSE");
await Deno.copyFile("README.md", "npm/README.md");
