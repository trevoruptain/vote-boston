export function titleize(str: string): string {
  const smallWords = new Set([
    "the",
    "and",
    "or",
    "but",
    "a",
    "an",
    "in",
    "on",
    "with",
    "at",
    "by",
    "for",
    "to",
    "of",
    "up",
    "as",
    "is",
    "it",
  ]);

  if (str.length === 0) {
    return "";
  }

  return str
    .toLowerCase()
    .split(" ")
    .map((word, index) => {
      if (index === 0 || !smallWords.has(word)) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      }
      return word;
    })
    .join(" ");
}
