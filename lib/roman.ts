// Roman numerals — issue dating, volume numerals, list indices.
const MAP: [string, number][] = [
  ["M", 1000], ["CM", 900], ["D", 500], ["CD", 400],
  ["C", 100], ["XC", 90], ["L", 50], ["XL", 40],
  ["X", 10], ["IX", 9], ["V", 5], ["IV", 4], ["I", 1],
];

export function toRoman(n: number): string {
  let out = "";
  for (const [r, v] of MAP) {
    while (n >= v) {
      out += r;
      n -= v;
    }
  }
  return out;
}
