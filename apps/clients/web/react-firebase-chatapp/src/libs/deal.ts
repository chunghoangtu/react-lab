import { logDealRound } from "@/libs/loggers";

export function deal(cards: any[], handSize: number, numberOfPlayers: number) {
  const hands = Array.from({ length: numberOfPlayers }, (): any[] => []);

  for (let i = 0; i < handSize; i++) {
    for (let playerIndex = 0; playerIndex < numberOfPlayers; playerIndex++) {
      if (cards.length === 0) throw new Error("Not enough cards to deal");

      hands[playerIndex]?.push(cards.shift());
    }

    logDealRound(hands, i + 1);
  }

  return hands;
}
