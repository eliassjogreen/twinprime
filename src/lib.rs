use std::convert::TryInto;

use deno_core::plugin_api::Interface;
use deno_core::plugin_api::Op;
use deno_core::plugin_api::ZeroCopyBuf;

use is_prime_for_primitive_int::is_prime_u64;

#[no_mangle]
pub fn deno_plugin_init(interface: &mut dyn Interface) {
  interface.register_op("op_range", op_range);
}

fn op_range(
  _interface: &mut dyn Interface,
  zero_copy: &mut [ZeroCopyBuf],
) -> Op {
  let start = u64::from_ne_bytes(
    zero_copy[0][..]
      .try_into()
      .expect("Slice has incorrect length"),
  );
  let stop = u64::from_ne_bytes(
    zero_copy[1][..]
      .try_into()
      .expect("Slice has incorrect length"),
  );
  let mut twins = Vec::new();
  let mut prev = start;

  while prev <= stop {
    if let Some(curr) = next(prev, stop) {
      twins.push(curr);
      prev = curr;
    } else {
      break;
    }
  }

  let slice = as_u8_slice(twins.as_slice());
  let boxed = slice.to_owned().into_boxed_slice();

  Op::Sync(boxed)
}

fn next(from: u64, lim: u64) -> Option<u64> {
  let mut i = if from % 6 == 0 { 0 } else { 6 - from % 6 } + from + 6;

  while i <= lim {
    if is_prime_u64(i - 1) && is_prime_u64(i + 1) {
      return Some(i - 1);
    }

    i += 6;
  }

  None
}

fn as_u8_slice<T>(s: &[T]) -> &[u8] {
  unsafe {
    std::slice::from_raw_parts(
      s.as_ptr() as *const u8,
      s.len() * std::mem::size_of::<T>(),
    )
  }
}
