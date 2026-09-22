export function createCards({ suits, values }: { suits: any; values: any }) {
  if (!Array.isArray(suits) || !Array.isArray(values))
    throw new TypeError("Suits and Values must a arrays");

  if (suits.length !== 4 || values.length !== 13)
    throw new RangeError("Suits and Values must be standard lengths (4 and 13)");

  if (new Set(suits).size !== suits.length) throw new Error("Suits array contains duplicates");
  if (new Set(values).size !== values.length) throw new Error("Values array contains duplicates");

  const cards = [];

  for (const suit of suits) {
    for (const value of values) {
      cards.push({ suit, value });
    }
  }

  return cards;
}
