import type { DigitalCard } from "@/domain/card/types";

const STORAGE_KEY = "digital-card-builder:v1";

export function loadStoredCard(): DigitalCard | null {
  if (typeof window === "undefined") {
    return null;
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);

  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as DigitalCard;
  } catch {
    return null;
  }
}

export function saveStoredCard(card: DigitalCard) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(card));
}

export function clearStoredCard() {
  window.localStorage.removeItem(STORAGE_KEY);
}
