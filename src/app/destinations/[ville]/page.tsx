import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, MapPin, Calendar } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";
import PropertyCard from "@/components/PropertyCard";
import { communes, getCommuneBySlug } from "@/lib/data";
import { OG_IMG } from "@/lib/og";

export async function generateStaticParams() {
  return communes.map((c) => ({ ville: c.slug }));
}

type Props = { params: Promise<{ ville: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { ville } = await params;
  const commune = getCommuneBySlug(ville);
  if (!commune) return {};
  return {
    title: `${commune.name} — Guide de voyage`,
    description: `Guide complet de ${commune.name} en Provence : incontournables, restaurants, activités et hébergements de caractère sélectionnés par ERA.`,
    alternates: { canonical: `https://entre-rhone-alpilles.fr/destinations/${commune.slug}` },
    openGraph: {
      title: `Guide ${commune.name} — Entre Rhône et Alpilles`,
      description: commune.description,
      images: OG_IMG,
    },
  };
}

const getLocalInfo = (slug: string) => {
  const info: Record<string, { highlights: string[]; events: string[]; bestTime: string }> = {
    "saint-remy-de-provence": {
      highlights: ["Le marché provençal du mercredi", "Site archéologique de Glanum", "Centre Van Gogh & Hôpital Saint-Paul", "Les Antiques (arc de triomphe romain)", "Vieux bourg et ses galeries d'art"],
      events: ["Fête de la transhumance (Pentecôte)", "Marché de Noël de Saint-Rémy", "Alpilles en fête (automne)"],
      bestTime: "Avril à juin et septembre-octobre pour éviter la foule",
    },
    "arles": {
      highlights: ["Arènes romaines (UNESCO)", "Fondation LUMA Arles", "Musée de l'Arles Antique", "Les Alyscamps", "Cryptoportiques"],
      events: ["Feria de Pâques et de septembre", "Rencontres de la Photographie (juillet)", "Les Suds à Arles (juillet)"],
      bestTime: "Hors feria pour la visite, pendant la feria pour l'expérience unique",
    },
    "les-baux-de-provence": {
      highlights: ["Château des Baux (village médiéval)", "Carrières de Lumières", "Panorama sur la plaine de la Crau", "Cathédrale d'images", "Restaurants étoilés"],
      events: ["Les Baux en décembre (féérique)", "Médiévales des Baux (été)"],
      bestTime: "Décembre pour la magie de Noël, tôt le matin en été",
    },
    "eygalieres": {
      highlights: ["Village perché et ses ruelles", "Chapelle Saint-Sixte", "Panorama sur les Alpilles", "Restaurants gastronomiques", "Villas de célébrités"],
      events: ["Marché estival", "Fête du village (août)"],
      bestTime: "Juin et septembre pour la douceur et moins de monde",
    },
    "maussane-les-alpilles": {
      highlights: ["Capitale AOP Huile d'olive des Alpilles", "Moulin coopératif de la Vallée des Baux (visite & dégustation)", "Route des oliviers (vélo ou randonnée)", "Marché du jeudi sous les platanes", "Restaurants gastronomiques en terrasse", "Vignoble AOP Baux-de-Provence à 5 min"],
      events: ["Fête de l'Olive (décembre)", "Journées de l'huile nouvelle (novembre)", "Marchés thématiques estivaux"],
      bestTime: "Décembre pour la récolte et l'huile nouvelle, mai-juin pour le printemps provençal sans foule",
    },
    "fontvieille": {
      highlights: ["Moulin d'Alphonse Daudet & musée dédié", "Aqueduc romain de Barbegal (IVe s.)", "Abbaye de Montmajour à 5 km", "Sentiers VTT et vélo dans les Alpilles", "Carrière romaine de la Gayolle", "Marché provençal du lundi"],
      events: ["Rendez-vous de Fontvieille — cyclisme (septembre)", "Fête de la Saint-Éloi (artisans)", "Festival estival en plein air"],
      bestTime: "Avril-juin pour les randonnées, septembre-octobre pour les couleurs dorées des Alpilles",
    },
    "paradou": {
      highlights: ["Hameau du Destet — ruines médiévales en pleine nature", "Oliviers millénaires du plateau", "Sentiers de crête des Alpilles au départ du village", "Mas Sainte-Berthe — domaine viticole AOP", "Atelier d'artiste — Petit Mas de la Garrigue", "Silence et lumière : le village préservé du tourisme de masse"],
      events: ["Marché estival du jeudi", "Vins & Saveurs du Paradou (automne)", "Fête du village (août)"],
      bestTime: "Mai, juin et septembre — calme absolu, lumière provençale magnifique, réservations faciles",
    },
    "villeneuve-les-avignon": {
      highlights: ["Tour Philippe le Bel — panorama sur le Rhône et Avignon", "Chartreuse du Val de Bénédiction (XIVe s.)", "Fort Saint-André (remparts médiévaux)", "Musée Pierre de Luxembourg", "Vue iconique sur le Palais des Papes depuis la rive du Gard", "Collégiale Notre-Dame"],
      events: ["Festival d'Avignon (juillet — à 5 min)", "Festival Off Avignon", "Villeneuve en scène (été)"],
      bestTime: "Juillet pour le Festival d'Avignon, septembre-octobre pour la douceur et les marchés",
    },
    "tarascon": {
      highlights: ["Château du roi René (XVe s.) — forteresse médiévale sur le Rhône", "Collégiale Sainte-Marthe", "Musée Souleiado — tissus provençaux imprimés", "Marché du mardi et du samedi", "Musée Charles Deméry", "Bac de Beaucaire — traversée en bac"],
      events: ["Fête de la Tarasque (juin)", "Les Nuits du Château (été)", "Marché de Noël provençal"],
      bestTime: "Juin pour la Fête de la Tarasque, avril-mai pour visiter le château sans foule",
    },
    "boulbon": {
      highlights: ["Ruines du château médiéval perché sur l'éperon rocheux", "Panorama exceptionnel sur la plaine du Rhône et les Alpilles", "Chapelle Saint-Marcellin (XIe s.)", "Bord du Rhône — pêche, baignade, promenades", "Sentiers de randonnée dans les garrigues sauvages", "Un des secrets les mieux gardés de Provence"],
      events: ["Procession de la bouteille (1er juin — tradition unique)", "Fête du village (été)", "Journées du Patrimoine"],
      bestTime: "Mai-juin pour la procession et la garrigue en fleurs, septembre pour la douceur et les vendanges alentour",
    },
    "graveson": {
      highlights: ["Musée Auguste Chabaud (peintre fauviste né à Graveson)", "Abbaye de Frigolet à 5 km (bénédictine)", "Vignoble des Coteaux des Baux — visites de caves", "Vergers et maraîchages — vente directe", "Château de Barbentane à 6 km", "Marché hebdomadaire pittoresque"],
      events: ["Foire de la Saint-Martin (novembre)", "Fête des vendanges (septembre-octobre)", "Marché de producteurs estival"],
      bestTime: "Vendanges (fin septembre) pour l'œnotourisme, mai pour les cerisiers et les premières chaleurs",
    },
    "barbentane": {
      highlights: ["Château de Barbentane (XVIIe s.) — visite guidée des appartements", "Tour Anglica — panorama sur la Durance", "Vieilles halles médiévales", "Promenades au bord de la Durance", "Moulin à vent restauré", "Marché hebdomadaire"],
      events: ["Visites nocturnes du château (juillet-août)", "Journées du Patrimoine (septembre)", "Fête patronale"],
      bestTime: "Juin-septembre pour le jardin du château, automne pour les couleurs de la Durance et les vendanges",
    },
    "chateaurenard": {
      highlights: ["Château Féodal — deux tours médiévales avec panorama", "Marché d'Intérêt National (MIN) — visite matinale unique", "Canal des Alpines — promenades à vélo", "Marché du jeudi et samedi (produits locaux)", "Musée municipal", "Point central entre Avignon et les Alpilles"],
      events: ["Corso fleuri (juillet)", "Fête de la Saint-Éloi (confrérie des forgerons)", "Marché de Noël"],
      bestTime: "Juillet pour le corso fleuri, printemps pour le marché et les premières récoltes locales",
    },
    "saint-etienne-du-gres": {
      highlights: ["Porte d'entrée ouest des Alpilles", "Voie Aurélienne — ancienne voie romaine balisée", "Montagne des Cordes — randonnée panoramique", "Sentiers VTT et vélo vers Fontvieille et les Baux", "Abbaye de Montmajour à 8 km", "Calme absolu à 20 min d'Arles"],
      events: ["Fête locale d'été", "Rencontres cyclistes — Alpilles à vélo (printemps)", "Journées du Patrimoine"],
      bestTime: "Avril-juin pour les randonnées et le vélo, septembre pour l'automne en Provence",
    },
    "aureille": {
      highlights: ["Village typique préservé du tourisme de masse", "Sentier des crêtes des Alpilles — GR au départ du village", "Panorama sur la plaine de la Crau depuis le castelas", "Oliveraies et garrigues sauvages intactes", "Moulin à vent restauré", "Accès direct au cœur du massif des Alpilles"],
      events: ["Fête patronale de la Saint-Michel (septembre)", "Marché d'été du dimanche", "Journées du Patrimoine"],
      bestTime: "Mars-mai pour les Alpilles fleuries et les randonnées, automne pour les couleurs et le calme absolu",
    },
    "mouries": {
      highlights: ["Plus grande oliveraie de France (600 ha)", "Coopérative oléicole — dégustation et vente d'huile AOP", "Sentier des moulins à huile (pédestre)", "Vignoble AOP Baux-de-Provence autour du village", "Marché hebdomadaire sous les platanes", "Musée des Alpilles à Saint-Rémy (15 min)"],
      events: ["Fête des Alpilles à Mouriès (été)", "Journées de l'Huile Nouvelle (novembre-décembre)", "Rando des Alpilles (octobre)"],
      bestTime: "Novembre-décembre pour la récolte et la dégustation d'huile nouvelle, mai pour la floraison",
    },
    "molleges": {
      highlights: ["Village-rue provençal authentique entouré de vergers", "Cultures maraîchères — vente directe chez les producteurs", "Canal de la Durance — promenades cyclables", "À équidistance des Alpilles et du Luberon (30 min chacun)", "Vue lointaine sur le Mont Ventoux", "Base idéale pour explorer deux massifs en une semaine"],
      events: ["Fête du village (juillet)", "Marché paysan estival (dimanche)", "Vendanges chez les vignerons locaux"],
      bestTime: "Toute saison — idéal pour explorer les Alpilles et le Luberon depuis une base tranquille et abordable",
    },
    "noves": {
      highlights: ["Église Notre-Dame de Noves (romane, XIIe s.)", "Bord de la Durance — baignade, pêche, promenades", "Moulin à vent panoramique", "Marché du lundi matin (produits du terroir)", "Vergers de cerisiers et d'abricotiers — cueillette", "Chaîne des Côtes — randonnée au départ du village"],
      events: ["Fête des cerisiers (mai-juin)", "Journées du Patrimoine", "Fête patronale (août)"],
      bestTime: "Mai-juin pour les cerisiers en fleurs et la cueillette, septembre pour la vendange et les couleurs",
    },
    "verquieres": {
      highlights: ["Village agricole authentique au cœur du Comtat Venaissin", "Maraîchage et vente de produits locaux à la ferme", "Route des vins Coteaux d'Aix à 15 min", "Vue sur le Mont Ventoux par temps clair", "À mi-chemin entre Saint-Rémy-de-Provence et Avignon", "Calme absolu et paysages agricoles préservés"],
      events: ["Marché de producteurs (été)", "Fête du village (août)", "Balades dans les vignes (automne)"],
      bestTime: "Printemps et automne — calme total, prix avantageux, accès rapide à Avignon et aux Alpilles",
    },
    "orgon": {
      highlights: ["Village perché sur un éperon rocheux dominant la Durance", "Chapelle Notre-Dame de Beauregard — panorama 360° exceptionnel", "Gorges de la Durance — kayak, canoë, pêche", "Porte d'entrée du Parc Naturel du Luberon", "Randonnée au sommet du village (vue sur Alpilles et Luberon)", "Marché du mercredi"],
      events: ["Fête du village et brocante (août)", "Journées Nature du Luberon (printemps)", "Fêtes de la Durance (été)"],
      bestTime: "Mai-juin pour les randonnées vers le Luberon, automne pour les couleurs de la Durance",
    },
  };
  return info[slug] ?? {
    highlights: ["Village provençal authentique", "Marchés locaux", "Patrimoine architectural", "Nature et randonnées", "Gastronomie provençale"],
    events: ["Marché hebdomadaire", "Fêtes estivales"],
    bestTime: "Printemps et automne pour un séjour idéal",
  };
};

export default async function DestinationVillePage({ params }: Props) {
  const { ville } = await params;
  const commune = getCommuneBySlug(ville);
  if (!commune) notFound();

  const localInfo = getLocalInfo(ville);

  const mockProperties = [
    { title: `Mas de charme — ${commune.name}`, location: commune.name, type: "Mas", guests: 8, price: 280, rating: 4.9, reviewCount: 32, hasPiscine: true, slug: `mas-charme-${ville}` },
    { title: `Villa avec piscine — ${commune.name}`, location: commune.name, type: "Villa", guests: 6, price: 220, rating: 4.8, reviewCount: 18, hasPiscine: true, slug: `villa-piscine-${ville}` },
    { title: `Gîte authentique — ${commune.name}`, location: commune.name, type: "Gîte", guests: 4, price: 130, rating: 4.7, reviewCount: 24, hasPiscine: false, slug: `gite-authentique-${ville}` },
  ];

  const schemaOrg = {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    name: commune.name,
    description: commune.description,
    url: `https://entre-rhone-alpilles.fr/destinations/${commune.slug}`,
    geo: { "@type": "GeoCoordinates", latitude: commune.lat, longitude: commune.lng },
    touristType: commune.profilVoyageur,
  };

  const toc = ["Pourquoi séjourner", "Incontournables", "Quand venir", "Événements", "Où dormir", "Nos hébergements"];

  return (
    <div className="pt-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }} />

      <div className="bg-[var(--color-cream)] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: "Destinations", href: "/destinations" }, { label: commune.name }]} />
          <div className="mt-8 max-w-3xl">
            <div className="flex items-center gap-2 text-[var(--color-rhone)] mb-4">
              <MapPin className="w-5 h-5" aria-hidden="true" />
              <span className="text-sm font-semibold">Provence · Bouches-du-Rhône</span>
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              {commune.name} : que faire, voir et où loger ?<br />
              <span className="text-[var(--color-rhone)] text-3xl">Guide complet</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">{commune.description}</p>
            <p className="text-gray-600 leading-relaxed mt-3">
              Ce guide du voyageur rassemble les sites incontournables à visiter, les événements
              locaux, les meilleures périodes selon vos envies et notre sélection d&apos;hébergements
              de charme — mas, villas et bastides authentiques sélectionnés par notre conciergerie
              implantée à {commune.name}.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* TOC sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 bg-[var(--color-cream)] rounded-xl p-6">
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">Sommaire</p>
              <nav>
                <ul className="space-y-2">
                  {toc.map((item) => (
                    <li key={item}>
                      <a href={`#${item.toLowerCase().replace(/\s/g, "-")}`}
                        className="text-sm text-gray-600 hover:text-[var(--color-rhone)] transition-colors">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </aside>

          {/* Main content */}
          <article className="lg:col-span-3 prose-sm max-w-none">
            <section id="pourquoi-séjourner" className="mb-12">
              <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4">Pourquoi séjourner à {commune.name} ?</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                {commune.name} séduit les voyageurs en quête d&apos;authenticité provençale et de dépaysement total.
                Niché entre le Rhône et les Alpilles, le village offre un cadre d&apos;exception : lumière du Sud,
                architecture centenaire, gastronomie et nature préservée à portée de main.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                Que vous soyez en famille, en couple ou entre amis, {commune.name} répond à toutes les envies.
                {commune.profilVoyageur ? ` C'est la destination idéale pour ${commune.profilVoyageur.toLowerCase()}.` : ""}
              </p>
              <div className="mt-4 p-4 bg-[var(--color-cream)] rounded-xl">
                <p className="text-sm font-semibold text-gray-700">Point fort : <span className="font-normal">{commune.atout}</span></p>
              </div>
            </section>

            <section id="incontournables" className="mb-12">
              <h2 className="font-serif text-2xl font-bold text-gray-900 mb-6">Incontournables de {commune.name}</h2>
              <ul className="space-y-3">
                {localInfo.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-3 text-gray-700">
                    <span className="text-[var(--color-or)] mt-0.5 flex-shrink-0">—</span>
                    {h}
                  </li>
                ))}
              </ul>
            </section>

            <section id="quand-venir" className="mb-12">
              <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4">Quand venir à {commune.name} ?</h2>
              <div className="flex items-start gap-3 p-5 bg-[var(--color-cream)] rounded-xl">
                <Calendar className="w-5 h-5 text-[var(--color-rhone)] mt-0.5 flex-shrink-0" aria-hidden="true" />
                <p className="text-gray-700 leading-relaxed">{localInfo.bestTime}</p>
              </div>
            </section>

            <section id="événements" className="mb-12">
              <h2 className="font-serif text-2xl font-bold text-gray-900 mb-6">Événements & agenda</h2>
              <div className="space-y-3">
                {localInfo.events.map((e) => (
                  <div key={e} className="flex items-center gap-3 p-4 bg-white border border-gray-100 rounded-xl shadow-sm">
                    <Calendar className="w-5 h-5 text-[var(--color-rhone)] flex-shrink-0" aria-hidden="true" />
                    <p className="text-gray-700 font-medium">{e}</p>
                  </div>
                ))}
              </div>
            </section>

            <section id="où-dormir" className="mb-12">
              <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4">Où dormir à {commune.name} ?</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Entre mas provençaux avec piscine, villas contemporaines et bastides historiques, l&apos;offre
                d&apos;hébergement à {commune.name} est vaste. Notre conciergerie locale sélectionne
                uniquement des biens de caractère, vérifiés et gérés avec soin.
              </p>
              <h3 className="font-serif text-lg font-semibold text-gray-900 mb-3">
                Nos meilleures locations à {commune.name}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose mb-6">
                {mockProperties.map((p) => (
                  <PropertyCard key={p.slug} {...p} href={`/locations/${commune.slug}`} />
                ))}
              </div>
              <h3 className="font-serif text-lg font-semibold text-gray-900 mb-3">
                Quand réserver votre séjour à {commune.name} ?
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                La haute saison (juillet-août) se réserve 3 à 6 mois à l&apos;avance pour les meilleurs biens.
                Le printemps (avril-juin) et l&apos;automne (septembre-octobre) offrent un excellent rapport
                qualité/prix avec moins de monde et des températures idéales pour découvrir la région.
              </p>
              <Link href={`/locations/${commune.slug}`}
                className="inline-flex items-center gap-2 mt-2 text-[var(--color-rhone)] font-semibold hover:text-[var(--color-rhone-light)] transition-colors">
                Voir tous les hébergements à {commune.name}
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </section>
          </article>
        </div>
      </div>
    </div>
  );
}
