type Block =
  | { type: "h"; text: string }
  | { type: "quote"; text: string }
  | { type: "p"; text: string };

function parseBody(raw: string): Block[] {
  const blocks: Block[] = [];
  const chunks = raw.trim().split(/\n{2,}/);

  for (const chunk of chunks) {
    const text = chunk.trim();
    if (!text) continue;
    if (text.startsWith("## ")) {
      blocks.push({ type: "h", text: text.slice(3) });
      continue;
    }
    if (text.startsWith("> ")) {
      blocks.push({ type: "quote", text: text.replace(/^> /gm, "") });
      continue;
    }
    blocks.push({ type: "p", text });
  }
  return blocks;
}

export function ArticleBody({ source }: { source: string }) {
  const blocks = parseBody(source);

  return (
    <div className="text-base leading-relaxed text-fg sm:text-lg sm:leading-relaxed">
      {blocks.map((block, i) => {
        if (block.type === "h") {
          return (
            <h2
              key={i}
              className="mt-10 mb-3 text-lg font-medium tracking-tight"
            >
              {block.text}
            </h2>
          );
        }
        if (block.type === "quote") {
          return (
            <blockquote
              key={i}
              className="my-8 border-l border-fg pl-5 text-lg leading-snug text-muted"
            >
              {block.text}
            </blockquote>
          );
        }
        return (
          <p key={i} className="mb-5 last:mb-0">
            {block.text}
          </p>
        );
      })}
    </div>
  );
}
