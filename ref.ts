function next(from: number, limit: number): number {
  for (
    let i = from % 6 === 0 ? from + 6 : (6 - from % 6) + from + 6;
    i < limit;
    i += 6
  ) {
    if (prime(i - 1) && prime(i + 1)) {
      return i - 1;
    }
  }

  return 0;
}

function prime(n: number): number {
  const s = Math.sqrt(n);
  for (let i = 3; i <= s; i++) {
    if (n % i === 0) {
      return 0;
    }
  }

  return 1;
}

export function range(
  start: number,
  stop: number,
): BigUint64Array {
  const twins = [];
  let last = start;

  while (last <= stop) {
    last = next(last, stop);

    if (last) {
      twins.push(last);
    } else {
      break;
    }
  }

  return new BigUint64Array(twins.map((v) => BigInt(v)));
}
