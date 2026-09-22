import { isPrime, longestString, shippingCost } from "@/libs/utils";
import { describe, expect, it, test } from "vitest";

describe("utils.longestString", () => {
  it("returns the longest string", () => {
    const result = longestString("a", "ab");

    expect(result).toBe("ab");
  });

  it("returns the first string when both are of qual length", () => {
    expect(longestString("ac", "ab")).toBe("ac");
  });

  it("should able to handles empty strings", () => {
    expect(longestString("", "ab")).toBe("ab");
    expect(longestString("ac", "")).toBe("ac");
    expect(longestString("", "")).toBe("");
  });

  test("ignores leading/trailing whitespace", () => {
    expect(longestString("   ab   ", "acb")).toBe("acb");
  });
});

describe("utils.isPrime", () => {
  it("return true/truthy for small prime numbers", () => {
    expect(isPrime(2)).toBe(true);
    expect(isPrime(3)).toBeTruthy();
  });

  it("return false/falsy for non-primes numbers", () => {
    expect(isPrime(1)).toBe(false);
    expect(isPrime(4)).toBeFalsy();
  });

  it("matches results in an array using toEqual", () => {
    const numbers = [2, 3, 4, 5];
    const results = numbers.map(isPrime);

    expect(results).toEqual([true, true, false, true]);
  });

  it("detects primes within a filtered list", () => {
    const numbers = [1, 2, 3, 4, 5, 6, 7];
    const primes = numbers.filter(isPrime);

    expect(primes).toContain(3);
    expect(primes).not.toContain(4);
  });

  it("throws an error when passed a non-number", () => {
    const badCall = () => isPrime("abc");

    expect(badCall).toThrow();
    expect(badCall).toThrow("Input must be a number");
  });

  it("has correct type for result", () => {
    expect(isPrime(7)).toBeTypeOf("boolean");
    expect(typeof isPrime(7)).toBe("boolean");
  });

  it("treats o and  1 as non-prime, and 2 as prime", () => {
    expect(isPrime(0)).toBe(false);
    expect(isPrime(1)).toBe(false);
    expect(isPrime(2)).toBe(true);
  });

  it("returns fall for all even numbers > 2", () => {
    expect(isPrime(4)).toBe(false);
    expect(isPrime(10)).toBe(false);
  });

  it("identifies common primes", () => {
    expect(isPrime(3)).toBe(true);
    expect(isPrime(5)).toBe(true);
    expect(isPrime(7)).toBe(true);
  });

  it("returns false for perfect squares reliably", () => {
    expect(isPrime(49)).toBe(false);
    expect(isPrime(121)).toBe(false);
  });

  it("returns false for non-integers", () => {
    expect(isPrime(2.5)).toBe(false);
  });

  it("throws and error for non-number inputs", () => {
    const nonInputsCall = () => isPrime("abc");
    expect(nonInputsCall).toThrow();
  });
});

describe("utils.shippingCost", () => {
  it("returns a number", () => {
    expect(shippingCost(2)).toBeTypeOf("number");
    // a very loose test case
  });

  it("charges correct prices for interior weights", () => {
    expect(shippingCost(0.5)).toBe(3.99);
    expect(shippingCost(3)).toBe(5.99);
    expect(shippingCost(10)).toBe(8.99);
    expect(shippingCost(50)).toBe(14.99);
  });
  it.each([
    { weight: 0.5, expected: 3.99 },
    { weight: 3, expected: 5.99 },
    { weight: 10, expected: 8.99 },
    { weight: 50, expected: 14.99 },
  ])("charges $expected prices for weight $weight", ({ weight, expected }) => {
    expect(shippingCost(weight)).toBe(expected);
  });

  // boundary testing
  it("charges correct prices at boundaries", () => {
    expect(shippingCost(1)).toBe(3.99); // upper bound of first tier
    expect(shippingCost(5)).toBe(5.99); // upper bound of second tier
    expect(shippingCost(20)).toBe(8.99); // upper bound of third tier
    expect(shippingCost(21)).toBe(14.99); // above third tier
  });
  it.each([
    {weight: 1, expected: 3.99},
    {weight: 5, expected: 5.99},
    {weight: 10, expected: 8.99},
    {weight: 21, expected: 14.99}
  ])("charges correct prices at boundaries: $weight => $expected", ({weight, expected}) => {
    expect(shippingCost(weight)).toBe(expected);
  });

  it("applies FREESHIPPING coupon exactly", () => {
    expect(shippingCost(1, "FREESHIPPING")).toBe(0);
    expect(shippingCost(21, "FREESHIPPING")).toBe(0);
  });

  it("ignores non-matching coupons", () => {
    expect(shippingCost(1, "FREE")).toBe(3.99);
    expect(shippingCost(21, "freeshipping")).toBe(14.99);
    expect(shippingCost(21)).toBe(14.99);
  });

  it("throws an error for invalid weights", () => {
    expect(() => shippingCost("2")).toThrow("Weight must be a number");
    expect(() => shippingCost("2")).toThrow(/(?=.*weight)(?=.*number)/i);
    expect(() => shippingCost(0)).toThrow("Weight must be greater than 0");
    expect(() => shippingCost(-5)).toThrow(/(?=.*weight)(?=.*0)/i);
  });

  it("throws when coupon is not a string", () => {
    expect(() => shippingCost(1, 123)).toThrow("Coupon must be a string");
    expect(() => shippingCost(1, null)).toThrow(/coupon/i);
    expect(() => shippingCost(1, null)).toThrow(/(?=.*coupon)(?=.*string)/i);
  });
});
