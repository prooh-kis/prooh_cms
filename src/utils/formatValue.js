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
