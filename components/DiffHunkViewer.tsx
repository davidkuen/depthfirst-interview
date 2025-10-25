import { useMemo } from "react";

type HunkLine =
  | { kind: "header"; text: string }
  | {
      kind: "add" | "del" | "ctx";
      text: string;
      oldNo?: number;
      newNo?: number;
    };

function parseHunk(hunk: string): HunkLine[] {
  const lines = hunk.replace(/\r\n/g, "\n").split("\n");
  if (!lines.length) return [];

  // Expect header like: @@ -12,7 +12,9 @@ optional heading
  const header = lines[0] || "";
  const m = header.match(/^@@ -(\d+)(?:,(\d+))? \+(\d+)(?:,(\d+))? @@/);
  let oldNo = m ? parseInt(m[1], 10) : undefined;
  let newNo = m ? parseInt(m[3], 10) : undefined;

  const out: HunkLine[] = [{ kind: "header", text: header }];

  for (let i = 1; i < lines.length; i++) {
    const raw = lines[i];

    if (raw.startsWith("+")) {
      out.push({
        kind: "add",
        text: raw.slice(1),
        oldNo: undefined,
        newNo: newNo!,
      });
      if (newNo !== undefined) newNo++;
    } else if (raw.startsWith("-")) {
      out.push({
        kind: "del",
        text: raw.slice(1),
        oldNo: oldNo!,
        newNo: undefined,
      });
      if (oldNo !== undefined) oldNo++;
    } else if (raw.startsWith(" ")) {
      out.push({
        kind: "ctx",
        text: raw.slice(1),
        oldNo: oldNo!,
        newNo: newNo!,
      });
      if (oldNo !== undefined) oldNo++;
      if (newNo !== undefined) newNo++;
    } else if (raw === "\\ No newline at end of file") {
      // treat as context annotation
      out.push({ kind: "ctx", text: raw, oldNo: undefined, newNo: undefined });
    } else if (raw.trim() === "" && i === lines.length - 1) {
      // ignore trailing blank
    } else {
      // Fallback: treat as context if the line doesn't have a diff marker
      out.push({ kind: "ctx", text: raw, oldNo: oldNo!, newNo: newNo! });
      if (oldNo !== undefined) oldNo++;
      if (newNo !== undefined) newNo++;
    }
  }
  return out;
}

export function DiffHunkViewer({ hunk }: { hunk: string }) {
  const rows = useMemo(() => parseHunk(hunk), [hunk]);

  return (
    <div className="w-full overflow-auto border border-gray-800">
      <div className="font-mono text-sm leading-6">
        {rows.map((r, idx) => {
          if (r.kind === "header") {
            return (
              <div
                key={idx}
                className="sticky top-0 z-10 bg-slate-800/80 backdrop-blur px-3 py-1.5 font-semibold text-slate-200 border-b border-slate-700"
              >
                {r.text}
              </div>
            );
          }

          const bg =
            r.kind === "add"
              ? "bg-green-900/30"
              : r.kind === "del"
              ? "bg-red-900/30"
              : "bg-transparent";

          const sign = r.kind === "add" ? "+" : r.kind === "del" ? "-" : " ";

          return (
            <div
              key={idx}
              className={`grid grid-cols-[64px_64px_1fr] gap-3 px-3 py-0.5 ${bg}`}
            >
              <div className="text-right text-xs text-slate-400 select-none tabular-nums">
                {r.oldNo ?? ""}
              </div>
              <div className="text-right text-xs text-slate-400 select-none tabular-nums">
                {r.newNo ?? ""}
              </div>
              <div className="whitespace-pre overflow-x-auto">
                <span className="select-none text-slate-400">{sign}</span>
                <span>{r.text}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
