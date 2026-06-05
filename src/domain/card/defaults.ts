import type {
  BlockPropsByType,
  BlockType,
  ImageBlockProps,
  MenuCategoryBlockProps,
  MenuTabsBlockProps,
  ProductBlockProps,
  PromoBlockProps,
  RecommendBlockProps,
  SectionBlockProps,
  TextBlockProps,
  AlertBlockProps,
  CategoryDescriptionBlockProps,
  DividerBlockProps,
  DrinkSubTabsBlockProps,
} from "./types";

export function createDefaultBlockProps<TType extends BlockType>(
  type: TType,
): BlockPropsByType[TType] {
  const defaults = {
    text: {
      text: "Texte de la carte",
      align: "left",
    } satisfies TextBlockProps,
    image: {
      src: "",
      alt: "",
      caption: "",
    } satisfies ImageBlockProps,
    section: {
      title: "Section",
      description: "Description courte",
    } satisfies SectionBlockProps,
    menuTabs: {
      items:
        "Boissons\nFormules a volonte\nA partager\nEntrees\nFlammekueches\nPates Alsaciennes\nFlammekueches sucrees\nDesserts & Glaces\nCafeteria",
      activeCategory: "Formules a volonte",
    } satisfies MenuTabsBlockProps,
    drinkSubTabs: {
      items:
        "Aperitifs\nCocktails\nMocktails\nVins\nBieres\nCidres\nSofts & Eaux\nDigestifs",
    } satisfies DrinkSubTabsBlockProps,
    menuCategory: {
      title: "Formules",
      category: "formules",
      subcategory: "",
    } satisfies MenuCategoryBlockProps,
    categoryDescription: {
      text: "Une description courte pour guider le client.",
      category: "formules",
      subcategory: "",
    } satisfies CategoryDescriptionBlockProps,
    product: {
      title: "Nom du produit",
      price: "9.90 EUR",
      priceRows: "",
      description: "Description du produit",
      category: "formules",
      subcategory: "",
      badge: "",
      badgeImageUrl: "",
      iconUrl: "",
      imageUrl: "",
      variant: "standard",
    } satisfies ProductBlockProps,
    alert: {
      title: "Information",
      body: "Message important de la carte.",
      category: "formules",
      variant: "info",
    } satisfies AlertBlockProps,
    promo: {
      title: "Lance-Flam's",
      body: "Un encart promotionnel visible dans une categorie.",
      price: "",
      category: "flammekueches",
    } satisfies PromoBlockProps,
    recommend: {
      title: "Je recommande une flammekueche",
      targetCategory: "flammekueches",
    } satisfies RecommendBlockProps,
    divider: {
      label: "----------------",
    } satisfies DividerBlockProps,
  };

  return defaults[type];
}
