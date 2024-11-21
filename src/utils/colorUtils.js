export function generateColorFromAlphabet(letter, alpha = 1) {
  // Ensure the letter is a single character
  if (letter.length !== 1 || !/^[a-zA-Z]$/.test(letter)) {
    throw new Error("Input must be a single alphabet letter.");
  }

   // Ensure alpha is a number between 0 and 1
   if (alpha < 0 || alpha > 1) {
    throw new Error("Alpha must be between 0 and 1.");
  }

  // Get the Unicode value of the letter (case insensitive)
  const charCode = letter.toLowerCase().charCodeAt(0);

  // Generate RGB values by using the charCode
  const red = (charCode * 3) % 256;
  const green = (charCode * 5) % 256;
  const blue = (charCode * 7) % 256;

  // Convert RGB values to hex format and ensure it's 2 characters long
  const toHex = (num) => num.toString(16).padStart(2, '0');
  const alphaHex = alpha === 0 ? 50 : Math.round(alpha * 255).toString(16).padStart(2, '0');

  // Return the color in hex format
  // console.log(`#${toHex(red)}${toHex(green)}${toHex(blue)}${alphaHex}`);
  return `#${toHex(red)}${toHex(green)}${toHex(blue)}${alphaHex}`;
}