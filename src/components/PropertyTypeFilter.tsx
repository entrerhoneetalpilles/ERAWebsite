"use client";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

interface FilterItem {
  slug: string;
  label: string;
}

export default function PropertyTypeFilter({ types }: { types: FilterItem[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const current = searchParams.get("type") ?? "";

  const setType = (slug: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (slug) params.set("type", slug);
    else params.delete("type");
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const base = "px-4 py-2 rounded-full text-sm font-medium transition-colors border";
  const activeClass = `${base} bg-[var(--color-rhone)] text-white border-[var(--color-rhone)]`;
  const inactiveClass = `${base} bg-white text-gray-700 border-gray-200 hover:border-[var(--color-rhone)] hover:text-[var(--color-rhone)]`;

  return (
    <div className="flex flex-wrap gap-2">
      <button onClick={() => setType("")} className={!current ? activeClass : inactiveClass}>
        Tous les biens
      </button>
      {types.map((t) => (
        <button
          key={t.slug}
          onClick={() => setType(t.slug)}
          className={current === t.slug ? activeClass : inactiveClass}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}
