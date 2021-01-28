import { Plug } from "https://deno.land/x/plug@0.2.8/mod.ts";

await Plug.prepare({
  name: "twinprime",
  url: "https://github.com/eliassjogreen/twinprime/releases/download/0.1.4/",
});

/**
 * Generates all twin primes between `start` and `stop`
 */
export function range(start: bigint, stop: bigint) {
  const response = Plug.core.dispatch(
    Plug.getOpId("op_range"),
    u64(start),
    u64(stop),
  );

  if (response !== undefined) {
    return new BigUint64Array(response.buffer);
  }
}

function endian(): boolean {
  const buffer = new ArrayBuffer(2);
  new DataView(buffer).setInt16(0, 256, true);
  return new Int16Array(buffer)[0] === 256;
}

function u64(n: bigint): Uint8Array {
  if (n < 0n || n > 0xffffffffffffffffn) {
    throw new RangeError("Number must be between 0 and 0xffffffffffffffff");
  }

  const arr = new Uint8Array(8);

  for (
    let i = 0, m = 0x00000000000000ffn, s = 0n;
    i < arr.length;
    i++, m <<= 8n, s += 8n
  ) {
    arr[i] = Number((n & m) >> s);
  }

  return endian() ? arr : arr.reverse();
}
