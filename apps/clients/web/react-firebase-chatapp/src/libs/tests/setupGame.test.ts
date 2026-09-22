import { createCards } from "@/libs/cardUtils";
import { describe, expect, it, vi } from "vitest";
import { setupGame } from "@/libs/setupGame";

import * as shuffleModule from "../shuffle";
import * as dealModule from "../deal";

const suits = ["Hearts", "Diamonds", "Clubs", "Spades"];
const values = ["Ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King"];

describe("setupGame.setupGame", () => {
  it("calls shuffle before dealing cards", () => {
    const cards = createCards({ suits, values });
    const shuffleSpy = vi.spyOn(shuffleModule, "shuffle");
    const dealSpy = vi.spyOn(dealModule, "deal");

    setupGame(cards, 5, 3);

    expect(shuffleSpy).toHaveBeenCalledTimes(1);
    expect(shuffleSpy.mock.invocationCallOrder[0]).toBeLessThan(
      dealSpy.mock.invocationCallOrder[0] as number
    );
  });

  it("calls deal with correct arguments", () => {
    const cards = createCards({ suits, values });
    const shuffleSpy = vi.spyOn(shuffleModule, "shuffle");
    const dealSpy = vi.spyOn(dealModule, "deal");

    setupGame(cards, 5, 3);

    // Get the shuffled cards that shuffle returned
    const shuffledCards = shuffleSpy.mock.results[0]?.value;

    expect(dealSpy).toHaveBeenCalledWith(shuffledCards, 5, 3);
  });
});
