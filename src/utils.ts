export function formatTWD(price: string | number): string {
  const formatted = new Intl.NumberFormat("zh-TW", {
    style: "currency",
    currency: "TWD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Number(price));

  return `NT${formatted}`;
}
