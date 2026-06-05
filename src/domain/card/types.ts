export type BlockType =
  | "text"
  | "image"
  | "section"
  | "menuTabs"
  | "drinkSubTabs"
  | "menuCategory"
  | "categoryDescription"
  | "product"
  | "alert"
  | "promo"
  | "recommend"
  | "divider";

export type TextBlockProps = {
  text: string;
  align: "left" | "center" | "right";
};

export type ImageBlockProps = {
  src: string;
  alt: string;
  caption: string;
};

export type SectionBlockProps = {
  title: string;
  description: string;
};

export type MenuTabsBlockProps = {
  items: string;
  activeCategory: string;
};

export type DrinkSubTabsBlockProps = {
  items: string;
};

export type MenuCategoryBlockProps = {
  title: string;
  category: string;
  subcategory: string;
};

export type CategoryDescriptionBlockProps = {
  text: string;
  category: string;
  subcategory: string;
};

export type ProductBlockProps = {
  title: string;
  price: string;
  priceRows: string;
  description: string;
  category: string;
  subcategory: string;
  badge: string;
  badgeImageUrl: string;
  iconUrl: string;
  imageUrl: string;
  variant: string;
};

export type AlertBlockProps = {
  title: string;
  body: string;
  category: string;
  variant: "formula" | "flame" | "info";
};

export type PromoBlockProps = {
  title: string;
  body: string;
  price: string;
  category: string;
};

export type RecommendBlockProps = {
  title: string;
  targetCategory: string;
};

export type DividerBlockProps = {
  label: string;
};

export type BlockPropsByType = {
  text: TextBlockProps;
  image: ImageBlockProps;
  section: SectionBlockProps;
  menuTabs: MenuTabsBlockProps;
  drinkSubTabs: DrinkSubTabsBlockProps;
  menuCategory: MenuCategoryBlockProps;
  categoryDescription: CategoryDescriptionBlockProps;
  product: ProductBlockProps;
  alert: AlertBlockProps;
  promo: PromoBlockProps;
  recommend: RecommendBlockProps;
  divider: DividerBlockProps;
};

export type CardBlock<TType extends BlockType = BlockType> =
  TType extends BlockType
    ? {
        id: string;
        type: TType;
        props: BlockPropsByType[TType];
      }
    : never;

export type DigitalCard = {
  id: string;
  title: string;
  blocks: CardBlock[];
  updatedAt: string;
};
