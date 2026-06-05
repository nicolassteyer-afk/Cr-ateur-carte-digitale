"use client";

import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { Download, Plus, RotateCcw, Save, Upload } from "lucide-react";
import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import { createBlock, createCard, touchCard } from "@/domain/card/factory";
import type { BlockType, CardBlock, DigitalCard } from "@/domain/card/types";
import { availableBlocks, blockRegistry } from "../blocks/registry";
import {
  clearStoredCard,
  loadStoredCard,
  saveStoredCard,
} from "../storage/card-storage";
import { CardCanvas } from "./card-canvas";
import { InspectorPanel } from "./inspector-panel";
import { PaletteBlock } from "./palette-block";

type DragData = {
  source?: "palette" | "canvas";
  type?: BlockType;
  blockId?: string;
};

export function CardBuilder() {
  const [card, setCard] = useState<DigitalCard>(() => createCard());
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [activePaletteType, setActivePaletteType] = useState<BlockType | null>(
    null,
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const selectedBlock = useMemo(
    () => card.blocks.find((block) => block.id === selectedBlockId) ?? null,
    [card.blocks, selectedBlockId],
  );
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 6,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  useEffect(() => {
    const stored = loadStoredCard();

    if (stored) {
      setCard(stored);
      setSelectedBlockId(stored.blocks[0]?.id ?? null);
    }
  }, []);

  useEffect(() => {
    saveStoredCard(card);
  }, [card]);

  function updateCard(updater: (current: DigitalCard) => DigitalCard) {
    setCard((current) => touchCard(updater(current)));
  }

  function handleDragStart(event: DragStartEvent) {
    const data = event.active.data.current as DragData;
    setActivePaletteType(data.source === "palette" ? data.type ?? null : null);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    const data = active.data.current as DragData;

    setActivePaletteType(null);

    if (!over) {
      return;
    }

    if (data.source === "palette" && data.type) {
      const newBlock = createBlock(data.type);
      const overIndex = card.blocks.findIndex((block) => block.id === over.id);
      const insertIndex =
        over.id === "canvas" || overIndex < 0 ? card.blocks.length : overIndex;

      updateCard((current) => ({
        ...current,
        blocks: [
          ...current.blocks.slice(0, insertIndex),
          newBlock,
          ...current.blocks.slice(insertIndex),
        ],
      }));
      setSelectedBlockId(newBlock.id);
      return;
    }

    if (data.source === "canvas" && active.id !== over.id) {
      const oldIndex = card.blocks.findIndex((block) => block.id === active.id);
      const newIndex = card.blocks.findIndex((block) => block.id === over.id);

      if (oldIndex >= 0 && newIndex >= 0) {
        updateCard((current) => ({
          ...current,
          blocks: arrayMove(current.blocks, oldIndex, newIndex),
        }));
      }
    }
  }

  function updateBlock(nextBlock: CardBlock) {
    updateCard((current) => ({
      ...current,
      blocks: current.blocks.map((block) =>
        block.id === nextBlock.id ? nextBlock : block,
      ),
    }));
  }

  function deleteBlock(blockId: string) {
    updateCard((current) => ({
      ...current,
      blocks: current.blocks.filter((block) => block.id !== blockId),
    }));

    if (selectedBlockId === blockId) {
      const nextBlock = card.blocks.find((block) => block.id !== blockId);
      setSelectedBlockId(nextBlock?.id ?? null);
    }
  }

  function addBlock(type: BlockType) {
    const block = createBlock(type);

    updateCard((current) => ({
      ...current,
      blocks: [...current.blocks, block],
    }));
    setSelectedBlockId(block.id);
  }

  function resetCard() {
    const nextCard = createCard();

    clearStoredCard();
    setCard(nextCard);
    setSelectedBlockId(null);
  }

  function exportCard() {
    const blob = new Blob([JSON.stringify(card, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `${card.title.toLowerCase().replace(/\s+/g, "-")}.json`;
    link.click();
    URL.revokeObjectURL(url);
  }

  async function importCard(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const imported = JSON.parse(await file.text()) as DigitalCard;

    setCard(touchCard(imported));
    setSelectedBlockId(imported.blocks[0]?.id ?? null);
    event.target.value = "";
  }

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
      sensors={sensors}
    >
      <div className="builder-shell">
        <aside className="panel sidebar">
          <div className="panel-header">
            <div>
              <h1 className="panel-title">Blocs</h1>
              <p className="panel-subtitle">Carte digitale</p>
            </div>
          </div>
          <div className="panel-body">
            {availableBlocks.map((block) => (
              <PaletteBlock
                description={block.description}
                icon={block.icon}
                key={block.type}
                label={block.label}
                type={block.type}
              />
            ))}
            <div className="toolbar" style={{ marginTop: 6 }}>
              {availableBlocks.map((block) => (
                <button
                  className="icon-button"
                  key={block.type}
                  onClick={() => addBlock(block.type)}
                  title={`Ajouter ${block.label}`}
                  type="button"
                >
                  <Plus size={15} />
                </button>
              ))}
            </div>
          </div>
        </aside>

        <section className="workspace">
          <header className="topbar">
            <input
              aria-label="Nom de la carte"
              className="card-name"
              value={card.title}
              onChange={(event) =>
                updateCard((current) => ({
                  ...current,
                  title: event.target.value,
                }))
              }
            />
            <div className="toolbar">
              <button
                className="icon-button"
                onClick={() => saveStoredCard(card)}
                title="Sauvegarder"
                type="button"
              >
                <Save size={16} />
              </button>
              <button
                className="icon-button"
                onClick={exportCard}
                title="Exporter"
                type="button"
              >
                <Download size={16} />
              </button>
              <button
                className="icon-button"
                onClick={() => fileInputRef.current?.click()}
                title="Importer"
                type="button"
              >
                <Upload size={16} />
              </button>
              <button
                className="icon-button"
                onClick={resetCard}
                title="Reinitialiser"
                type="button"
              >
                <RotateCcw size={16} />
              </button>
              <input
                accept="application/json"
                hidden
                onChange={importCard}
                ref={fileInputRef}
                type="file"
              />
            </div>
          </header>
          <CardCanvas
            blocks={card.blocks}
            onDeleteBlock={deleteBlock}
            onSelectBlock={setSelectedBlockId}
            selectedBlockId={selectedBlockId}
          />
        </section>

        <InspectorPanel block={selectedBlock} onChangeBlock={updateBlock} />
      </div>

      <DragOverlay>
        {activePaletteType ? (
          <div className="palette-item" style={{ width: 230 }}>
            <span className="palette-icon">
              {(() => {
                const Icon = blockRegistry[activePaletteType].icon;
                return <Icon size={16} />;
              })()}
            </span>
            <span>
              <span className="palette-label">
                {blockRegistry[activePaletteType].label}
              </span>
              <span className="palette-description">
                {blockRegistry[activePaletteType].description}
              </span>
            </span>
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
