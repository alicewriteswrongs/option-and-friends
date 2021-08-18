/**
 * Abstract class for defining the methods shared between Some
 * and None.
 */
abstract class AbstractOption<T> {
  /**
   * Is it Some what you need or is it None?
   *
   * returns true if this is a Some, else false
   */
  abstract isSome(): this is Some<T>

  /**
   * Is it None of what you need, or is it Some-thing?
   *
   * return true if this is a None, else false
   */
  abstract isNone(): this is None<T>

  /**
   * Map across the value wrapped up in the Option
   *
   * If Some(x), returns Some(fn(x)), if None, returns
   * None.
   */
  abstract map<S>(fn: (value: T) => S): Option<S>

  /**
   * Filter the Option, reducing Some(x) to None if
   * predicate(x) !== true.
   */
  abstract filter(predicate: (value: T) => boolean): Option<T>

  /**
   * Unwrap the value in the Maybe. If Some(x), returns x, if
   * None returns defaultVal.
   */
  abstract unwrap(defaultVal: T): T
}


export class Some<T> extends AbstractOption<T> {
  value: T

  constructor(value: T) {
    super()
    this.value = value
  }

  isSome() {
    return true
  }

  isNone() {
    return false
  }

  map <S>(fn: (value: T) => S): Some<S> {
    return new Some(
      fn(this.value)
    )
  }

  filter (predicate: (value: T) => boolean): Some<T> | None<T> {
    if (predicate(this.value)) {
      return this
    } else {
      return new None<T>()
    }
  }

  unwrap (_defaultVal: T): T {
    return this.value
  }
}

export class None<T> extends AbstractOption<T> {
  isSome() {
    return false
  }

  isNone () {
    return true
  }

  map <S>(_fn: (value: T) => S): None<S> {
    return new None<S>()
  }

  filter (_predicate: (value: T) => boolean): None<T> {
    return this
  }

  unwrap (defaultVal: T): T {
    return defaultVal
  }
}

/**
 * An Option type which allows a nice encapsulation of optional values.
 *
 * Create one with `toOption`, or just use the `new` keyword:
 *
 * ```ts
 * const none = toOption(null)
 * const some = toOption("hello!")
 * const optionalNumber = new Some(13)
 * ```
  */
export type Option<T> = Some<T> | None<T>

/**
 * Turn a 'possibly-null' value (i.e. `string | null`) into a proper
 * Option value.
 *
 * Return `None` if `val` is `null` or `undefined`, else returns
 * `Some(val)`.
 */
export function toOption<T>(val: T | undefined | null): Option<T> {
  if (val === undefined || val === null) {
    return new None()
  } else {
    return new Some(val)
  }
}
