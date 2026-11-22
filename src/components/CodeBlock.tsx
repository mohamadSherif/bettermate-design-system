"use client";

import { useState } from "react";

export function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };
  return (
    <div className="code">
      <button type="button" className="bm-btn bm-btn--sm bm-btn--outline code__copy" onClick={copy} aria-live="polite">
        {copied ? "Copied" : "Copy"}
      </button>
      <pre tabIndex={0}>
        <code>{code}</code>
      </pre>
    </div>
  );
}
