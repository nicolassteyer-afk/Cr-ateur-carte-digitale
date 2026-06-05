"use client";

import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Trash2 } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import type { CardBlock } from "@/domain/card/types";
import { blockRegistry, renderBlock } from "../blocks/registry";

type SortableBlockProps = {
  block: CardBlock;
  isSelected: boolean;
  onSelect: () => void;
  onDelete: () => void;
};

export function SortableBlock({
  block,
  isSelected,
  onSelect,
  onDelete,
}: SortableBlockProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: block.id,
    data: {
      source: "canvas",
      blockId: block.id,
    },
  });
  const definition = blockRegistry[block.type];

  return (
    <article
      ref={setNodeRef}
      className={`block-shell ${isSelected ? "selected" : ""} ${
        isDragging ? "dragging" : ""
      }`}
      onClick={onSelect}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
    >
      <div className="block-bar">
        <button
          className="drag-handle"
          title="Deplacer"
          type="button"
          {...attributes}
          {...listeners}
        >
          <GripVertical size={16} />
        </button>
        <span className="block-type">{definition.label}</span>
        <button
          className="icon-button"
          onClick={(event) => {
            event.stopPropagation();
            onDelete();
          }}
          title="Supprimer"
          type="button"
        >
          <Trash2 size={15} />
        </button>
      </div>
      <div className="block-content">{renderBlock(block)}</div>
    </article>
  );
}
