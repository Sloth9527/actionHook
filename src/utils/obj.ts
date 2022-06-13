export function merge<T, S>(raw:T, expand:S) : T & S {
  return {
    ...(raw || {}) as T,
    ...(expand || {}) as S,
  }
}
