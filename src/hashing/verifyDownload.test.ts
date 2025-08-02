import { test } from "node:test";
import { verifySHA256Checksum } from "./verifyDownload.ts";

test("verify download checksum", (t) => {
  const table = [
    {
      path: "./.data",
      file: "mantra.jpg",
      hash: "d6c1a023251f13b7c167c7e578cc1fce367f461f105878cb71363156d6ea6381",
      expect: true,
      toError: false,
    },
    {
      path: ".",
      file: ".zshrc",
      hash: "somthing-else",
      expect: false,
      toError: true,
    },
    {
      path: "..",
      file: "non-existing-file",
      hash: "somthing-else",
      expect: false,
      toError: true,
    },
  ];

  for (const entry of table) {
    t.test(
      `verify download checksum for ${entry.path}/${entry.file}`,
      async (t) => {
        try {
          const result = await verifySHA256Checksum(
            entry.path,
            entry.file,
            entry.hash,
          );
          t.assert.equal(result, entry.expect);
        } catch (err) {
          if (!entry.toError) {
            t.assert.fail(
              `For ${entry.path}/${entry.file} error throw mismatch, expected error: ${entry.toError}, got: ${err}`,
            );
          }
        }
      },
    );
  }
});
