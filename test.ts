import { assertEquals } from "./deps.ts";

import { range as rust } from "./mod.ts";
import { range as ref } from "./ref.ts";

const first = new BigUint64Array([
  1019n,
  1031n,
  1049n,
  1061n,
  1091n,
  1151n,
  1229n,
  1277n,
  1289n,
  1301n,
  1319n,
  1427n,
  1451n,
  1481n,
  1487n,
  1607n,
  1619n,
  1667n,
  1697n,
  1721n,
  1787n,
  1871n,
  1877n,
  1931n,
  1949n,
  1997n,
]);

Deno.test({
  name: "rust == 1000..2000",
  fn(): void {
    assertEquals(rust(1000n, 2000n), first);
  },
});

Deno.test({
  name: "ref == 1000..2000",
  fn(): void {
    assertEquals(ref(1000, 2000), first);
  },
});

Deno.test({
  name: "ref == rust | 0..1e6",
  fn(): void {
    assertEquals(rust(0n, 1000000n), ref(0, 1000000));
  },
});

Deno.test({
  name: "ref == rust | 3575225575224..3575226575224",
  fn(): void {
    assertEquals(
      rust(3575225575224n, 3575226575224n),
      ref(3575225575224, 3575226575224),
    );
  },
});
