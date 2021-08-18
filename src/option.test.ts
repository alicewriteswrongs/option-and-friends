import {
  Option,
  None,
  Some,
} from './option'

describe('Option', () => {
  it('should let you map across a Some', () => {
    const val = new Some(10)
    expect(
      val.map(x => x * 2)
    ).toEqual(new Some(20))
  })

  it("should let you filter a Some", () => {
    const some = new Some(10)
    expect(
      some.filter(x => x === 30)
    ).toEqual(new None)

    expect(some.filter(x => x === 10)).toEqual(
      new Some(10)
    )
  })

  it("should let you chain filter, map, etc", () => {
    const some = new Some("My Name")
    const updatedName = some
    .map(name => name.toUpperCase())
    .map(name => name.split(' ')[0])
    expect(updatedName).toEqual(
      new Some("MY")
    )

    const none = updatedName
    .filter(name => name === "My")

    expect(none.isNone()).toBeTruthy()
  })

  it("should let you unwrap a Some", () => {
    const some = new Some(42)
    expect(some.unwrap(100)).toBe(42)
  })

  it("should let you unwrap a None", () => {
    const none = new None
    expect(none.unwrap(42)).toBe(42)
  })

  it("should let you map across a None", () => {
    const none: Option<number> = new None
    expect(
      none.map((x: number) => x + 2)
    ).toEqual(new None)
  })

  it("should filter a None", () => {
    const none: Option<string> = new None
    expect(
      none.filter(x => x !== "hey!")
    ).toEqual(new None)
  })

  it("should set the isSome, isNone", () => {
    const some = new Some(42)
    expect(some.isSome()).toBeTruthy()
    expect(some.isNone()).toBeFalsy()

    const none = new None
    expect(none.isSome()).toBeFalsy()
    expect(none.isNone()).toBeTruthy()
  })
});
