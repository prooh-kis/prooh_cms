export function formatNumber(num) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  } else if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1) + "B";
  } else if (!num) {
    return "0";
  }
  return num.toString();
}

export function camelToTitleCase(camelStr) {
  // Insert space before capitals and trim
  const spacedStr = camelStr.replace(/([A-Z])/g, " $1").trim();

  // Capitalize first letter of each word
  return spacedStr.replace(/\b\w/g, (char) => char.toUpperCase());
}

export const formattedINR = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0, // Remove decimal places
  }).format(amount);
