import {
  BadgePercent,
  Beer,
  Flame,
  ImageIcon,
  LayoutList,
  LayoutPanelTop,
  ListTree,
  Minus,
  Sparkles,
  SquareMenu,
  TypeIcon,
  Utensils,
} from "lucide-react";
import type { ComponentType, ReactNode } from "react";
import { createDefaultBlockProps } from "@/domain/card/defaults";
import type {
  BlockPropsByType,
  BlockType,
  CardBlock,
} from "@/domain/card/types";

type BlockField<TProps> = {
  key: keyof TProps;
  label: string;
  input: "text" | "textarea" | "select";
  options?: Array<{ label: string; value: string }>;
};

type BlockDefinition<TType extends BlockType> = {
  type: TType;
  label: string;
  description: string;
  icon: ComponentType<{ size?: number }>;
  createDefaultProps: () => BlockPropsByType[TType];
  fields: Array<BlockField<BlockPropsByType[TType]>>;
  render: (block: CardBlock<TType>) => ReactNode;
};

function TextBlock({ props }: CardBlock<"text">) {
  return (
    <p className="render-text" style={{ textAlign: props.align }}>
      {props.text}
    </p>
  );
}

function ImageBlock({ props }: CardBlock<"image">) {
  if (!props.src) {
    return <div className="image-placeholder">Image</div>;
  }

  return (
    <figure style={{ margin: 0 }}>
      <img className="render-image" src={props.src} alt={props.alt} />
      {props.caption ? (
        <figcaption className="panel-subtitle" style={{ marginTop: 8 }}>
          {props.caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

function SectionBlock({ props }: CardBlock<"section">) {
  return (
    <section className="render-section">
      <h2>{props.title}</h2>
      <p>{props.description}</p>
    </section>
  );
}

function splitLines(value: string) {
  return value
    .split(/\r?\n/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function MenuTabsBlock({ props }: CardBlock<"menuTabs">) {
  return (
    <nav className="flams-tabs">
      {splitLines(props.items).map((item) => (
        <span
          className={`flams-tab ${item === props.activeCategory ? "active" : ""}`}
          key={item}
        >
          {item}
        </span>
      ))}
    </nav>
  );
}

function DrinkSubTabsBlock({ props }: CardBlock<"drinkSubTabs">) {
  return (
    <nav className="flams-subtabs">
      {splitLines(props.items).map((item) => (
        <span className="flams-subtab" key={item}>
          {item}
        </span>
      ))}
    </nav>
  );
}

function MenuCategoryBlock({ props }: CardBlock<"menuCategory">) {
  return (
    <div className="flams-category-title">
      <span>{props.title}</span>
      {props.subcategory ? <small>{props.subcategory}</small> : null}
    </div>
  );
}

function CategoryDescriptionBlock({
  props,
}: CardBlock<"categoryDescription">) {
  return <p className="flams-category-description">{props.text}</p>;
}

function ProductBlock({ props }: CardBlock<"product">) {
  return (
    <article className={`flams-product ${props.variant}`}>
      {props.badge ? <span className="flams-badge">{props.badge}</span> : null}
      {props.imageUrl ? (
        <img className="flams-product-image" src={props.imageUrl} alt="" />
      ) : null}
      <div className="flams-product-main">
        <div className="flams-product-header">
          <h3>
            {props.title}
            {props.iconUrl ? (
              <img className="flams-product-icon" src={props.iconUrl} alt="" />
            ) : null}
          </h3>
          <strong>{props.price}</strong>
        </div>
        {props.description ? <p>{props.description}</p> : null}
      </div>
    </article>
  );
}

function PromoBlock({ props }: CardBlock<"promo">) {
  return (
    <section className="flams-promo">
      <Flame size={34} />
      <h3>{props.title}</h3>
      <p>{props.body}</p>
      {props.price ? <strong>{props.price}</strong> : null}
    </section>
  );
}

function RecommendBlock({ props }: CardBlock<"recommend">) {
  return (
    <button className="flams-recommend" type="button">
      <Sparkles size={20} />
      {props.title}
    </button>
  );
}

function DividerBlock({ props }: CardBlock<"divider">) {
  return <div className="flams-divider">{props.label}</div>;
}

export const blockRegistry = {
  text: {
    type: "text",
    label: "Texte",
    description: "Titre, paragraphe ou note courte",
    icon: TypeIcon,
    createDefaultProps: () => createDefaultBlockProps("text"),
    fields: [
      { key: "text", label: "Texte", input: "textarea" },
      {
        key: "align",
        label: "Alignement",
        input: "select",
        options: [
          { label: "Gauche", value: "left" },
          { label: "Centre", value: "center" },
          { label: "Droite", value: "right" },
        ],
      },
    ],
    render: TextBlock,
  },
  image: {
    type: "image",
    label: "Image",
    description: "Visuel avec texte alternatif",
    icon: ImageIcon,
    createDefaultProps: () => createDefaultBlockProps("image"),
    fields: [
      { key: "src", label: "URL image", input: "text" },
      { key: "alt", label: "Texte alternatif", input: "text" },
      { key: "caption", label: "Legende", input: "text" },
    ],
    render: ImageBlock,
  },
  section: {
    type: "section",
    label: "Section",
    description: "Bloc de separation structurelle",
    icon: LayoutPanelTop,
    createDefaultProps: () => createDefaultBlockProps("section"),
    fields: [
      { key: "title", label: "Titre", input: "text" },
      { key: "description", label: "Description", input: "textarea" },
    ],
    render: SectionBlock,
  },
  menuTabs: {
    type: "menuTabs",
    label: "Onglets menu",
    description: "Barre de categories horizontale",
    icon: SquareMenu,
    createDefaultProps: () => createDefaultBlockProps("menuTabs"),
    fields: [
      { key: "items", label: "Categories", input: "textarea" },
      { key: "activeCategory", label: "Categorie active", input: "text" },
    ],
    render: MenuTabsBlock,
  },
  drinkSubTabs: {
    type: "drinkSubTabs",
    label: "Sous-menu boissons",
    description: "Aperitifs, vins, bieres...",
    icon: Beer,
    createDefaultProps: () => createDefaultBlockProps("drinkSubTabs"),
    fields: [{ key: "items", label: "Sous-categories", input: "textarea" }],
    render: DrinkSubTabsBlock,
  },
  menuCategory: {
    type: "menuCategory",
    label: "Titre categorie",
    description: "Separateur de rubrique",
    icon: ListTree,
    createDefaultProps: () => createDefaultBlockProps("menuCategory"),
    fields: [
      { key: "title", label: "Titre", input: "text" },
      { key: "category", label: "Categorie", input: "text" },
      { key: "subcategory", label: "Sous-categorie", input: "text" },
    ],
    render: MenuCategoryBlock,
  },
  categoryDescription: {
    type: "categoryDescription",
    label: "Description categorie",
    description: "Texte introductif de rubrique",
    icon: LayoutList,
    createDefaultProps: () => createDefaultBlockProps("categoryDescription"),
    fields: [
      { key: "text", label: "Texte", input: "textarea" },
      { key: "category", label: "Categorie", input: "text" },
      { key: "subcategory", label: "Sous-categorie", input: "text" },
    ],
    render: CategoryDescriptionBlock,
  },
  product: {
    type: "product",
    label: "Produit",
    description: "Nom, prix, description, badge",
    icon: Utensils,
    createDefaultProps: () => createDefaultBlockProps("product"),
    fields: [
      { key: "title", label: "Nom", input: "text" },
      { key: "price", label: "Prix", input: "text" },
      { key: "description", label: "Description", input: "textarea" },
      { key: "category", label: "Categorie", input: "text" },
      { key: "subcategory", label: "Sous-categorie", input: "text" },
      { key: "badge", label: "Badge", input: "text" },
      { key: "iconUrl", label: "URL picto", input: "text" },
      { key: "imageUrl", label: "URL image", input: "text" },
      {
        key: "variant",
        label: "Style",
        input: "select",
        options: [
          { label: "Standard", value: "standard" },
          { label: "Vin", value: "wine" },
          { label: "Special", value: "special" },
        ],
      },
    ],
    render: ProductBlock,
  },
  promo: {
    type: "promo",
    label: "Encart promo",
    description: "Bloc Lance-Flam's ou message fort",
    icon: BadgePercent,
    createDefaultProps: () => createDefaultBlockProps("promo"),
    fields: [
      { key: "title", label: "Titre", input: "text" },
      { key: "body", label: "Texte", input: "textarea" },
      { key: "price", label: "Prix", input: "text" },
      { key: "category", label: "Categorie", input: "text" },
    ],
    render: PromoBlock,
  },
  recommend: {
    type: "recommend",
    label: "Recommandation",
    description: "Bouton de renvoi vers une categorie",
    icon: Sparkles,
    createDefaultProps: () => createDefaultBlockProps("recommend"),
    fields: [
      { key: "title", label: "Texte", input: "text" },
      { key: "targetCategory", label: "Categorie cible", input: "text" },
    ],
    render: RecommendBlock,
  },
  divider: {
    type: "divider",
    label: "Separateur",
    description: "Trait ou rupture visuelle",
    icon: Minus,
    createDefaultProps: () => createDefaultBlockProps("divider"),
    fields: [{ key: "label", label: "Libelle", input: "text" }],
    render: DividerBlock,
  },
} satisfies { [TType in BlockType]: BlockDefinition<TType> };

export const availableBlocks = Object.values(blockRegistry);

export function renderBlock(block: CardBlock) {
  switch (block.type) {
    case "text":
      return blockRegistry.text.render(block);
    case "image":
      return blockRegistry.image.render(block);
    case "section":
      return blockRegistry.section.render(block);
    case "menuTabs":
      return blockRegistry.menuTabs.render(block);
    case "drinkSubTabs":
      return blockRegistry.drinkSubTabs.render(block);
    case "menuCategory":
      return blockRegistry.menuCategory.render(block);
    case "categoryDescription":
      return blockRegistry.categoryDescription.render(block);
    case "product":
      return blockRegistry.product.render(block);
    case "promo":
      return blockRegistry.promo.render(block);
    case "recommend":
      return blockRegistry.recommend.render(block);
    case "divider":
      return blockRegistry.divider.render(block);
  }
}
