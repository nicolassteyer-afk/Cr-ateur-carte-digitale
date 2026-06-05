"use client";

import { useDraggable } from "@dnd-kit/core";
import type { BlockType } from "@/domain/card/types";

type PaletteBlockProps = {
  type: BlockType;
  label: string;
  description: string;
  icon: React.ComponentType<{ size?: number }>;
};

export function PaletteBlock({
  type,
  label,
  description,
  icon: Icon,
}: PaletteBlockProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: `palette:${type}`,
      data: {
        source: "palette",
        type,
      },
    });

  return (
    <button
      ref={setNodeRef}
      className="palette-item"
      style={{
        opacity: isDragging ? 0.55 : 1,
        transform: transform
          ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
          : undefined,
      }}
      type="button"
      {...listeners}
      {...attributes}
    >
      <span className="palette-icon">
        <Icon size={16} />
      </span>
      <span>
        <span className="palette-label">{label}</span>
        <span className="palette-description">{description}</span>
      </span>
    </button>
  );
}
