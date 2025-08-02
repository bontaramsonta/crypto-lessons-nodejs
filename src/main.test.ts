import { test } from "node:test";
import { checkHashingAlgo } from "./main.ts";

test("checkHashingAlgo", (t) => {
  const table = [
    { algo: "sha125", expect: false },
    { algo: "sha1", expect: true },
    { algo: "sha256", expect: true },
  ];
  for (const entry of table) {
    t.test(`check for ${entry.algo}`, ({ assert }) => {
      assert.equal(checkHashingAlgo(entry.algo), entry.expect);
    });
  }
});
