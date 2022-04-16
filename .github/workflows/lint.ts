import { relative } from "https://deno.land/std@0.135.0/path/mod.ts";

// Linting types
type LintDiagnostic = {
  range: {
    start: { line: number; col: number; bytePos: number };
    end: { line: number; col: number; bytePos: number };
  };
  filename: string;
  message: string;
  code: string;
  hint: string;
};
type LintError = { file_path: string; message: string };
type LintOutput = { diagnostics: LintDiagnostic[]; errors: LintError[] };

// Decode the output from stdin
let rawData = "";
const decoder = new TextDecoderStream();

Deno.stdin.readable.pipeTo(decoder.writable);
for await (const chunk of decoder.readable) rawData += chunk;

const data = JSON.parse(rawData) as LintOutput;

// Parse it!
data.diagnostics.forEach((diagnostic) => {
  const params = [
    `line=${diagnostic.range.start.line}`,
    `col=${diagnostic.range.start.col}`,
    `file=${relative(Deno.cwd(), diagnostic.filename)}`,
  ];
  console.log(`::warning ${params.join(",")}::${diagnostic.message}`);
});

data.errors.forEach((error) => {
  const params = [`file=${relative(Deno.cwd(), error.file_path)}`];
  console.log(`::error ${params.join(",")}::${error.message}`);
});
