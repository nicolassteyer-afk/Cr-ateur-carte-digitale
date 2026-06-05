import type { CardBlock, BlockType, DigitalCard } from "./types";
import { createDefaultBlockProps } from "./defaults";

export function createCard(): DigitalCard {
  return {
    id: crypto.randomUUID(),
    title: "Nouvelle carte digitale",
    blocks: [],
    updatedAt: new Date().toISOString(),
  };
}

export function createBlock(type: BlockType): CardBlock {
  return {
    id: crypto.randomUUID(),
    type,
    props: createDefaultBlockProps(type),
  } as CardBlock;
}

export function touchCard(card: DigitalCard): DigitalCard {
  return {
    ...card,
    updatedAt: new Date().toISOString(),
  };
}
