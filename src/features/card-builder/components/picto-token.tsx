"use client";

import { useDraggable } from "@dnd-kit/core";

type PictoTokenProps = {
  id: string;
  label: string;
  url: string;
};

export function PictoToken({ id, label, url }: PictoTokenProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: `picto:${id}`,
      data: {
        source: "picto",
        iconUrl: url,
        label,
      },
    });

  return (
    <button
      ref={setNodeRef}
      className="picto-token"
      style={{
        opacity: isDragging ? 0.55 : 1,
        transform: transform
          ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
          : undefined,
      }}
      title={`Glisser ${label} sur un produit`}
      type="button"
      {...listeners}
      {...attributes}
    >
      <img alt="" src={url} />
      <span>{label}</span>
    </button>
  );
}
