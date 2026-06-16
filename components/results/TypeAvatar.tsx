"use client";

/**
 * A lightweight, generated avatar/illustration for a personality type.
 *
 * Rather than ship 16 image assets, we render a distinctive monogram whose
 * gradient is derived from the type's "group" (Analysts/Diplomats/Sentinels/
 * Explorers). This keeps the hero visual original, themeable, and dependency-free.
 */

const GROUP_GRADIENT: Record<string, string> = {
  // Analysts (NT) — violet
  NT: "from-violet-400 to-fuchsia-500",
  // Diplomats (NF) — emerald
  NF: "from-emerald-400 to-teal-500",
  // Sentinels (SJ) — sky
  SJ: "from-sky-400 to-blue-600",
  // Explorers (SP) — amber
  SP: "from-amber-400 to-orange-500",
};

function groupOf(code: string): keyof typeof GROUP_GRADIENT {
  const [, s, , j] = code.toUpperCase().split("");
  if (code.includes("N") && code.includes("T")) return "NT";
  if (code.includes("N") && code.includes("F")) return "NF";
  if (s === "S" && j === "J") return "SJ";
  return "SP";
}

export function TypeAvatar({
  code,
  size = 96,
}: {
  code: string;
  size?: number;
}) {
  const gradient = GROUP_GRADIENT[groupOf(code)];
  return (
    <div
      className={`flex items-center justify-center rounded-3xl bg-gradient-to-br ${gradient} font-bold text-white shadow-lg ring-1 ring-white/30`}
      style={{ width: size, height: size, fontSize: size * 0.3 }}
      aria-hidden="true"
    >
      {code.toUpperCase()}
    </div>
  );
}
