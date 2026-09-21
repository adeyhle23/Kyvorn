import { clsx, type ClassValue } from "clsx";
import type { Money } from "./shopify/types";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatMoney(money: Money): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: money.currencyCode,
    minimumFractionDigits: 2,
  }).format(Number(money.amount));
}
