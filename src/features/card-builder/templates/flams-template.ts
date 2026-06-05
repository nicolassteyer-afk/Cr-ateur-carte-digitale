import { createBlock, touchCard } from "@/domain/card/factory";
import type { BlockType, CardBlock, DigitalCard } from "@/domain/card/types";

function block<TType extends BlockType>(
  type: TType,
  props: CardBlock<TType>["props"],
): CardBlock<TType> {
  return {
    ...createBlock(type),
    props,
  } as CardBlock<TType>;
}

export function createFlamsTemplate(): DigitalCard {
  return touchCard({
    id: crypto.randomUUID(),
    title: "Carte digitale Flam's",
    blocks: [
      block("menuTabs", {
        items:
          "Boissons\nFormules a volonte\nA partager\nEntrees\nFlammekueches\nPates Alsaciennes\nFlammekueches sucrees\nDesserts & Glaces\nCafeteria",
        activeCategory: "Formules a volonte",
      }),
      block("drinkSubTabs", {
        items:
          "Aperitifs\nCocktails\nMocktails\nVins\nBieres\nCidres\nSofts & Eaux\nDigestifs",
      }),
      block("menuCategory", {
        title: "Formules",
        category: "formules",
        subcategory: "",
      }),
      block("categoryDescription", {
        text: "Nos formules a volonte autour de la flammekueche.",
        category: "formules",
        subcategory: "",
      }),
      block("alert", {
        title: "Formules a volonte",
        body: "Toutes nos flammekueches sont elaborees a la minute pour votre plus grand plaisir.",
        category: "formules",
        variant: "formula",
      }),
      block("product", {
        title: "Elsassich",
        price: "14.30 EUR",
        priceRows: "",
        description: "Une formule simple pour profiter de l'esprit Flam's.",
        category: "formules",
        subcategory: "",
        badge: "",
        badgeImageUrl: "",
        iconUrl: "",
        imageUrl: "",
        variant: "standard",
      }),
      block("recommend", {
        title: "Je recommande une flammekueche",
        targetCategory: "flammekueches",
      }),
      block("divider", {
        label: "------------------------------------------------",
      }),
      block("menuCategory", {
        title: "Flammekueches",
        category: "flammekueches",
        subcategory: "Les incontournables",
      }),
      block("promo", {
        title: "Lance-Flam's",
        body: "Ajoutez un supplement flamme pour personnaliser la carte.",
        price: "",
        category: "flammekueches",
      }),
      block("product", {
        title: "Traditionnelle",
        price: "9.90 EUR",
        priceRows: "",
        description: "Creme, oignons, lardons.",
        category: "flammekueches",
        subcategory: "Les incontournables",
        badge: "",
        badgeImageUrl: "",
        iconUrl: "",
        imageUrl: "",
        variant: "standard",
      }),
      block("menuCategory", {
        title: "Bieres pressions",
        category: "boissons",
        subcategory: "Bieres",
      }),
      block("product", {
        title: "Brooklyn IPA Bodega Run (5 deg)",
        price: "",
        priceRows: "25cl|5.10 EUR\n50cl|8.50 EUR\nMASS|16.60 EUR",
        description: "Une IPA douce, peu amere et rafraichissante.",
        category: "boissons",
        subcategory: "Bieres",
        badge: "",
        badgeImageUrl: "",
        iconUrl: "",
        imageUrl: "",
        variant: "standard",
      }),
    ],
    updatedAt: new Date().toISOString(),
  });
}
