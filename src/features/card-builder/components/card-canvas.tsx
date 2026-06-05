"use client";

import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import type { CardBlock } from "@/domain/card/types";
import { SortableBlock } from "./sortable-block";

type CardCanvasProps = {
  blocks: CardBlock[];
  selectedBlockId: string | null;
  onSelectBlock: (blockId: string) => void;
  onDeleteBlock: (blockId: string) => void;
};

export function CardCanvas({
  blocks,
  selectedBlockId,
  onSelectBlock,
  onDeleteBlock,
}: CardCanvasProps) {
  const { isOver, setNodeRef } = useDroppable({
    id: "canvas",
    data: {
      source: "canvas",
    },
  });

  return (
    <main className="workspace">
      <div className="canvas-wrap">
        <div ref={setNodeRef} className={`canvas ${isOver ? "is-over" : ""}`}>
          <SortableContext
            items={blocks.map((block) => block.id)}
            strategy={verticalListSortingStrategy}
          >
            {blocks.length === 0 ? (
              <div className="canvas-empty">Glissez un bloc ici</div>
            ) : (
              blocks.map((block) => (
                <SortableBlock
                  block={block}
                  isSelected={selectedBlockId === block.id}
                  key={block.id}
                  onDelete={() => onDeleteBlock(block.id)}
                  onSelect={() => onSelectBlock(block.id)}
                />
              ))
            )}
          </SortableContext>
        </div>
      </div>
    </main>
  );
}
