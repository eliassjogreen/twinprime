import { assertEquals, bench, runBenchmarks } from "./deps.ts";

import { range as rust } from "./mod.ts";
import { range as ref } from "./ref.ts";

let rust1e6, ref1e6, rustlarge, reflarge;

bench({
  name: "rust | 0..1e6",
  func: (t) => {
    t.start();
    rust1e6 = rust(0n, 1000000n);
    t.stop();
  },
});

bench({
  name: "ref | 0..1e6",
  func: (t) => {
    t.start();
    ref1e6 = ref(0, 1000000);
    t.stop();
  },
});

bench({
  name: "rust | 3575225575224..3575226575224",
  func: (t) => {
    t.start();
    rustlarge = rust(3575225575224n, 3575226575224n);
    t.stop();
  },
});

bench({
  name: "ref | 3575225575224..3575226575224",
  func: (t) => {
    t.start();
    reflarge = ref(3575225575224, 3575226575224);
    t.stop();
  },
});

await runBenchmarks();

assertEquals(rust1e6, ref1e6);
assertEquals(rustlarge, reflarge);
