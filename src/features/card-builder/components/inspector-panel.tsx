"use client";

import type { CardBlock } from "@/domain/card/types";
import { blockRegistry } from "../blocks/registry";

type InspectorPanelProps = {
  block: CardBlock | null;
  onChangeBlock: (block: CardBlock) => void;
};

export function InspectorPanel({ block, onChangeBlock }: InspectorPanelProps) {
  if (!block) {
    return (
      <aside className="panel inspector">
        <div className="panel-header">
          <div>
            <h2 className="panel-title">Proprietes</h2>
            <p className="panel-subtitle">Aucun bloc selectionne</p>
          </div>
        </div>
        <div className="panel-body">
          <p className="muted-note">Selectionnez un bloc pour le modifier.</p>
        </div>
      </aside>
    );
  }

  const definition = blockRegistry[block.type];

  return (
    <aside className="panel inspector">
      <div className="panel-header">
        <div>
          <h2 className="panel-title">Proprietes</h2>
          <p className="panel-subtitle">{definition.label}</p>
        </div>
      </div>
      <div className="panel-body">
        {definition.fields.map((field) => {
          const fieldKey = String(field.key);
          const props = block.props as Record<string, string>;
          const value = String(props[fieldKey] ?? "");

          return (
            <div className="field" key={fieldKey}>
              <label htmlFor={`${block.id}-${fieldKey}`}>
                {field.label}
              </label>
              {field.input === "textarea" ? (
                <textarea
                  id={`${block.id}-${fieldKey}`}
                  value={value}
                  onChange={(event) =>
                    onChangeBlock({
                      ...block,
                      props: {
                        ...block.props,
                        [fieldKey]: event.target.value,
                      },
                    } as CardBlock)
                  }
                />
              ) : null}
              {field.input === "text" ? (
                <input
                  id={`${block.id}-${fieldKey}`}
                  value={value}
                  onChange={(event) =>
                    onChangeBlock({
                      ...block,
                      props: {
                        ...block.props,
                        [fieldKey]: event.target.value,
                      },
                    } as CardBlock)
                  }
                />
              ) : null}
              {field.input === "select" ? (
                <select
                  id={`${block.id}-${fieldKey}`}
                  value={value}
                  onChange={(event) =>
                    onChangeBlock({
                      ...block,
                      props: {
                        ...block.props,
                        [fieldKey]: event.target.value,
                      },
                    } as CardBlock)
                  }
                >
                  {field.options?.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : null}
            </div>
          );
        })}
      </div>
    </aside>
  );
}
