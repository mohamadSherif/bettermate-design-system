import type { ComponentMeta } from "@/lib/content";
import { componentMarkup } from "@/lib/content";
import { CodeBlock } from "./CodeBlock";
import { Icon } from "./Icon";
import { Preview } from "./Preview";

/* A live preview with the markup that draws it, as Stacks shows its examples. */
export function Example({ card, code = true }: { card: ComponentMeta; code?: boolean }) {
  return (
    <div className="example">
      <Preview name={card.name} title={card.title} height={card.height} />
      {code && (
        <details className="example__code">
          <summary>
            <Icon name="chevron-right" size={18} />
            HTML
          </summary>
          <CodeBlock code={componentMarkup(card.name).trim()} />
        </details>
      )}
    </div>
  );
}
