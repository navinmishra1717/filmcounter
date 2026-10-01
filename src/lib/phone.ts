export const PHONE_LENGTH = 10;

export function digitsOnly(value: string, max: number) {
  return value.replace(/\D/g, "").slice(0, max);
}

// "5550184429" -> "(555) 018 4429", formatting as the user types.
export function formatPhone(d: string) {
  if (!d) return "";
  if (d.length <= 3) return `(${d}`;
  if (d.length <= 6) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)} ${d.slice(6)}`;
}
