import { deal } from "@/libs/deal";
import { shuffle } from "@/libs/shuffle";

export function setupGame(cards: any[], handSize: number, numberOfPlayers: number) {
  const shuffledCards = shuffle(cards);
  const hands = deal(shuffledCards, handSize, numberOfPlayers);

  const players = hands.map((hand: any[][], index: number) => ({
    id: index + 1,
    hand,
    currentTurn: index === 0, // true for first player, false for others
  }));

  return players;
}
