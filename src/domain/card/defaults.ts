import type {
  BlockPropsByType,
  BlockType,
  ImageBlockProps,
  SectionBlockProps,
  TextBlockProps,
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
  };

  return defaults[type];
}
