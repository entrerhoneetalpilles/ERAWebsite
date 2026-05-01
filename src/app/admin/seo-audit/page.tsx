import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Rapport SEO Complet — entre-rhone-alpilles.fr",
  robots: { index: false, follow: false },
};

// ── Composants helpers ────────────────────────────────────────────

function ScoreBar({ score }: { score: number }) {
  const color =
    score >= 80 ? "bg-emerald-500" : score >= 60 ? "bg-yellow-500" : score >= 40 ? "bg-orange-500" : "bg-red-500";
  const textColor =
    score >= 80 ? "text-emerald-700" : score >= 60 ? "text-yellow-700" : score >= 40 ? "text-orange-700" : "text-red-700";
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 bg-gray-200 rounded-full h-2">
        <div className={`${color} h-2 rounded-full transition-all`} style={{ width: `${score}%` }} />
      </div>
      <span className={`font-mono font-bold text-sm w-14 text-right ${textColor}`}>{score}/100</span>
    </div>
  );
}

function Impact({ level }: { level: "Critique" | "Élevé" | "Moyen" | "Faible" }) {
  const styles: Record<string, string> = {
    Critique: "bg-red-100 text-red-800 border-red-300",
    Élevé: "bg-orange-100 text-orange-800 border-orange-300",
    Moyen: "bg-yellow-100 text-yellow-800 border-yellow-300",
    Faible: "bg-blue-100 text-blue-800 border-blue-300",
  };
  return (
    <span className={`${styles[level]} border text-xs font-semibold px-2 py-0.5 rounded`}>{level}</span>
  );
}

function Priority({ level }: { level: "P0" | "P1" | "P2" | "P3" }) {
  const styles: Record<string, string> = {
    P0: "bg-red-600 text-white",
    P1: "bg-orange-500 text-white",
    P2: "bg-yellow-500 text-white",
    P3: "bg-sky-500 text-white",
  };
  return <span className={`${styles[level]} text-xs font-bold px-2 py-0.5 rounded`}>{level}</span>;
}

function Code({ children }: { children: string }) {
  return (
    <pre className="bg-gray-900 text-gray-100 rounded-lg p-4 text-xs overflow-x-auto my-3 leading-relaxed whitespace-pre">
      <code>{children}</code>
    </pre>
  );
}

function IssueCard({
  title,
  impact,
  priority,
  children,
  solution,
}: {
  title: string;
  impact: "Critique" | "Élevé" | "Moyen" | "Faible";
  priority: "P0" | "P1" | "P2" | "P3";
  children: ReactNode;
  solution?: ReactNode;
}) {
  const border: Record<string, string> = {
    Critique: "border-red-400",
    Élevé: "border-orange-400",
    Moyen: "border-yellow-400",
    Faible: "border-sky-400",
  };
  return (
    <div className={`border-l-4 ${border[impact]} bg-white rounded-r-lg p-4 my-3 shadow-sm`}>
      <div className="flex items-start justify-between gap-3 mb-2">
        <h4 className="font-semibold text-gray-900 text-sm leading-snug">{title}</h4>
        <div className="flex gap-2 shrink-0">
          <Impact level={impact} />
          <Priority level={priority} />
        </div>
      </div>
      <div className="text-sm text-gray-700 space-y-1">{children}</div>
      {solution && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">✅ Solution</p>
          <div className="text-sm text-gray-700">{solution}</div>
        </div>
      )}
    </div>
  );
}

function Check({ ok, children }: { ok: boolean; children: ReactNode }) {
  return (
    <div className="flex items-start gap-2 text-sm py-0.5">
      <span className={`mt-0.5 shrink-0 ${ok ? "text-emerald-500" : "text-red-500"}`}>{ok ? "✅" : "❌"}</span>
      <span className="text-gray-700">{children}</span>
    </div>
  );
}

function SectionTitle({ id, emoji, title, score }: { id: string; emoji: string; title: string; score?: number }) {
  const color =
    score === undefined ? "" : score >= 80 ? "text-emerald-600" : score >= 60 ? "text-yellow-600" : "text-red-600";
  return (
    <h2
      id={id}
      className="flex items-center justify-between text-xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-gray-200 scroll-mt-28"
    >
      <span>
        {emoji} {title}
      </span>
      {score !== undefined && <span className={`font-mono text-lg ${color}`}>{score}/100</span>}
    </h2>
  );
}

function Sub({ title, score }: { title: string; score?: number }) {
  const color =
    score === undefined ? "" : score >= 80 ? "text-emerald-600" : score >= 60 ? "text-yellow-600" : "text-red-600";
  return (
    <h3 className="flex items-center justify-between text-base font-semibold text-gray-800 mt-8 mb-3">
      <span>{title}</span>
      {score !== undefined && <span className={`font-mono text-sm ${color}`}>{score}/100</span>}
    </h3>
  );
}

function Table({
  headers,
  rows,
}: {
  headers: string[];
  rows: (string | ReactNode)[][];
}) {
  return (
    <div className="overflow-x-auto my-4">
      <table className="w-full text-xs border-collapse">
        <thead>
          <tr className="bg-gray-100">
            {headers.map((h) => (
              <th key={h} className="text-left p-2 font-semibold text-gray-700 whitespace-nowrap">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
              {row.map((cell, j) => (
                <td key={j} className="p-2 align-top">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`bg-white rounded-xl border p-5 shadow-sm ${className}`}>{children}</div>;
}

function InfoBox({ color, children }: { color: "amber" | "blue" | "red"; children: ReactNode }) {
  const styles: Record<string, string> = {
    amber: "bg-amber-50 border-amber-200 text-amber-900",
    blue: "bg-blue-50 border-blue-200 text-blue-900",
    red: "bg-red-50 border-red-200 text-red-900",
  };
  return <div className={`${styles[color]} border rounded-xl p-4 text-sm my-4`}>{children}</div>;
}

// ── Page principale ───────────────────────────────────────────────

export default function SeoAuditPage() {
  return (
    <div className="min-h-screen bg-gray-50 font-[family-name:var(--font-dm-sans)]">
      {/* ── Header sticky ── */}
      <header className="bg-white border-b sticky top-0 z-30 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wider">Rapport SEO Expert · Audit complet</p>
            <p className="font-bold text-gray-900">entre-rhone-alpilles.fr</p>
          </div>
          <div className="flex items-center gap-6 shrink-0">
            <div className="text-right">
              <p className="text-xs text-gray-400">Score global pondéré</p>
              <p className="text-2xl font-bold text-orange-500 font-mono leading-none">68/100</p>
            </div>
            <div className="text-right hidden sm:block">
              <p className="text-xs text-gray-400">Date d&apos;audit</p>
              <p className="text-sm font-medium text-gray-900">Avril 2026</p>
            </div>
          </div>
        </div>
        <nav className="max-w-6xl mx-auto px-6 overflow-x-auto">
          <div className="flex gap-0.5 pb-2 whitespace-nowrap text-xs">
            {[
              ["#s1", "1 · Vue d'ensemble"],
              ["#s2", "2 · Technique"],
              ["#s3", "3 · On-Page"],
              ["#s4", "4 · Off-Page"],
              ["#s5", "5 · Local SEO"],
              ["#s6", "6 · Mots-clés"],
              ["#s7", "7 · Concurrence"],
              ["#s8", "8 · Analytics"],
              ["#s9", "9 · IA & SGE"],
              ["#s10", "10 · Accessibilité"],
              ["#s11", "11 · Plan d'action"],
              ["#s12", "12 · Projection"],
            ].map(([href, label]) => (
              <a
                key={href}
                href={href}
                className="px-3 py-1 rounded hover:bg-gray-100 text-gray-500 hover:text-gray-900 transition-colors"
              >
                {label}
              </a>
            ))}
          </div>
        </nav>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10 space-y-20">

        {/* ════════════════════════════════════════════════════════
            SECTION 1 · VUE D'ENSEMBLE
        ════════════════════════════════════════════════════════ */}
        <section>
          <SectionTitle id="s1" emoji="🔍" title="VUE D'ENSEMBLE & SYNTHÈSE EXÉCUTIVE" score={68} />

          {/* Tableau des scores */}
          <Card className="mb-6">
            <h3 className="text-sm font-semibold text-gray-600 mb-4 uppercase tracking-wide">
              Répartition du score global pondéré
            </h3>
            <div className="space-y-3">
              {[
                ["SEO Technique", 80, "25 %"],
                ["SEO On-Page & Contenu", 76, "20 %"],
                ["SEO Off-Page & Autorité", 38, "20 %"],
                ["SEO Local", 76, "15 %"],
                ["Mots-clés & Positionnement", 60, "10 %"],
                ["Analytics & Tracking", 70, "5 %"],
                ["IA & SGE", 82, "5 %"],
              ].map(([label, score, poids]) => (
                <div key={label as string} className="grid grid-cols-[1fr_auto_80px] items-center gap-3">
                  <span className="text-sm text-gray-700">{label as string}</span>
                  <span className="text-xs text-gray-400 w-10 text-right">{poids as string}</span>
                  <ScoreBar score={score as number} />
                </div>
              ))}
              <div className="border-t pt-3 grid grid-cols-[1fr_auto_80px] items-center gap-3 font-bold">
                <span className="text-sm text-gray-900">GLOBAL PONDÉRÉ</span>
                <span className="text-xs text-gray-400 w-10 text-right">100 %</span>
                <ScoreBar score={68} />
              </div>
            </div>
          </Card>

          {/* Forces & Problèmes */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <Card>
              <h3 className="font-semibold text-emerald-700 mb-4">🏆 Top 5 Forces SEO actuelles</h3>
              <ol className="space-y-3">
                {[
                  [
                    "Next.js SSR/ISR natif",
                    "Tout le contenu est rendu côté serveur — Googlebot indexe sans exécuter de JS.",
                  ],
                  [
                    "Données structurées complètes sur les pages clés",
                    "LocalBusiness, FAQPage, ProfessionalService, ItemList correctement implémentés.",
                  ],
                  [
                    "Sitemap dynamique 200+ URLs avec ISR",
                    "Revalidation toutes les heures, priorités différenciées par cercle géographique.",
                  ],
                  [
                    "Architecture SEO local — 20 communes × 3 types",
                    "60 landing pages locales ciblant chaque commune du territoire Alpilles/Rhône.",
                  ],
                  [
                    "Optimisation images AVIF/WebP + cache 30 jours",
                    "Formats next-gen activés, minimumCacheTTL 30j, assets statiques 1 an immutable.",
                  ],
                ].map(([title, desc], i) => (
                  <li key={i} className="flex gap-3 text-sm">
                    <span className="shrink-0 w-5 h-5 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-xs font-bold">
                      {i + 1}
                    </span>
                    <div>
                      <p className="font-medium text-gray-900">{title as string}</p>
                      <p className="text-gray-500 text-xs mt-0.5">{desc as string}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </Card>
            <Card>
              <h3 className="font-semibold text-red-700 mb-4">🚨 Top 5 Problèmes critiques</h3>
              <ol className="space-y-3">
                {[
                  [
                    "HSTS (Strict-Transport-Security) absent",
                    "Expose aux attaques SSL stripping. Signal de confiance manquant pour Google.",
                  ],
                  [
                    "Consent Mode v2 non implémenté",
                    "Non-conformité RGPD + Google dégradé la modélisation des conversions sans lui.",
                  ],
                  [
                    "Article JSON-LD absent sur toutes les pages blog",
                    "Aucun rich snippet d'article (date, auteur) dans les SERP — CTR sous-optimisé.",
                  ],
                  [
                    "CSP frame-src 'none' bloque le fallback GTM noscript",
                    "Bug de tracking actif : le tag GTM ne se charge pas sans JavaScript.",
                  ],
                  [
                    "Autorité de domaine très faible (DR ~5–12)",
                    "Domaine créé en 2023. Profil de backlinks quasi inexistant. Frein majeur.",
                  ],
                ].map(([title, desc], i) => (
                  <li key={i} className="flex gap-3 text-sm">
                    <span className="shrink-0 w-5 h-5 bg-red-100 text-red-700 rounded-full flex items-center justify-center text-xs font-bold">
                      {i + 1}
                    </span>
                    <div>
                      <p className="font-medium text-gray-900">{title as string}</p>
                      <p className="text-gray-500 text-xs mt-0.5">{desc as string}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </Card>
          </div>

          <InfoBox color="amber">
            <strong>📊 Estimation de l&apos;impact :</strong> Les problèmes détectés représentent une perte estimée de{" "}
            <strong>30–45 % du trafic organique potentiel</strong>. Le manque d&apos;autorité de domaine (off-page) est le
            facteur limitant principal. Les corrections techniques Phase 1 (HSTS, CSP, Consent Mode, JSON-LD blog) peuvent
            être réalisées en &lt; 48 h et amélioreront le score global de <strong>+5 à +8 points</strong>.
          </InfoBox>
        </section>

        {/* ════════════════════════════════════════════════════════
            SECTION 2 · SEO TECHNIQUE
        ════════════════════════════════════════════════════════ */}
        <section>
          <SectionTitle id="s2" emoji="⚙️" title="SEO TECHNIQUE" score={80} />

          {/* 2.1 Crawlabilité */}
          <Sub title="2.1 Crawlabilité & Indexation" score={90} />
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <Card>
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">robots.txt</h4>
              <div className="space-y-0.5">
                <Check ok={true}>Tous les bots autorisés sur <code>/</code></Check>
                <Check ok={true}><code>/api/</code> et <code>/admin/</code> correctement bloqués</Check>
                <Check ok={true}>Paramètres UTM bloqués (<code>/*?utm_*</code>)</Check>
                <Check ok={true}>Pages légales noindex <em>et</em> disallow (double protection)</Check>
                <Check ok={true}>Sitemap déclaré dans robots.txt</Check>
                <Check ok={false}>
                  <code>/_next/static/</code> et <code>/_next/data/</code> bloqués — risque de styles CSS
                  inaccessibles à Googlebot
                </Check>
              </div>
            </Card>
            <Card>
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Sitemap XML</h4>
              <div className="space-y-0.5">
                <Check ok={true}>Généré dynamiquement via Next.js App Router</Check>
                <Check ok={true}>Revalidation ISR toutes les heures</Check>
                <Check ok={true}>200+ URLs couvertes (statiques + dynamiques + blog)</Check>
                <Check ok={true}>Priorités différenciées de 0,65 à 1,0</Check>
                <Check ok={true}>changeFrequency adapté (daily / weekly / monthly)</Check>
                <Check ok={true}>Articles filtrés par date — seuls les publiés sont inclus</Check>
                <Check ok={false}>
                  Pages légales noindex non exclues manuellement (Next.js les inclut par défaut si non filtrées)
                </Check>
              </div>
            </Card>
          </div>
          <IssueCard
            title="/_next/static/ bloqué dans robots.txt — risque sur le rendu Googlebot"
            impact="Faible"
            priority="P3"
            solution={
              <p>
                Vérifier dans Google Search Console (Rapport de couverture) que Google ne signale pas de ressources
                bloquées critiques. Si c&apos;est le cas, supprimer ces règles disallow du robots.ts — Googlebot n&apos;indexe
                pas ces assets mais en a besoin pour rendre les pages correctement.
              </p>
            }
          >
            <p>
              Googlebot utilise les CSS/JS pour rendre les pages et évaluer leur contenu. Bloquer les assets Next.js
              peut provoquer un avertissement GSC &quot;Ressource bloquée&quot; et dégrader le score de rendu.
            </p>
          </IssueCard>

          {/* 2.2 Architecture */}
          <Sub title="2.2 Architecture & Structure du Site" score={83} />
          <Table
            headers={["Pattern d&apos;URL", "Exemple", "Profondeur", "Statut"]}
            rows={[
              ["/", "Homepage", "1", "✅ Optimal"],
              ["/conciergerie/", "Page service principale", "2", "✅ Optimal"],
              ["/conciergerie/[ville]", "/conciergerie/saint-remy-de-provence", "3", "✅ Bon"],
              ["/locations/[slug]", "/locations/saint-remy-de-provence", "3", "✅ Bon"],
              ["/locations/[commune]/[type]", "/locations/saint-remy-de-provence/mas", "4", "⚠️ Limite 3 clics"],
              ["/destinations/[slug]", "/destinations/eygalieres", "3", "✅ Bon"],
              ["/blog/[slug]", "/blog/comment-louer-mas-provence", "3", "✅ Bon"],
            ]}
          />
          <IssueCard
            title="Pages /locations/[commune]/[type] à 4 niveaux de profondeur"
            impact="Moyen"
            priority="P2"
            solution={
              <p>
                Ces pages sont dans le sitemap avec des priorités dédiées (0,65–0,75). Le risque est limité
                par le maillage interne dense. Surveiller dans GSC leur couverture d&apos;indexation réelle et
                s&apos;assurer que les pages de type agrégateur (<code>/locations/mas</code>) les lient bien.
              </p>
            }
          >
            <p>
              Google peut mettre plus de temps à crawler des pages à 4+ niveaux et leur allouer moins de
              PageRank interne. Idéalement, aucune page de conversion ne dépasse 3 clics depuis la homepage.
            </p>
          </IssueCard>

          {/* 2.3 Sécurité */}
          <Sub title="2.3 Sécurité & HTTPS" score={78} />
          <Card className="mb-3">
            <div className="space-y-0.5">
              <Check ok={true}>HTTPS actif (Vercel SSL automatique)</Check>
              <Check ok={true}>Redirect 301 www → non-www dans next.config.ts</Check>
              <Check ok={true}>X-Frame-Options: SAMEORIGIN</Check>
              <Check ok={true}>X-Content-Type-Options: nosniff</Check>
              <Check ok={true}>Referrer-Policy: strict-origin-when-cross-origin</Check>
              <Check ok={true}>Permissions-Policy (caméra, micro, géolocalisation désactivés)</Check>
              <Check ok={false}>Strict-Transport-Security (HSTS) <strong>absent</strong></Check>
              <Check ok={false}>
                CSP utilise <code>unsafe-inline</code> + <code>unsafe-eval</code> (requis pour GTM, mais à migrer)
              </Check>
              <Check ok={false}>
                CSP <code>frame-src &apos;none&apos;</code> <strong>bloque activement</strong> le fallback noscript GTM
              </Check>
              <Check ok={false}>
                <code>upgrade-insecure-requests</code> absent de la CSP
              </Check>
            </div>
          </Card>

          <IssueCard
            title="HSTS (Strict-Transport-Security) absent"
            impact="Élevé"
            priority="P0"
            solution={
              <>
                <p>
                  Dans <code>next.config.ts</code>, ajouter dans le tableau <code>securityHeaders</code> :
                </p>
                <Code>{`{ key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" }`}</Code>
                <p className="text-xs text-gray-500">
                  Après déploiement, soumettre le domaine sur hstspreload.org pour intégration dans la liste Chrome preload.
                </p>
              </>
            }
          >
            <p>
              Sans HSTS, les navigateurs ne forcent pas HTTPS pour les visites suivantes. Cela expose aux attaques
              de type SSL stripping. Google accorde un bonus de confiance aux domaines avec HSTS configuré.
            </p>
          </IssueCard>

          <IssueCard
            title="CSP frame-src 'none' bloque le fallback noscript GTM — bug de tracking actif"
            impact="Critique"
            priority="P0"
            solution={
              <>
                <p>
                  Dans <code>next.config.ts</code>, remplacer la directive <code>frame-src</code> dans la valeur CSP :
                </p>
                <Code>{`// ❌ Avant (bloquant) :
"frame-src 'none';"

// ✅ Après :
"frame-src https://www.googletagmanager.com;"`}</Code>
              </>
            }
          >
            <p>
              Le <code>layout.tsx</code> inclut un <code>&lt;noscript&gt;&lt;iframe src=&quot;gtm...&quot;&gt;</code> comme
              fallback GTM, mais la CSP déclare <code>frame-src &apos;none&apos;</code>. Ce tag ne se charge jamais
              pour les visiteurs sans JavaScript. Des erreurs CSP sont probablement visibles en console.
            </p>
          </IssueCard>

          {/* 2.4 Performance */}
          <Sub title="2.4 Performance & Core Web Vitals" score={72} />
          <InfoBox color="amber">
            <strong>⚠️ Accès externe requis :</strong> Les métriques CWV réelles nécessitent PageSpeed Insights API et
            le rapport CrUX de Google Search Console. Les estimations ci-dessous sont basées sur l&apos;analyse du code source.
          </InfoBox>
          <Table
            headers={["Métrique", "Cible", "Estimé", "Facteurs positifs", "Risques identifiés"]}
            rows={[
              ["LCP", "< 2,5 s", "~2,0–3,0 s", "ISR + Edge CDN Vercel", "Image hero sans priority=true"],
              ["INP", "< 200 ms", "< 150 ms", "React 19, JS minimal côté client", "GTM peut ajouter du délai"],
              ["CLS", "< 0,1", "< 0,05", "Fonts display:swap, images dimensionnées", "Font swap peut causer un shift"],
              ["TTFB", "< 800 ms", "~200–400 ms", "Vercel Edge Network mondial", "Régions éloignées ~500 ms"],
              ["FCP", "< 1,8 s", "~1,2–2,0 s", "SSR + fonts préchargées", "Google Fonts chargement externe"],
            ]}
          />
          <Card className="mb-3">
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
              Optimisation images — code analysé
            </h4>
            <div className="space-y-0.5">
              <Check ok={true}>Formats AVIF + WebP activés dans next.config.ts</Check>
              <Check ok={true}>Device sizes complets : 640, 750, 828, 1080, 1200, 1920 px</Check>
              <Check ok={true}>minimumCacheTTL : 2 592 000 s (30 jours)</Check>
              <Check ok={true}>
                Cache-Control <code>/_next/image</code> : max-age=86400, stale-while-revalidate=604800
              </Check>
              <Check ok={true}>Assets statiques : max-age=31536000, immutable (1 an)</Check>
              <Check ok={false}>Aucun <code>priority=true</code> détecté sur l&apos;image hero (LCP dégradé)</Check>
              <Check ok={false}>Pas de CDN tiers configuré (dépend du plan Vercel)</Check>
            </div>
          </Card>
          <IssueCard
            title="Image hero sans priority={true} — dégradation LCP estimée 300–800 ms"
            impact="Moyen"
            priority="P1"
            solution={
              <>
                <p>
                  Sur le composant <code>Image</code> Next.js qui est l&apos;élément LCP (généralement le hero) :
                </p>
                <Code>{`<Image
  src="/hero-mas-provence.jpg"
  alt="Conciergerie Provence — Entre Rhône et Alpilles"
  priority={true}   // génère <link rel="preload"> automatiquement
  width={1920}
  height={1080}
/>`}</Code>
              </>
            }
          >
            <p>
              Sans <code>priority=true</code>, Next.js charge l&apos;image en lazy loading par défaut. L&apos;image hero est
              très probablement l&apos;élément LCP de la homepage — la décharger en lazy retarde significativement
              le LCP, ce qui pénalise le classement Google (CWV sont un facteur de ranking).
            </p>
          </IssueCard>

          {/* 2.5 Mobile */}
          <Sub title="2.5 Mobile SEO" score={95} />
          <Card className="mb-3">
            <div className="space-y-0.5">
              <Check ok={true}>Balise viewport présente (générée automatiquement par Next.js)</Check>
              <Check ok={true}>Design Tailwind CSS responsive (breakpoints sm/md/lg/xl)</Check>
              <Check ok={true}>Fonts avec display:swap — évite le FOIT (Flash of Invisible Text)</Check>
              <Check ok={true}>Mobile-first indexing compatible — SSR, contenu identique desktop/mobile</Check>
              <Check ok={true}>AMP non utilisé (dépriorisé par Google en 2024, bon choix)</Check>
            </div>
          </Card>

          {/* 2.6 Internationalisation */}
          <Sub title="2.6 Internationalisation" />
          <Card className="mb-3 bg-gray-50">
            <p className="text-sm text-gray-600">
              <strong>N/A</strong> — Site monolingue français. Aucun hreflang requis. L&apos;attribut{" "}
              <code>lang=&quot;fr&quot;</code> et <code>dir=&quot;ltr&quot;</code> sont correctement définis sur la balise{" "}
              <code>&lt;html&gt;</code>. Aucune action requise.
            </p>
          </Card>

          {/* 2.7 JavaScript SEO */}
          <Sub title="2.7 JavaScript SEO" score={95} />
          <Card>
            <div className="space-y-0.5">
              <Check ok={true}>Next.js App Router — Server Components par défaut (SSR natif)</Check>
              <Check ok={true}>ISR activé sur les pages dynamiques (revalidate = 3600 s)</Check>
              <Check ok={true}>GTM chargé avec strategy=&quot;afterInteractive&quot; — ne bloque pas le parsing HTML</Check>
              <Check ok={true}>Contenu critique rendu côté serveur — Googlebot voit le même HTML que l&apos;utilisateur</Check>
              <Check ok={true}>Pas de SPA pure — App Router = SSR natif, pas de rendu différé problématique</Check>
              <Check ok={true}>lucide-react optimisé avec optimizePackageImports (tree-shaking automatique)</Check>
            </div>
          </Card>
        </section>


        {/* ════════════════════════════════════════════════════════
            SECTION 3 · SEO ON-PAGE & CONTENU
        ════════════════════════════════════════════════════════ */}
        <section>
          <SectionTitle id="s3" emoji="📄" title="SEO ON-PAGE & CONTENU" score={76} />

          {/* 3.1 Méta-données */}
          <Sub title="3.1 Méta-données" score={87} />
          <Table
            headers={["Page", "Title (car.)", "Description (car.)", "OG", "Canonical", "Statut"]}
            rows={[
              ["/", "56 ✅", "115 ⚠️ court", "✅ Complet", "✅", "Bon"],
              ["/conciergerie", "~50 ✅", "~140 ✅", "✅ Complet", "✅", "Bon"],
              ["/locations", "~45 ✅", "~130 ✅", "✅ Complet", "✅", "Bon"],
              ["/conciergerie/[ville]", "Variable", "Variable", "✅ Hérité layout", "✅", "À vérifier en crawl"],
              ["/blog/[slug]", "Variable", "Variable", "✅ Hérité layout", "✅", "Article JSON-LD manquant"],
              ["/destinations/[slug]", "Variable", "Variable", "⚠️ Hérité layout", "✅", "Schéma TouristDestination absent"],
            ]}
          />
          <IssueCard
            title="Meta description homepage trop courte (~115 caractères)"
            impact="Faible"
            priority="P3"
            solution={
              <p>
                Allonger jusqu&apos;à 145–155 caractères avec un appel à l&apos;action et un mot-clé secondaire. Exemple :{" "}
                <em>
                  &quot;Conciergerie de locations saisonnières haut de gamme en Provence. Mas, villas, bastides entre Arles
                  et Eygalières. Estimation gratuite en 2 min — 30+ propriétés gérées depuis 2023.&quot;
                </em>
              </p>
            }
          >
            <p>
              La description idéale est entre 120 et 160 caractères pour éviter la troncature Google. Une
              description courte sous-exploite l&apos;espace disponible en SERP et réduit le CTR organique.
            </p>
          </IssueCard>

          {/* 3.2 Headings */}
          <Sub title="3.2 Structure des Headings" score={84} />
          <Card className="mb-3">
            <div className="space-y-0.5">
              <Check ok={true}>H1 unique sur chaque page (pattern vérifié dans le code)</Check>
              <Check ok={true}>Hiérarchie H1 → H2 → H3 respectée structurellement</Check>
              <Check ok={true}>Mots-clés locaux intégrés dans les H1 des pages communes</Check>
              <Check ok={false}>
                Headings dynamiques sur les pages [slug] — audit live nécessaire via l&apos;API SEO interne
              </Check>
            </div>
          </Card>

          {/* 3.3 E-E-A-T */}
          <Sub title="3.3 Qualité du Contenu & E-E-A-T" score={63} />
          <Card className="mb-3">
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-3">
                <div className="flex gap-2">
                  <span className="text-yellow-500 shrink-0">⚠️</span>
                  <div>
                    <strong>Experience :</strong> Témoignages présents (40 avis) mais absence de preuves terrain
                    concrètes (galeries propriétés gérées, vidéos check-in, statistiques publiées).
                  </div>
                </div>
                <div className="flex gap-2">
                  <span className="text-red-500 shrink-0">❌</span>
                  <div>
                    <strong>Expertise :</strong> Aucune biographie d&apos;auteur sur les articles de blog.
                    Pas de credentials (certifications, partenariat Airbnb/Booking) mis en avant.
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex gap-2">
                  <span className="text-emerald-500 shrink-0">✅</span>
                  <div>
                    <strong>Authoritativeness :</strong> Mentions légales, SIRET visible, page à-propos
                    et contact présentes. Fondée en 2023 (mentionné dans llms.txt).
                  </div>
                </div>
                <div className="flex gap-2">
                  <span className="text-emerald-500 shrink-0">✅</span>
                  <div>
                    <strong>Trustworthiness :</strong> HTTPS, CGV, Politique de confidentialité, Mentions
                    légales — toutes présentes et en noindex.
                  </div>
                </div>
              </div>
            </div>
          </Card>
          <IssueCard
            title="Aucune biographie d'auteur sur les articles de blog"
            impact="Moyen"
            priority="P2"
            solution={
              <>
                <p>
                  Créer un composant <code>AuthorBio</code> et l&apos;ajouter à chaque article. Implémenter
                  Person schema dans le JSON-LD Article :
                </p>
                <Code>{`"author": {
  "@type": "Organization",
  "name": "Entre Rhône et Alpilles",
  "url": "https://entre-rhone-alpilles.fr/a-propos"
}`}</Code>
              </>
            }
          >
            <p>
              Depuis la mise à jour E-E-A-T (2022+), les auteurs identifiables avec expertise reconnue sont un
              signal de confiance fort. Dans les niches locales/professionnelles, c&apos;est particulièrement important.
            </p>
          </IssueCard>

          {/* 3.4 Mots-clés */}
          <Sub title="3.4 Optimisation des Mots-clés" score={74} />
          <Card className="mb-3">
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
              Mots-clés déclarés (layout.tsx — meta keywords)
            </h4>
            <div className="flex flex-wrap gap-2 mb-3">
              {[
                "conciergerie airbnb provence",
                "gestion locative courte durée",
                "location saisonnière alpilles",
                "conciergerie saint-rémy-de-provence",
                "gestion airbnb arles",
              ].map((kw) => (
                <span
                  key={kw}
                  className="bg-blue-50 text-blue-800 border border-blue-200 px-2 py-0.5 rounded text-xs font-mono"
                >
                  {kw}
                </span>
              ))}
            </div>
            <p className="text-xs text-gray-400">
              Note : la balise &lt;meta keywords&gt; est ignorée par Google depuis 2009. Ces termes valent comme référentiel
              interne mais n&apos;ont aucun impact SEO direct.
            </p>
          </Card>
          <IssueCard
            title="Risque de cannibalisation entre pages communes de même zone"
            impact="Moyen"
            priority="P2"
            solution={
              <p>
                Vérifier que chaque page commune cible un intent distinct :{" "}
                <code>/conciergerie/saint-remy</code> (propriétaire cherche un gestionnaire) vs{" "}
                <code>/locations/saint-remy</code> (voyageur cherche une location). Si le contenu est
                trop similaire, renforcer la différenciation. Utiliser l&apos;outil de cannibalisation de
                l&apos;admin SEO interne en mode &quot;full&quot;.
              </p>
            }
          >
            <p>
              Avec 20 communes × 3 types de pages, le risque de cannibalisation interne est élevé si le
              contenu n&apos;est pas suffisamment différencié par intent de recherche. Google pourrait hésiter
              entre deux pages pour une même requête locale.
            </p>
          </IssueCard>

          {/* 3.5 Images */}
          <Sub title="3.5 Images & Médias" score={80} />
          <Card className="mb-3">
            <div className="space-y-0.5">
              <Check ok={true}>Composant Next.js Image utilisé (génère srcset automatiquement)</Check>
              <Check ok={true}>Formats modernes AVIF/WebP configurés</Check>
              <Check ok={true}>Lazy loading par défaut sur toutes les images non-LCP</Check>
              <Check ok={false}>
                Audit attributs alt non possible statiquement — utiliser l&apos;API SEO (mode full) pour détecter
                les images sans alt
              </Check>
              <Check ok={false}>
                Nommage des fichiers images non auditable statiquement (idéalement kebab-case avec mots-clés)
              </Check>
            </div>
          </Card>

          {/* 3.6 Liens internes */}
          <Sub title="3.6 Liens Internes" score={70} />
          <IssueCard
            title="Pages de propriété individuelle potentiellement orphelines"
            impact="Moyen"
            priority="P2"
            solution={
              <p>
                Chaque page <code>/locations/[slug]</code> doit contenir : (1) un lien vers la page commune,
                (2) un lien vers <code>/conciergerie/[commune]</code>, (3) 2–4 propriétés similaires en
                &quot;Voir aussi&quot;. Lancer l&apos;audit SEO en mode full pour détecter les orphelines actuelles.
              </p>
            }
          >
            <p>
              Les pages de propriété individuelle risquent de n&apos;être liées que depuis les pages communes.
              Si elles sont peu référencées dans le maillage interne, Google leur alloue moins de PageRank
              et peut les crawler moins fréquemment.
            </p>
          </IssueCard>

          {/* 3.7 Données structurées */}
          <Sub title="3.7 Données Structurées (Schema.org)" score={76} />
          <Table
            headers={["Page / Template", "Schemas implémentés", "Schemas manquants", "Statut"]}
            rows={[
              [
                "/",
                "LocalBusiness, Organization, WebSite, BreadcrumbList, FAQPage",
                "—",
                "✅ Excellent",
              ],
              ["/conciergerie", "ProfessionalService, HasOfferCatalog", "BreadcrumbList", "✅ Bon"],
              ["/locations", "ItemList, LodgingBusiness", "BreadcrumbList", "✅ Bon"],
              ["/blog/[slug]", "—", "Article, BreadcrumbList, Person", "❌ Manquant"],
              ["/destinations/[slug]", "—", "TouristDestination, BreadcrumbList", "❌ Manquant"],
              ["/conciergerie/[ville]", "—", "LocalBusiness, Service, BreadcrumbList", "❌ Manquant"],
              ["/avis", "—", "AggregateRating, Review", "❌ Manquant"],
              ["/faq", "À vérifier", "FAQPage dédié", "⚠️ À auditer"],
            ]}
          />

          <IssueCard
            title="Article JSON-LD absent sur toutes les pages blog"
            impact="Élevé"
            priority="P1"
            solution={
              <>
                <p>
                  Dans <code>/src/app/blog/[slug]/page.tsx</code>, ajouter avant le JSX :
                </p>
                <Code>{`const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": post.title,
  "description": post.excerpt,
  "image": post.image,
  "datePublished": post.date,
  "dateModified": post.date,
  "author": {
    "@type": "Organization",
    "name": "Entre Rhône et Alpilles",
    "url": "https://entre-rhone-alpilles.fr"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Entre Rhône et Alpilles",
    "logo": { "@type": "ImageObject", "url": "https://entre-rhone-alpilles.fr/favicon.svg" }
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": \`https://entre-rhone-alpilles.fr/blog/\${post.slug}\`
  }
};

// Dans le JSX :
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
/>`}</Code>
              </>
            }
          >
            <p>
              Sans Article schema, les articles de blog ne peuvent pas obtenir de rich snippets dans les SERP
              (date de publication, auteur, image). C&apos;est une opportunité de CTR significative manquée pour
              chaque article publié.
            </p>
          </IssueCard>

          <IssueCard
            title="AggregateRating absent sur /avis — rich snippet étoiles manquant"
            impact="Élevé"
            priority="P1"
            solution={
              <>
                <p>
                  Dans <code>/src/app/avis/page.tsx</code> (ou dans le layout de la page) :
                </p>
                <Code>{`const ratingSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Entre Rhône et Alpilles",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.7",
    "reviewCount": "40",
    "bestRating": "5",
    "worstRating": "1"
  }
};`}</Code>
              </>
            }
          >
            <p>
              La page /avis contient 40 avis avec une note de 4,7/5 mais aucun AggregateRating schema.
              Les étoiles en SERP (rich snippets) augmentent le CTR de <strong>10–30 %</strong> selon les études sectorielles.
            </p>
          </IssueCard>

          <IssueCard
            title="BreadcrumbList absent sur la majorité des sous-pages"
            impact="Moyen"
            priority="P2"
            solution={
              <>
                <p>Créer un composant utilitaire réutilisable :</p>
                <Code>{`// src/components/BreadcrumbJsonLd.tsx
export function BreadcrumbJsonLd({ items }: {
  items: { name: string; url: string }[]
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Usage exemple dans /conciergerie/[ville]/page.tsx :
<BreadcrumbJsonLd items={[
  { name: "Accueil", url: "https://entre-rhone-alpilles.fr" },
  { name: "Conciergerie", url: "https://entre-rhone-alpilles.fr/conciergerie" },
  { name: commune.name, url: \`https://entre-rhone-alpilles.fr/conciergerie/\${commune.slug}\` }
]} />`}</Code>
              </>
            }
          >
            <p>
              Les breadcrumbs schema permettent à Google d&apos;afficher le chemin de navigation dans les SERP
              (ex : &quot;ERA &gt; Conciergerie &gt; Saint-Rémy&quot;). Actuellement présents uniquement sur la homepage.
            </p>
          </IssueCard>
        </section>

        {/* ════════════════════════════════════════════════════════
            SECTION 4 · SEO OFF-PAGE
        ════════════════════════════════════════════════════════ */}
        <section>
          <SectionTitle id="s4" emoji="🔗" title="SEO OFF-PAGE & AUTORITÉ" score={38} />
          <InfoBox color="amber">
            <strong>⚠️ Données nécessitant un accès externe :</strong> L&apos;analyse complète du profil de backlinks
            requiert Ahrefs, Semrush ou Majestic. Les estimations ci-dessous sont basées sur l&apos;âge du domaine
            (créé ~2023) et les benchmarks sectoriels pour une conciergerie locale en France.
          </InfoBox>

          <div className="grid grid-cols-3 gap-4 mb-6">
            {[
              { label: "Domain Rating estimé", value: "5–12", note: "Domaine ~2023", color: "text-red-600" },
              { label: "Domaines référents estimés", value: "10–40", note: "Citations locales", color: "text-orange-600" },
              { label: "Backlinks totaux estimés", value: "< 200", note: "Profil naissant", color: "text-orange-600" },
            ].map(({ label, value, note, color }) => (
              <Card key={label} className="text-center">
                <p className={`text-3xl font-bold font-mono ${color}`}>{value}</p>
                <p className="text-xs font-semibold text-gray-800 mt-1">{label}</p>
                <p className="text-xs text-gray-400">{note}</p>
              </Card>
            ))}
          </div>

          <IssueCard
            title="Autorité de domaine très faible — facteur limitant principal sur les termes génériques"
            impact="Critique"
            priority="P1"
            solution={
              <div className="space-y-1">
                <p className="font-semibold">Actions link building prioritaires :</p>
                <ol className="list-decimal list-inside text-sm space-y-1">
                  <li>Inscriptions sur les annuaires de confiance (Abritel, Gîtes de France, Leboncoin Pro)</li>
                  <li>Partenariats avec les Offices de Tourisme des Alpilles et d&apos;Arles (liens institutionnels DR 40–60)</li>
                  <li>Articles invités sur des blogs voyage Provence (guest posting ciblé)</li>
                  <li>Communiqués de presse locaux (La Provence, Midi Libre — DR 60+)</li>
                  <li>Création de contenu linkable (guide interactif des Alpilles, carte des communes)</li>
                </ol>
              </div>
            }
          >
            <p>
              Avec un DR estimé de 5–12, le domaine ne peut pas compétitionner sur des termes génériques à fort
              volume (&quot;conciergerie provence&quot;, &quot;location mas provence&quot;) contre des domaines à DR 40–60.
              La stratégie doit se concentrer sur des termes longue traîne locaux à faible concurrence.
            </p>
          </IssueCard>

          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">4.3 Sources de liens recommandées</h3>
            <Table
              headers={["Source", "DR estimé", "Facilité", "Impact", "Action"]}
              rows={[
                ["Office de Tourisme Alpilles", "40–60", "Moyen", "Élevé", "Contact direct"],
                ["Abritel / VRBO listing", "80+", "Facile", "Élevé", "Créer un listing"],
                ["Gîtes de France", "60+", "Moyen", "Élevé", "Adhésion"],
                ["Blogs voyage Provence", "20–40", "Moyen", "Moyen", "Guest post"],
                ["Annuaires locaux", "10–30", "Facile", "Moyen", "Soumission gratuite"],
                ["La Provence / Midi Libre", "60+", "Difficile", "Très élevé", "Communiqué presse"],
                ["Partenaires locaux (hôtels, restos)", "10–30", "Facile", "Faible", "Échange de liens"],
              ]}
            />
          </Card>
        </section>

        {/* ════════════════════════════════════════════════════════
            SECTION 5 · SEO LOCAL
        ════════════════════════════════════════════════════════ */}
        <section>
          <SectionTitle id="s5" emoji="🏪" title="SEO LOCAL" score={76} />

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <Card>
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Audit Local SEO</h4>
              <div className="space-y-0.5">
                <Check ok={true}>20 communes ciblées avec pages <code>/conciergerie/[ville]</code></Check>
                <Check ok={true}>LocalBusiness schema avec coordonnées GPS sur la homepage</Check>
                <Check ok={true}>Mots-clés locaux dans les titres H1 des pages communes</Check>
                <Check ok={true}>Pages destinations pour l&apos;intent informationnel local</Check>
                <Check ok={false}>Google Business Profile — statut non vérifiable depuis le code</Check>
                <Check ok={false}>AggregateRating absent (impact sur Local Pack Google Maps)</Check>
                <Check ok={false}>Cohérence NAP (Nom/Adresse/Tél) sur annuaires externes — non auditable</Check>
              </div>
            </Card>
            <Card>
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Communes couvertes</h4>
              <div className="flex flex-wrap gap-1">
                {[
                  { name: "Saint-Rémy-de-Provence", c: 1 },
                  { name: "Arles", c: 1 },
                  { name: "Les Baux-de-Provence", c: 1 },
                  { name: "Eygalières", c: 1 },
                  { name: "Maussane-les-Alpilles", c: 1 },
                  { name: "Fontvieille", c: 1 },
                  { name: "Paradou", c: 1 },
                  { name: "Mouriès", c: 2 },
                  { name: "Tarascon", c: 2 },
                  { name: "Châteaurenard", c: 2 },
                  { name: "Saint-Martin-de-Crau", c: 3 },
                  { name: "Raphèle-lès-Arles", c: 3 },
                ].map(({ name, c }) => (
                  <span
                    key={name}
                    className={`text-xs px-2 py-0.5 rounded-full border ${
                      c === 1
                        ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                        : c === 2
                        ? "bg-yellow-50 text-yellow-800 border-yellow-200"
                        : "bg-gray-50 text-gray-600 border-gray-200"
                    }`}
                  >
                    {name}
                  </span>
                ))}
              </div>
              <div className="flex gap-3 mt-2 text-xs text-gray-400">
                <span>🟢 Cercle 1 (max)</span>
                <span>🟡 Cercle 2</span>
                <span>⚪ Cercle 3</span>
              </div>
            </Card>
          </div>

          <IssueCard
            title="Google Business Profile — statut inconnu, action urgente"
            impact="Élevé"
            priority="P0"
            solution={
              <ol className="list-decimal list-inside space-y-1 text-sm">
                <li>Vérifier/créer la fiche GBP sur google.com/business</li>
                <li>Catégorie principale : &quot;Service de conciergerie&quot; — secondaires : &quot;Location de vacances&quot;</li>
                <li>Compléter à 100 % : description, horaires, lien site web, zone de service (20 communes)</li>
                <li>Ajouter 10+ photos qualité (propriétés, équipe, check-in)</li>
                <li>Activer la messagerie GBP pour les demandes directes</li>
              </ol>
            }
          >
            <p>
              La fiche GBP est indispensable pour apparaître dans le <strong>Local Pack</strong> (les 3 résultats
              avec carte en tête des SERP locales). Pour &quot;conciergerie airbnb saint-rémy-de-provence&quot;, le
              Local Pack est la position la plus visible, au-dessus des résultats organiques classiques.
            </p>
          </IssueCard>
        </section>

        {/* ════════════════════════════════════════════════════════
            SECTION 6 · MOTS-CLÉS & POSITIONNEMENT
        ════════════════════════════════════════════════════════ */}
        <section>
          <SectionTitle id="s6" emoji="🎯" title="ANALYSE DES MOTS-CLÉS & POSITIONNEMENT" score={60} />
          <InfoBox color="amber">
            <strong>⚠️ Accès GSC + Ahrefs requis pour les données réelles :</strong> Positions, volumes, CTR et
            impressions réels ne sont accessibles que via Google Search Console et les outils tiers. Les estimations
            ci-dessous sont basées sur les mots-clés identifiés dans le code et les benchmarks sectoriels en France.
          </InfoBox>

          <Card className="mb-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Mots-clés stratégiques — analyse du potentiel</h3>
            <Table
              headers={["Mot-clé", "Vol. /mois (FR)", "Difficulté KD", "Intent", "Page cible", "Potentiel"]}
              rows={[
                ["conciergerie airbnb provence", "590", "Élevée", "Commercial", "/conciergerie", "Priorité 1"],
                ["gestion locative courte durée provence", "210", "Moyenne", "Commercial", "/conciergerie/gestion-...", "Priorité 1"],
                ["location saisonnière alpilles", "880", "Élevée", "Transactionnel", "/locations", "Priorité 1"],
                ["conciergerie saint-rémy-de-provence", "140", "Faible", "Local", "/conciergerie/saint-remy-...", "Quick Win ✅"],
                ["location mas provence piscine", "590", "Moyenne", "Transactionnel", "/locations/avec-piscine", "Priorité 2"],
                ["estimer revenus airbnb provence", "170", "Faible", "Outil", "/conciergerie/estimer-mes-revenus", "Quick Win ✅"],
                ["gestion airbnb arles", "90", "Faible", "Local", "/conciergerie/arles", "Quick Win ✅"],
                ["location villa piscine alpilles", "480", "Moyenne", "Transactionnel", "/locations/villa", "Priorité 2"],
                ["locations eygalières", "320", "Faible", "Transactionnel", "/locations/eygalieres", "Quick Win ✅"],
                ["que faire dans les alpilles", "1 300", "Moyenne", "Informationnel", "/blog/ + /destinations/", "Long terme"],
              ]}
            />
          </Card>

          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Opportunités de Featured Snippets</h3>
            <div className="space-y-2">
              {[
                {
                  q: "Comment calculer les revenus Airbnb en Provence ?",
                  type: "Réponse directe + chiffres",
                  page: "/conciergerie/estimer-mes-revenus",
                },
                {
                  q: "Quelle commission prend une conciergerie Airbnb ?",
                  type: "Tableau comparatif",
                  page: "/conciergerie/tarifs",
                },
                {
                  q: "Quels sont les villages des Alpilles à visiter ?",
                  type: "Liste numérotée",
                  page: "/destinations/ + blog",
                },
                {
                  q: "Mas, bastide, gîte : quelles différences ?",
                  type: "Définitions structurées",
                  page: "/blog/ (article à créer)",
                },
              ].map(({ q, type, page }) => (
                <div key={q} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg text-sm">
                  <span className="text-yellow-500 shrink-0">⭐</span>
                  <div>
                    <p className="font-medium text-gray-900">{q}</p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Type : <strong>{type}</strong> — Page :{" "}
                      <code className="bg-gray-200 px-1 rounded">{page}</code>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </section>

        {/* ════════════════════════════════════════════════════════
            SECTION 7 · ANALYSE CONCURRENTIELLE
        ════════════════════════════════════════════════════════ */}
        <section>
          <SectionTitle id="s7" emoji="👥" title="ANALYSE CONCURRENTIELLE" />
          <InfoBox color="amber">
            <strong>⚠️ Données Ahrefs/Semrush requises</strong> pour les métriques précises. L&apos;analyse ci-dessous
            identifie les 3 typologies de concurrents organiques probables sur le marché de la conciergerie et
            location saisonnière en Provence.
          </InfoBox>

          <div className="space-y-4">
            {[
              {
                name: "Grandes plateformes (Airbnb, Abritel, Booking)",
                segment: "Agrégateurs de locations — DR 80+",
                strengths: [
                  "Autorité de domaine écrasante (DR 80–95)",
                  "Millions de backlinks naturels",
                  "Brand searches massifs",
                ],
                weaknesses: [
                  "Pas de pages locales Alpilles spécifiques",
                  "Contenu générique non-personnalisé",
                  "Pas de service de conciergerie locale à valeur ajoutée",
                ],
                opportunity: "Cibler les requêtes avec intent de service (\"qui gère ma propriété à Arles\") plutôt que les requêtes de réservation pures.",
              },
              {
                name: "Agences de conciergerie locales concurrentes",
                segment: "Conciergerie locale Provence — DR 15–35",
                strengths: [
                  "Ancienneté de domaine (3–10 ans)",
                  "Citations locales et avis Google établis",
                  "Réputation terrain construite",
                ],
                weaknesses: [
                  "Sites souvent vieillissants (WordPress non optimisé)",
                  "Peu de contenu SEO structuré et de landing pages locales",
                  "Pas de schémas structurés ni d'architecture SEO moderne",
                ],
                opportunity: "L'architecture Next.js SSR + 60 landing pages locales + structured data donne un avantage technique significatif sur ces concurrents.",
              },
              {
                name: "Portails éditoriaux (Petit Futé, Tourisme Provence, blogs voyage)",
                segment: "Intent informationnel — DR 40–70",
                strengths: [
                  "Forte autorité éditoriale",
                  "Excellent positionnement sur la longue traîne informationnel",
                  "Backlinks naturels depuis des sites d'autorité",
                ],
                weaknesses: [
                  "Pas de service direct — aucune conversion transactionnelle",
                  "Contenu statique mis à jour rarement",
                  "Pas de pages transactionnelles locales",
                ],
                opportunity: "Créer du contenu informatif dense (/destinations/) pour capturer ces requêtes et convertir via le funnel propriétaire.",
              },
            ].map(({ name, segment, strengths, weaknesses, opportunity }) => (
              <Card key={name}>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-900">{name}</h3>
                    <p className="text-xs text-gray-500">{segment}</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4 text-sm mb-3">
                  <div>
                    <p className="text-xs font-semibold text-emerald-700 mb-1">Points forts</p>
                    <ul className="space-y-0.5">
                      {strengths.map((s) => (
                        <li key={s} className="flex gap-1.5 text-gray-700">
                          <span className="text-emerald-500 shrink-0">+</span>{s}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-orange-700 mb-1">Faiblesses exploitables</p>
                    <ul className="space-y-0.5">
                      {weaknesses.map((w) => (
                        <li key={w} className="flex gap-1.5 text-gray-700">
                          <span className="text-orange-500 shrink-0">−</span>{w}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="bg-blue-50 rounded-lg p-3 text-xs text-blue-800">
                  <strong>💡 Opportunité :</strong> {opportunity}
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            SECTION 8 · ANALYTICS & TRACKING
        ════════════════════════════════════════════════════════ */}
        <section>
          <SectionTitle id="s8" emoji="📊" title="ANALYTICS & TRACKING" score={70} />

          <Card className="mb-4">
            <div className="space-y-0.5">
              <Check ok={true}>Google Tag Manager installé (ID : GTM-WDCFVC9J)</Check>
              <Check ok={true}>
                Script GTM chargé avec <code>strategy=&quot;afterInteractive&quot;</code> — ne bloque pas le rendu
              </Check>
              <Check ok={true}>
                <code>dataLayer</code> initialisé avant le chargement GTM
              </Check>
              <Check ok={true}>
                Typage TypeScript de <code>window.dataLayer</code> défini (<code>src/types/gtm.d.ts</code>)
              </Check>
              <Check ok={true}>Fallback noscript GTM présent dans le HTML</Check>
              <Check ok={false}>
                <strong>Consent Mode v2 non implémenté</strong> — non-conformité RGPD potentielle
              </Check>
              <Check ok={false}>
                <strong>CSP <code>frame-src &apos;none&apos;</code> bloque le fallback noscript GTM</strong> (bug actif)
              </Check>
              <Check ok={false}>Banière/CMP de consentement cookies non visible dans le code</Check>
              <Check ok={false}>Hotjar ou Microsoft Clarity absent (heatmaps, session recording)</Check>
              <Check ok={false}>Google Search Console — configuration non visible dans le code</Check>
            </div>
          </Card>

          <IssueCard
            title="Consent Mode v2 Google absent — impact tracking + conformité RGPD"
            impact="Critique"
            priority="P0"
            solution={
              <>
                <p>
                  Dans <code>layout.tsx</code>, ajouter <strong>avant</strong> le script GTM :
                </p>
                <Code>{`<Script id="consent-mode-default" strategy="beforeInteractive"
  dangerouslySetInnerHTML={{ __html: \`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('consent', 'default', {
      analytics_storage: 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      wait_for_update: 500
    });
    gtag('set', 'ads_data_redaction', true);
    gtag('set', 'url_passthrough', true);
  \`}}
/>
// Puis intégrer une CMP (Axeptio, Cookiebot, Onetrust)
// pour déclencher gtag('consent', 'update', {...}) après acceptation`}</Code>
              </>
            }
          >
            <p>
              Depuis mars 2024, Google exige Consent Mode v2 pour les sites utilisant Google Ads et GA4 en Europe.
              Sans lui, les conversions sont sous-comptées et la modélisation des données dégradée. Risque légal RGPD
              en l&apos;absence de CMP.
            </p>
          </IssueCard>
        </section>

        {/* ════════════════════════════════════════════════════════
            SECTION 9 · IA & SGE
        ════════════════════════════════════════════════════════ */}
        <section>
          <SectionTitle id="s9" emoji="🤖" title="IA & SEARCH GENERATIVE EXPERIENCE (SGE/AIO)" score={82} />

          <Card className="mb-4">
            <div className="space-y-0.5">
              <Check ok={true}>
                <code>/public/llms.txt</code> présent — excellente pratique 2024 pour les crawlers IA
              </Check>
              <Check ok={true}>
                Header HTTP <code>TDM-Reservation: 1</code> — opt-in pour l&apos;entraînement IA déclaré
              </Check>
              <Check ok={true}>
                <code>/public/.well-known/tdmrep.json</code> — politique TDM conforme
              </Check>
              <Check ok={true}>FAQPage schema → fort signal pour les AI Overviews Google</Check>
              <Check ok={true}>Contenu structuré H2/H3 + listes — favorable au parsing LLM</Check>
              <Check ok={true}>
                <code>lang=&quot;fr&quot;</code> + locale <code>fr_FR</code> — ciblage correct pour les réponses IA françaises
              </Check>
              <Check ok={false}>
                Pas de mentions Wikipedia, Wikidata ou sources d&apos;autorité citées dans le contenu
              </Check>
              <Check ok={false}>Peu de données factuelles vérifiables avec sources (statistiques, études)</Check>
            </div>
          </Card>

          <InfoBox color="blue">
            <h3 className="font-semibold mb-2">Recommandations AEO (Answer Engine Optimization)</h3>
            <div className="space-y-2">
              <p>
                <strong>🎯 Format Q&amp;A :</strong> Structurer les pages conciergerie en questions-réponses directes
                avec réponse en 2–3 phrases concises en tête de section. Ex : &quot;Comment fonctionne la conciergerie ERA ?&quot;
                suivi d&apos;une réponse immédiate puis d&apos;un développement.
              </p>
              <p>
                <strong>📊 Données chiffrées sourcées :</strong> Inclure des statistiques avec sources
                (INSEE, CCI PACA, FNAIM) pour augmenter la crédibilité aux yeux des LLMs qui citent
                préférentiellement les contenus factuels et vérifiables.
              </p>
              <p>
                <strong>🔗 Citations tierces :</strong> Référencer les Offices de Tourisme, les classements
                monuments classés, les données de fréquentation touristique — les IA citent les sources
                d&apos;autorité institutionnelles.
              </p>
            </div>
          </InfoBox>
        </section>

        {/* ════════════════════════════════════════════════════════
            SECTION 10 · ACCESSIBILITÉ & UX
        ════════════════════════════════════════════════════════ */}
        <section>
          <SectionTitle id="s10" emoji="♿" title="ACCESSIBILITÉ & UX (signaux SEO)" score={74} />

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <Card>
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Audit accessibilité</h4>
              <div className="space-y-0.5">
                <Check ok={true}>Skip link &quot;Aller au contenu principal&quot; présent</Check>
                <Check ok={true}><code>lang=&quot;fr&quot;</code> et <code>dir=&quot;ltr&quot;</code> sur <code>&lt;html&gt;</code></Check>
                <Check ok={true}>Structure sémantique : <code>main</code>, <code>header</code>, <code>footer</code>, <code>nav</code></Check>
                <Check ok={true}>Composant Next.js Image (gestion alt programmatique)</Check>
                <Check ok={true}>Fonts avec taille lisible (DM Sans, Cormorant Garamond)</Check>
                <Check ok={false}>Aria-labels sur boutons icônes — audit live requis</Check>
                <Check ok={false}>Contrastes couleurs — non auditable statiquement (Lighthouse requis)</Check>
                <Check ok={false}>Tap targets ≥ 48 px sur mobile — non auditable sans rendu live</Check>
              </div>
            </Card>
            <Card>
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Score WCAG estimé</h4>
              <div className="space-y-3">
                {[
                  ["Niveau A (critique)", 85, "emerald"],
                  ["Niveau AA (standard)", 70, "yellow"],
                  ["Niveau AAA (avancé)", 50, "orange"],
                ].map(([label, score, _color]) => (
                  <div key={label as string}>
                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                      <span>{label as string}</span>
                      <span className="font-semibold">{score as number} % conforme</span>
                    </div>
                    <ScoreBar score={score as number} />
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-3">
                *Estimation basée sur l&apos;analyse du code. Un audit Axe DevTools ou Lighthouse complet est recommandé.
              </p>
            </Card>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            SECTION 11 · PLAN D'ACTION PRIORISÉ
        ════════════════════════════════════════════════════════ */}
        <section>
          <SectionTitle id="s11" emoji="🗺️" title="PLAN D'ACTION PRIORISÉ" />

          {/* Phase 1 */}
          <div className="mb-8">
            <h3 className="text-base font-bold text-red-700 mb-3">
              🚨 Phase 1 — Quick Wins (0–30 jours)
            </h3>
            <Card>
              <Table
                headers={["Priorité", "Catégorie", "Problème", "Impact SEO", "Effort", "Action concrète"]}
                rows={[
                  [<Priority key="p0a" level="P0" />, "Sécurité", "HSTS absent", <Impact key="i1" level="Élevé" />, "30 min", "Ajouter header HSTS dans next.config.ts"],
                  [<Priority key="p0b" level="P0" />, "Tracking", "CSP bloque GTM iframe", <Impact key="i2" level="Critique" />, "15 min", "Modifier frame-src CSP → googletagmanager.com"],
                  [<Priority key="p0c" level="P0" />, "RGPD", "Consent Mode v2 absent", <Impact key="i3" level="Critique" />, "3–4 h", "Implémenter dataLayer consent + CMP (Axeptio)"],
                  [<Priority key="p0d" level="P0" />, "Local SEO", "GBP statut inconnu", <Impact key="i4" level="Élevé" />, "2 h", "Créer/compléter la fiche Google Business Profile"],
                  [<Priority key="p1a" level="P1" />, "Schema", "Article JSON-LD absent (blog)", <Impact key="i5" level="Élevé" />, "3 h", "Ajouter Article schema dans /blog/[slug]/page.tsx"],
                  [<Priority key="p1b" level="P1" />, "Schema", "AggregateRating absent (/avis)", <Impact key="i6" level="Élevé" />, "1 h", "Ajouter AggregateRating (4,7/40 avis) sur /avis"],
                  [<Priority key="p1c" level="P1" />, "Perf.", "Hero image sans priority=true", <Impact key="i7" level="Moyen" />, "30 min", "Ajouter prop priority sur le composant Image LCP"],
                  [<Priority key="p1d" level="P1" />, "Netlinking", "Annuaires non soumis", <Impact key="i8" level="Élevé" />, "4 h", "Soumettre sur Abritel, Gîtes de France, OT Alpilles"],
                ]}
              />
            </Card>
          </div>

          {/* Phase 2 */}
          <div className="mb-8">
            <h3 className="text-base font-bold text-orange-700 mb-3">
              🔧 Phase 2 — Optimisations (30–90 jours)
            </h3>
            <Card>
              <Table
                headers={["Priorité", "Catégorie", "Problème", "Impact SEO", "Effort", "Action concrète"]}
                rows={[
                  [<Priority key="p2a" level="P2" />, "Schema", "BreadcrumbList absent (sous-pages)", <Impact key="j1" level="Moyen" />, "3 h", "Créer composant BreadcrumbJsonLd sur 5 templates"],
                  [<Priority key="p2b" level="P2" />, "Schema", "TouristDestination absent", <Impact key="j2" level="Moyen" />, "2 h", "Ajouter schema sur /destinations/[slug]"],
                  [<Priority key="p2c" level="P2" />, "Schema", "LocalBusiness absent /conciergerie/[ville]", <Impact key="j3" level="Moyen" />, "3 h", "Ajouter LocalBusiness avec AreaServed par commune"],
                  [<Priority key="p2d" level="P2" />, "E-E-A-T", "Biographies auteur absentes", <Impact key="j4" level="Moyen" />, "4 h", "Créer composant AuthorBio + Person schema"],
                  [<Priority key="p2e" level="P2" />, "Maillage", "Pages propriété potentiellement orphelines", <Impact key="j5" level="Moyen" />, "4 h", "Ajouter section Voir aussi avec 3 propriétés liées"],
                  [<Priority key="p2f" level="P2" />, "Mots-clés", "Cannibalisation inter-pages à auditer", <Impact key="j6" level="Moyen" />, "2 h", "Lancer audit SEO full mode, analyser résultats"],
                  [<Priority key="p2g" level="P2" />, "Perf.", "CWV réels non mesurés", <Impact key="j7" level="Moyen" />, "1 h", "Activer GSC Core Web Vitals, identifier pages lentes"],
                  [<Priority key="p2h" level="P2" />, "Content", "Meta desc homepage courte", <Impact key="j8" level="Faible" />, "15 min", "Allonger à 145–155 caractères avec CTA"],
                ]}
              />
            </Card>
          </div>

          {/* Phase 3 */}
          <div>
            <h3 className="text-base font-bold text-sky-700 mb-3">
              🚀 Phase 3 — Croissance (90–180 jours)
            </h3>
            <Card>
              <Table
                headers={["Priorité", "Catégorie", "Action", "Impact SEO", "Effort", "Objectif"]}
                rows={[
                  [<Priority key="p3a" level="P3" />, "Netlinking", "Stratégie link building structurée", <Impact key="k1" level="Critique" />, "En continu", "DR 20+ en 6 mois, +50 domaines référents"],
                  [<Priority key="p3b" level="P3" />, "Contenu", "4 articles de blog/mois (longue traîne)", <Impact key="k2" level="Élevé" />, "8 h/mois", "+200 mots-clés longue traîne positionnés"],
                  [<Priority key="p3c" level="P3" />, "Contenu", "Pages destinations enrichies (1 500+ mots)", <Impact key="k3" level="Élevé" />, "20 h", "Featured snippets sur requêtes 'que faire à...'"],
                  [<Priority key="p3d" level="P3" />, "Local", "Stratégie avis Google (GBP)", <Impact key="k4" level="Élevé" />, "Continu", "50+ avis GBP, note ≥ 4,8"],
                  [<Priority key="p3e" level="P3" />, "Analytics", "GA4 events + conversions configurés", <Impact key="k5" level="Moyen" />, "4 h", "Tracking complet du funnel propriétaire"],
                  [<Priority key="p3f" level="P3" />, "Sécurité", "HSTS preload soumission", <Impact key="k6" level="Moyen" />, "30 min", "Domaine dans Chrome HSTS preload list"],
                  [<Priority key="p3g" level="P3" />, "AEO", "Contenu Q&A structuré (FAQ par page)", <Impact key="k7" level="Moyen" />, "10 h", "AI Overview appearances sur 5+ requêtes cibles"],
                ]}
              />
            </Card>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            SECTION 12 · PROJECTION DE CROISSANCE
        ════════════════════════════════════════════════════════ */}
        <section>
          <SectionTitle id="s12" emoji="📈" title="PROJECTION DE CROISSANCE" />

          <Card className="mb-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">
              Estimation de la croissance du trafic organique
            </h3>
            <Table
              headers={["Horizon", "Sessions organiques / mois", "Actions réalisées", "Progression vs. baseline"]}
              rows={[
                ["Baseline (avril 2026)", "500 – 1 500", "État actuel", "0 %"],
                ["J+30 (après Phase 1)", "600 – 1 800", "Corrections techniques + GBP + schemas blog", "+15 à +25 %"],
                ["J+90 (après Phase 2)", "900 – 2 500", "Schemas complets + contenu + maillage", "+40 à +70 %"],
                ["J+180 (après Phase 3)", "2 000 – 5 000", "Link building + blog régulier + avis GBP", "+150 à +250 %"],
              ]}
            />
            <p className="text-xs text-gray-400 mt-2">
              *Estimations basées sur les benchmarks sectoriels pour un domaine jeune en niche locale française.
              Les gains réels dépendent de la vitesse d&apos;implémentation et de la stratégie de netlinking.
            </p>
          </Card>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">KPIs SMART à 6 mois (oct. 2026)</h3>
              <div className="space-y-2">
                {[
                  ["Trafic organique", "Atteindre 3 000+ sessions/mois"],
                  ["Domain Rating", "DR 20+ (vs ~10 estimé actuel)"],
                  ["Mots-clés Top 10", "30+ mots-clés locaux en Top 10 Google"],
                  ["Avis Google Business", "50+ avis, note ≥ 4,8/5"],
                  ["Core Web Vitals", "LCP < 2,5 s, CLS < 0,1, INP < 200 ms"],
                  ["Score SEO audit", "Passer de 68/100 à 80+/100"],
                ].map(([kpi, obj]) => (
                  <div key={kpi as string} className="flex items-start gap-2 text-sm">
                    <span className="text-sky-500 shrink-0">📊</span>
                    <div>
                      <span className="font-medium text-gray-900">{kpi as string} : </span>
                      <span className="text-gray-600">{obj as string}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
            <Card>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">ROI estimé par phase</h3>
              <div className="space-y-3">
                <div className="p-3 bg-red-50 border border-red-100 rounded-lg">
                  <p className="font-semibold text-red-800 text-sm">Phase 1 — Quick Wins</p>
                  <p className="text-xs text-red-700 mt-1">
                    ~11 h dev · Score +5 à +8 pts · +15–25 % trafic · rich snippets blog + étoiles /avis actifs
                  </p>
                </div>
                <div className="p-3 bg-orange-50 border border-orange-100 rounded-lg">
                  <p className="font-semibold text-orange-800 text-sm">Phase 2 — Optimisations</p>
                  <p className="text-xs text-orange-700 mt-1">
                    ~35 h dev · Score +8 à +12 pts · BreadcrumbList + schemas communes · maillage renforcé
                  </p>
                </div>
                <div className="p-3 bg-sky-50 border border-sky-100 rounded-lg">
                  <p className="font-semibold text-sky-800 text-sm">Phase 3 — Croissance</p>
                  <p className="text-xs text-sky-700 mt-1">
                    ~20 h/mois · +150–250 % trafic · 2–5 propriétaires supplémentaires/mois via SEO
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Ce qu'il faut retenir */}
          <div className="bg-gray-900 text-white rounded-2xl p-8">
            <h3 className="font-bold text-lg mb-5">⭐ Ce qu&apos;il faut retenir — 5 points clés</h3>
            <ol className="space-y-4">
              {[
                "L'infrastructure technique est solide — Next.js SSR, sitemap dynamique, schemas sur les pages clés. La fondation SEO est bonne, mais des corrections rapides (HSTS, CSP frame-src, Consent Mode) sont bloquantes et doivent passer en P0 immédiatement.",
                "Le facteur limitant #1 est l'autorité de domaine quasi inexistante (DR ~5–12, domaine 2023). Aucune optimisation on-page ne permettra de se positionner sur des termes génériques à fort volume sans un profil de liens renforcé. Le link building est la priorité off-page absolue.",
                "Les opportunités locales longue traîne sont immenses et accessibles maintenant : 20 communes × 3 intents × mots-clés \"conciergerie + ville\" = des centaines de requêtes atteignables avec un DR de 15–20 et du contenu différencié.",
                "La cannibalisation entre pages /locations/, /destinations/ et /conciergerie/ pour les mêmes communes nécessite un audit live via l'API SEO interne (mode full) avant tout investissement massif en contenu.",
                "Le levier de croissance le plus rapide à 90 jours est la combinaison GBP optimisé + Article schema blog + AggregateRating /avis. Ces 3 actions améliorent directement la visibilité SERP (Local Pack + rich snippets) pour ≤ 8 h d'effort total.",
              ].map((point, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="shrink-0 w-7 h-7 bg-white/10 rounded-full flex items-center justify-center text-sm font-bold">
                    {i + 1}
                  </span>
                  <p className="text-gray-200 text-sm leading-relaxed">{point}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <footer className="text-center py-8 text-xs text-gray-400 border-t">
          <p>Rapport SEO Expert · entre-rhone-alpilles.fr · Généré en avril 2026</p>
          <p className="mt-1">
            Analyse basée sur le code source Next.js et les meilleures pratiques
            Ahrefs / Semrush / Lighthouse / Google Search Console
          </p>
        </footer>

      </main>
    </div>
  );
}
