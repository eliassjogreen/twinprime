import { bench, runBenchmarks } from "./deps.ts";

import { generate as rust } from "./mod.ts";
import { generate as ref } from "./ref.ts";

bench({
  name: "rust | 0..1e6",
  func: (t) => {
    t.start();
    rust(0n, 1000000n);
    t.stop();
  },
});

bench({
  name: "ref | 0..1e6",
  func: (t) => {
    t.start();
    ref(0, 1000000);
    t.stop();
  },
});

bench({
  name: "rust | 3575225575224..3575226575224",
  func: (t) => {
    t.start();
    rust(3575225575224n, 3575226575224n);
    t.stop();
  },
});

bench({
  name: "ref | 3575225575224..3575226575224",
  func: (t) => {
    t.start();
    ref(3575225575224, 3575226575224);
    t.stop();
  },
});

runBenchmarks();
