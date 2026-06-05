import { ImageIcon, LayoutPanelTop, TypeIcon } from "lucide-react";
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
  icon: React.ComponentType<{ size?: number }>;
  createDefaultProps: () => BlockPropsByType[TType];
  fields: Array<BlockField<BlockPropsByType[TType]>>;
  render: (block: CardBlock<TType>) => React.ReactNode;
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
  }
}
