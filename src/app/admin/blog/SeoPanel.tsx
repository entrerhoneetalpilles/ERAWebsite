"use client";

import type { SeoResult, SeoItem } from "./seoScorer";

const GRADE_COLOR: Record<string, string> = {
  S: "text-emerald-600",
  A: "text-green-600",
  B: "text-yellow-600",
  C: "text-orange-500",
  D: "text-red-600",
};

const STATUS_BAR: Record<string, string> = {
  good: "bg-emerald-500",
  warn: "bg-yellow-400",
  bad: "bg-red-500",
};

const STATUS_DOT: Record<string, string> = {
  good: "bg-emerald-500",
  warn: "bg-yellow-400",
  bad: "bg-red-500",
};

function ScoreBar({ item }: { item: SeoItem }) {
  const pct = Math.round((item.score / item.max) * 100);
  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-1">
        <span className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <span className={`w-2 h-2 rounded-full ${STATUS_DOT[item.status]}`} />
          {item.label}
        </span>
        <span className="text-xs font-mono text-gray-500">
          {item.score}/{item.max}
        </span>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-2">
        <div
          className={`h-2 rounded-full transition-all duration-500 ${STATUS_BAR[item.status]}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      {item.tip && item.tip !== "Parfait !" && item.tip !== "Excellent contenu !" && item.tip !== "URL propre !" && item.tip !== "Maillage local excellent !" ? (
        <p className="mt-1 text-xs text-gray-500 leading-snug">{item.tip}</p>
      ) : (
        <p className="mt-1 text-xs text-emerald-600 leading-snug">{item.tip}</p>
      )}
    </div>
  );
}

function GaugeDial({ pct }: { pct: number }) {
  const r = 42;
  const circ = Math.PI * r;
  const dash = (pct / 100) * circ;
  const color = pct >= 90 ? "#10b981" : pct >= 75 ? "#22c55e" : pct >= 58 ? "#eab308" : pct >= 40 ? "#f97316" : "#ef4444";
  return (
    <svg viewBox="0 0 100 56" className="w-36 h-20">
      <path
        d={`M 8 52 A ${r} ${r} 0 0 1 92 52`}
        fill="none"
        stroke="#e5e7eb"
        strokeWidth="10"
        strokeLinecap="round"
      />
      <path
        d={`M 8 52 A ${r} ${r} 0 0 1 92 52`}
        fill="none"
        stroke={color}
        strokeWidth="10"
        strokeLinecap="round"
        strokeDasharray={`${dash} ${circ}`}
        style={{ transition: "stroke-dasharray 0.6s ease" }}
      />
    </svg>
  );
}

export default function SeoPanel({ result }: { result: SeoResult }) {
  const pct = Math.round((result.total / result.max) * 100);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 sticky top-6">
      <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
        Score SEO
      </h2>

      {/* Gauge */}
      <div className="flex flex-col items-center mb-5">
        <div className="relative">
          <GaugeDial pct={pct} />
          <div className="absolute inset-0 flex flex-col items-center justify-end pb-1">
            <span className={`text-3xl font-bold font-mono ${GRADE_COLOR[result.grade]}`}>
              {result.grade}
            </span>
          </div>
        </div>
        <div className="text-center mt-1">
          <span className="text-xl font-bold text-gray-800">{result.total}</span>
          <span className="text-sm text-gray-400">/{result.max}</span>
          <span className="ml-2 text-sm font-medium text-gray-500">({pct}%)</span>
        </div>
        <p className="text-xs text-gray-400 mt-1">
          {pct >= 90
            ? "Prêt à écraser la concurrence 🏆"
            : pct >= 75
            ? "Très bon — quelques ajustements"
            : pct >= 58
            ? "Moyen — travaillez les points en orange"
            : pct >= 40
            ? "Insuffisant pour dominer localement"
            : "À retravailler en profondeur"}
        </p>
      </div>

      <div className="border-t border-gray-100 pt-4">
        {result.items.map((item) => (
          <div key={item.label}>
            <ScoreBar item={item} />
          </div>
        ))}
      </div>

      {/* Local SEO reminder */}
      <div className="mt-3 p-3 bg-[#F5F0E8] rounded-xl text-xs text-gray-600 leading-relaxed">
        <span className="font-semibold text-[#6E8052]">Priorité SEO local :</span>{" "}
        Mentionne Provence, Alpilles, Rhône et les communes ciblées dans le titre,
        la description ET le contenu pour dominer les recherches locales.
      </div>
    </div>
  );
}
