import { beforeEach, describe, expect, it, vi } from "vitest";
import { DECKS, loadDeck } from "@/libs/loadDeck";
import { createCards } from "@/libs/cardUtils";
import { logDealRound } from "@/libs/loggers";
import { deal } from "@/libs/deal";

describe("loadDeck.loadDeck", () => {
  it("return a Promise that resolves", async () => {
    const result = loadDeck();

    expect(result).toBeInstanceOf(Promise);

    await expect(result).resolves.toBeDefined();
  });

  it("resolves a { suits[4], values[13] } deck", async () => {
    const deck: any = await loadDeck();

    expect(typeof deck).toBe("object");

    expect(deck).toHaveProperty("suits");
    expect(deck).toHaveProperty("values");

    expect(Array.isArray(deck.suits)).toBe(true);
    expect(Array.isArray(deck.values)).toBe(true);

    expect(deck.suits).toHaveLength(4);
    expect(deck.values).toHaveLength(13);
  });

  it("resolves a { suits[4], values[13] } deck, using asymmetric", async () => {
    const deck: any = await loadDeck();

    expect(deck).toEqual(
      expect.objectContaining({
        suits: expect.any(Array) && expect.objectContaining({ length: 4 }),
        values: expect.any(Array) && expect.objectContaining({ length: 13 }),
      })
    );
  });

  it('supports another id, e.g. "pokemon', async () => {
    const deck: any = await loadDeck("pokemon");

    expect(deck.suits).toHaveLength(4);
    expect(deck.values).toHaveLength(13);
  });

  it("rejects with an error for unknown ids", async () => {
    const deck: any = loadDeck("unknown-monster");

    await expect(deck).rejects.toThrow(/not found/i);
  });

  it("rejects with an error for invalid deckCollection", async () => {
    const invalidDeckCollection: any = { ...DECKS };
    invalidDeckCollection["pokemon"].suits.length = 3;

    const deck = loadDeck("pokemon", invalidDeckCollection);

    await expect(deck).rejects.toThrow(/4 suits/);
  });
});

vi.mock("../loggers.ts", async () => {
  const originals = await vi.importActual("../loggers.ts");

  return {
    ...originals,
    logDealRound: vi.fn(() => {
      console.log("LogDealRound mock fn called");
      return true;
    }),
  };
});

describe("loadDeck.deal", () => {
  const suits = [...DECKS.standard.suits];
  const values = [...DECKS.standard.values];

  beforeEach(() => {
    // logDealRound.mockClear(); // Vitest 5.0+ will do this automatically
  });

  it("deals the correct number of hands", () => {
    const cards = createCards({ suits, values });
    const hands = deal(cards, 5, 3);

    expect(hands).toHaveLength(3);
  });

  it("deals each hand the correct number of cards", () => {
    const cards = createCards({ suits, values });
    const hands = deal(cards, 7, 4);

    expect(hands[0]).toHaveLength(7);
    expect(hands[1]).toHaveLength(7);
    expect(hands[2]).toHaveLength(7);
    expect(hands[3]).toHaveLength(7);
  });

  it("calls the logger a correct number of times", () => {
    const cards = createCards({ suits, values });
    deal(cards, 5, 3);

    expect(logDealRound).toHaveBeenCalledTimes(5);
    expect(logDealRound).toHaveReturnedWith(true);
  });

  it("throw an error when not enough cards to deal", () => {
    expect(() => deal([], 5, 3)).toThrow(/Not enough/);
  });
});
