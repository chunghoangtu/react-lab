import { createCards } from "@/libs/cardUtils";
import { shuffle } from "lodash";
import { describe, expect, it } from "vitest";

const suits = ["Hearts", "Diamonds", "Clubs", "Spades"];
const values = ["Ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King"];

describe("cardUtils.createCards", () => {
  it("returns an array", () => {
    const cards = createCards({ suits, values });
    // expect(cards).toBeTypeOf('object');
    expect(Array.isArray(cards)).toBe(true);
  });

  it("creates a deck of 52 cards", () => {
    const cards = createCards({ suits, values });
    expect(cards).toHaveLength(52);
  });

  it("throws an error if suits or values are not standard lengths", () => {
    expect(() => createCards({ suits: ["Hearts"], values })).toThrow(/4/);
    expect(() => createCards({ suits, values: ["1", "2"] })).toThrow(/13/);
  });

  it("throws an error if suits or values are not array", () => {
    expect(() => createCards({ suits: "not an array", values })).toThrow();
    expect(() => createCards({ suits, values: "not an array" })).toThrow();
  });

  it("creates card objects with {value, suit} properties", () => {
    const cards = createCards({ suits, values });
    const sample = cards[0];

    expect(sample).toBeTypeOf("object");
    expect(sample).toHaveProperty("suit");
    expect(sample).toHaveProperty("value");
  });

  it("creates combination of suits and values", () => {
    const cards = createCards({ suits, values });
    const tenOfHearts = cards.find((card: any) => card.suit === "Hearts" && card.value === "10");
    expect(tenOfHearts).toBeDefined();

    const aceOfSpades = cards.find((card: any) => card.suit === "Spades" && card.value === "Ace");
    expect(aceOfSpades).toBeDefined();
  });

  it("throws an error for duplicates suits or values", () => {
    expect(() =>
      createCards({
        suits: ["Hearts", "Diamonds", "Clubs", "Clubs"],
        values,
      })
    ).toThrow(/duplicates/);

    expect(() =>
      createCards({
        suits,
        values: ["Ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "jack", "Queen", "Ace"],
      })
    ).toThrow(/duplicates/);
  });
});

describe("cardUtils.shuffle", () => {
  it("randomizes the order of an array of cards", () => {
    const cards = createCards({ suits, values });
    const originalOrder = [...cards];
    const shuffled = shuffle(cards);

    // check for cards in the same position
    const samePositions = shuffled.filter((card: any, index: number) => {
      return card === originalOrder[index];
    });

    expect(samePositions.length).toBeLessThan(52);
  });

  it("does not change the length of the array", () => {
    const cards = createCards({ suits, values });
    const shuffled = shuffle(cards);

    expect(shuffled).toHaveLength(cards.length);
  });
});
