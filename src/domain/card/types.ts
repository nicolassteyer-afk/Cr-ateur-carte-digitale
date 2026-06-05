export type BlockType = "text" | "image" | "section";

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

export type BlockPropsByType = {
  text: TextBlockProps;
  image: ImageBlockProps;
  section: SectionBlockProps;
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
