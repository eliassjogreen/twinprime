use std::convert::TryInto;

use deno_core::plugin_api::Interface;
use deno_core::plugin_api::Op;
use deno_core::plugin_api::ZeroCopyBuf;
use deno_core::serde_json::json;
use deno_core::serde_json::to_vec;

use primal::is_prime;

#[no_mangle]
pub fn deno_plugin_init(interface: &mut dyn Interface) {
  interface.register_op("op_check", op_check);
}

fn op_check(
  _interface: &mut dyn Interface,
  zero_copy: &mut [ZeroCopyBuf],
) -> Op {
  let start = u64::from_ne_bytes(zero_copy[0][..].try_into().unwrap());
  let stop = u64::from_ne_bytes(zero_copy[1][..].try_into().unwrap());
  let mut twins = Vec::new();
  let mut last = start;

  while last <= stop {
    if let Some(curr) = next(last, stop) {
      last = curr;
      twins.push(curr);
    } else {
      break;
    }
  }

  Op::Sync(to_vec(&json!(twins)).unwrap().into_boxed_slice())
}

fn next(from: u64, lim: u64) -> Option<u64> {
  let mut i = if from % 6 == 0 {
    from + 6
  } else {
    (6 - from % 6) + from + 6
  };

  while i < lim {
    if is_prime(i - 1) && is_prime(i + 1) {
      return Some(i - 1);
    }

    i += 6;
  }

  None
}
