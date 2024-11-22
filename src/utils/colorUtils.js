export function generateColorFromAlphabet(input, alpha = 1) {
  // Ensure alpha is a number between 0 and 1
  if (typeof alpha !== "number" || alpha < 0 || alpha > 1) {
    throw new Error("Alpha must be a number between 0 and 1.");
  }

  // Normalize the input
  let inputString;
  if (typeof input === "number") {
    inputString = input.toString();
  } else if (typeof input === "string" && input.length > 0) {
    inputString = input;
  } else {
    throw new Error("Input must be a non-empty string, number, or single character.");
  }

  // Compute a numeric hash from the input string
  let hash = 0;
  for (let i = 0; i < inputString.length; i++) {
    hash = inputString.charCodeAt(i) + ((hash << 5) - hash);
  }

  // Generate RGB values using the hash
  const red = (hash >> 24) & 255;
  const green = (hash >> 16) & 255;
  const blue = (hash >> 8) & 255;

  // Convert RGB values to hex format
  const toHex = (num) => num.toString(16).padStart(2, '0');
  const alphaHex = alpha === 0 ? '00' : Math.round(alpha * 255).toString(16).padStart(2, '0');

  // Return the color in hex format
  return `#${toHex(red)}${toHex(green)}${toHex(blue)}${alphaHex}`;
}
