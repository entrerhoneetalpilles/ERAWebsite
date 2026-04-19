export type Circle = 1 | 2 | 3;

export interface Commune {
  name: string;
  slug: string;
  circle: Circle;
  atout: string;
  profilVoyageur: string;
  description: string;
  propertyTypes: string[];
  lat: number;
  lng: number;
}

export interface PropertyType {
  slug: string;
  name: string;
  plural: string;
  description: string;
  icon: string;
}

export interface ActivityTag {
  slug: string;
  name: string;
  description: string;
  icon: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
  readTime: number;
}

export interface Testimonial {
  name: string;
  role: "proprietaire" | "voyageur";
  location: string;
  rating: number;
  text: string;
  date: string;
}

export const communes: Commune[] = [
  {
    name: "Saint-Rémy-de-Provence",
    slug: "saint-remy-de-provence",
    circle: 1,
    atout: "Ville phare, marché, Van Gogh, Glanum",
    profilVoyageur: "International, culturel, gastronomie",
    description:
      "Cœur vibrant des Alpilles, Saint-Rémy enchante par son marché provençal, ses ruelles ombragées et l'héritage de Van Gogh. La ville offre une palette exceptionnelle d'hébergements de caractère, des mas entourés d'oliviers aux élégantes maisons de ville.",
    propertyTypes: ["mas", "villa", "maison-village", "appartement"],
    lat: 43.789,
    lng: 4.832,
  },
  {
    name: "Les Baux-de-Provence",
    slug: "les-baux-de-provence",
    circle: 1,
    atout: "Village des Baux, Carrières de Lumières",
    profilVoyageur: "Premium, courts séjours, couple",
    description:
      "Perché à 245 mètres d'altitude, Les Baux-de-Provence fascine par son château médiéval et les spectaculaires Carrières de Lumières. Un cadre d'exception pour des séjours haut de gamme dans un paysage de calcaire blanc et d'oliviers centenaires.",
    propertyTypes: ["villa", "bastide", "mas"],
    lat: 43.744,
    lng: 4.796,
  },
  {
    name: "Maussane-les-Alpilles",
    slug: "maussane-les-alpilles",
    circle: 1,
    atout: "AOP huile d'olive, mas de charme",
    profilVoyageur: "Famille, gastronomie, nature",
    description:
      "Village provençal authentique au cœur des oliveraies, Maussane est la capitale de l'huile d'olive AOP des Alpilles. Ses mas de charme, ses restaurants gastronomiques et sa douceur de vivre en font une destination prisée des familles et des amoureux du terroir.",
    propertyTypes: ["mas", "gite", "maison-village"],
    lat: 43.724,
    lng: 4.82,
  },
  {
    name: "Fontvieille",
    slug: "fontvieille",
    circle: 1,
    atout: "Moulin Daudet, entrée Alpilles SW",
    profilVoyageur: "Famille, vélo, authenticité",
    description:
      "Immortalisée par Alphonse Daudet et son célèbre moulin, Fontvieille est la porte d'entrée sud-ouest des Alpilles. Le village offre un cadre idéal pour les amateurs de vélo et de randonnée, avec des hébergements spacieux adaptés aux familles.",
    propertyTypes: ["gite", "mas", "maison-village"],
    lat: 43.723,
    lng: 4.757,
  },
  {
    name: "Paradou",
    slug: "paradou",
    circle: 1,
    atout: "Village intimiste, oliviers, calme",
    profilVoyageur: "Couple, retraite, slow travel",
    description:
      "Perle confidentielle des Alpilles, Paradou séduit par son calme absolu et ses paysages d'oliviers millénaires. Le village, préservé du tourisme de masse, est idéal pour une retraite ressourçante ou un séjour en duo loin de l'agitation.",
    propertyTypes: ["mas", "gite"],
    lat: 43.727,
    lng: 4.79,
  },
  {
    name: "Villeneuve-lès-Avignon",
    slug: "villeneuve-les-avignon",
    circle: 2,
    atout: "Chartreuse, festivals, rive Rhône Gard",
    profilVoyageur: "Culture, festival, luxe discret",
    description:
      "Sur la rive gardoise du Rhône, face au Palais des Papes, Villeneuve-lès-Avignon offre un point de vue unique sur Avignon et les festivals. Ses demeures historiques et son atmosphère d'élégance discrète en font une base d'exception pour explorer la région.",
    propertyTypes: ["appartement", "villa", "maison-village"],
    lat: 43.972,
    lng: 4.806,
  },
  {
    name: "Arles",
    slug: "arles",
    circle: 2,
    atout: "UNESCO, Feria, art contemporain (LUMA)",
    profilVoyageur: "International, culturel, photo",
    description:
      "Cité romaine classée au patrimoine mondial UNESCO, Arles vibre au rythme de la Feria et de la fondation LUMA. Son centre historique préservé, ses arènes et son bouillonnement artistique international attirent une clientèle internationale exigeante.",
    propertyTypes: ["appartement", "maison-village", "mas"],
    lat: 43.677,
    lng: 4.627,
  },
  {
    name: "Tarascon",
    slug: "tarascon",
    circle: 2,
    atout: "Château royal, rive Rhône, authenticité",
    profilVoyageur: "Famille, budget maîtrisé, histoire",
    description:
      "Gardée par son imposant château royal au bord du Rhône, Tarascon offre une authenticité provençale sans artifice. La ville, berceau de la légende de Tartarin, propose des hébergements accessibles pour des séjours familiaux riches en histoire.",
    propertyTypes: ["maison-village", "appartement", "gite"],
    lat: 43.806,
    lng: 4.659,
  },
  {
    name: "Boulbon",
    slug: "boulbon",
    circle: 2,
    atout: "Village perché, calme absolu, Rhône",
    profilVoyageur: "Couple, nature, slow travel",
    description:
      "Village perché dominant la plaine du Rhône, Boulbon est l'un des secrets les mieux gardés de la région. Ses ruelles tortueuses, ses vues panoramiques et son ambiance hors du temps séduisent les voyageurs en quête d'authenticité.",
    propertyTypes: ["mas", "gite"],
    lat: 43.846,
    lng: 4.7,
  },
  {
    name: "Graveson",
    slug: "graveson",
    circle: 2,
    atout: "Plaine agricole, mas, oenotourisme",
    profilVoyageur: "Famille, terroir, week-end",
    description:
      "Au cœur de la plaine agricole entre Tarascon et Avignon, Graveson est un village de charme entouré de vignobles et de vergers. Ses mas spacieux, souvent dotés de piscines, accueillent familles et groupes pour des séjours gourmands.",
    propertyTypes: ["mas", "gite", "villa"],
    lat: 43.855,
    lng: 4.77,
  },
  {
    name: "Barbentane",
    slug: "barbentane",
    circle: 2,
    atout: "Château, Durance-Rhône, authenticité",
    profilVoyageur: "Famille, histoire, séjour prolongé",
    description:
      "Dominé par son château du XVIIe siècle, Barbentane occupe un site privilégié entre Durance et Rhône. Le village, à quelques kilomètres d'Avignon, combine patrimoine historique et environnement naturel pour des séjours famille prolongés.",
    propertyTypes: ["villa", "bastide", "maison-village"],
    lat: 43.893,
    lng: 4.745,
  },
  {
    name: "Châteaurenard",
    slug: "chateaurenard",
    circle: 2,
    atout: "Plaine maraîchère, bonne densité biens",
    profilVoyageur: "Travail, famille, budget",
    description:
      "Première ville maraîchère de France, Châteaurenard offre un excellent rapport qualité-prix pour les séjours en Provence. Sa position centrale entre Avignon et les Alpilles en fait une base pratique pour explorer toute la région.",
    propertyTypes: ["appartement", "maison-village", "gite"],
    lat: 43.882,
    lng: 4.856,
  },
  {
    name: "Saint-Étienne-du-Grès",
    slug: "saint-etienne-du-gres",
    circle: 2,
    atout: "Porte Alpilles ouest, mas spacieux",
    profilVoyageur: "Famille, nature, vélo Alpilles",
    description:
      "Situé à l'entrée ouest des Alpilles, Saint-Étienne-du-Grès est le point de départ idéal pour explorer le massif à vélo. Ses mas spacieux avec jardins et piscines accueillent des groupes familiaux pour des séjours actifs.",
    propertyTypes: ["mas", "gite"],
    lat: 43.772,
    lng: 4.701,
  },
  {
    name: "Eygalières",
    slug: "eygalieres",
    circle: 3,
    atout: "Village le plus huppé des Alpilles, célébrités, villas luxe",
    profilVoyageur: "Luxe premium, célébrités, villas d'exception",
    description:
      "Perle absolue des Alpilles, Eygalières est le village préféré des célébrités et des amateurs de luxe discret. Ses villas d'exception nichées dans les garrigues et ses panoramas à couper le souffle en font la destination la plus exclusive de la région.",
    propertyTypes: ["villa", "mas", "bastide"],
    lat: 43.747,
    lng: 4.942,
  },
  {
    name: "Aureille",
    slug: "aureille",
    circle: 3,
    atout: "Village authentique, nature, limite est Alpilles",
    profilVoyageur: "Nature, randonnée, authenticité",
    description:
      "À la limite est des Alpilles, Aureille est un village authentique préservé des circuits touristiques. Ses gîtes immergés dans la nature sauvage conviennent aux amateurs de randonnée et d'authenticité provençale.",
    propertyTypes: ["gite", "mas"],
    lat: 43.717,
    lng: 4.963,
  },
  {
    name: "Mouriès",
    slug: "mouries",
    circle: 3,
    atout: "Plus grande oliveraie de France, calme",
    profilVoyageur: "Gastronomie, nature, oliveraie",
    description:
      "Mouriès abrite la plus grande oliveraie de France et produit une huile d'olive réputée dans toute la Méditerranée. Ses mas nichés parmi les oliviers millénaires offrent un cadre exceptionnel pour les amateurs de gastronomie et de nature.",
    propertyTypes: ["mas", "gite"],
    lat: 43.688,
    lng: 4.868,
  },
  {
    name: "Mollégès",
    slug: "molleges",
    circle: 3,
    atout: "Zone tampon, entre Saint-Rémy et Luberon",
    profilVoyageur: "Famille, nature, entre Alpilles et Luberon",
    description:
      "À mi-chemin entre les Alpilles et le Luberon, Mollégès est un village agricole tranquille entouré de vergers et de vignobles. Une base pratique pour explorer deux massifs en une semaine.",
    propertyTypes: ["gite", "maison-village"],
    lat: 43.797,
    lng: 4.934,
  },
  {
    name: "Noves",
    slug: "noves",
    circle: 3,
    atout: "Nord-est, proche Durance, plaine agricole",
    profilVoyageur: "Famille, nature, plaine provençale",
    description:
      "Village provençal au bord de la Durance, Noves offre un cadre agricole authentique avec des hébergements spacieux et abordables. Idéal pour des séjours en pleine nature avec accès facile à Avignon.",
    propertyTypes: ["gite", "maison-village", "mas"],
    lat: 43.874,
    lng: 4.918,
  },
  {
    name: "Verquières",
    slug: "verquieres",
    circle: 3,
    atout: "Petit village plaine, relais logistique",
    profilVoyageur: "Budget, famille, simplicité",
    description:
      "Petit village de la plaine entre Saint-Rémy et Châteaurenard, Verquières propose des hébergements simples et authentiques pour les budgets maîtrisés. Un point de chute pratique au cœur de la Provence.",
    propertyTypes: ["gite", "maison-village"],
    lat: 43.839,
    lng: 4.88,
  },
  {
    name: "Orgon",
    slug: "orgon",
    circle: 3,
    atout: "Porte du Luberon — frontière absolue",
    profilVoyageur: "Entre Alpilles et Luberon, nature",
    description:
      "Aux portes du Luberon, Orgon marque la frontière est de notre zone d'intervention. Ce village perché sur un éperon rocheux offre des vues panoramiques sur la Durance et constitue la limite géographique de notre territoire de conciergerie.",
    propertyTypes: ["gite", "maison-village"],
    lat: 43.785,
    lng: 5.044,
  },
];

export const propertyTypes: PropertyType[] = [
  {
    slug: "mas",
    name: "Mas",
    plural: "Mas provençaux",
    description:
      "Ferme traditionnelle provençale reconvertie, souvent avec piscine et grand jardin",
    icon: "🏡",
  },
  {
    slug: "villa",
    name: "Villa",
    plural: "Villas",
    description:
      "Maison moderne ou contemporaine avec équipements haut de gamme",
    icon: "🏠",
  },
  {
    slug: "bastide",
    name: "Bastide",
    plural: "Bastides",
    description: "Demeure de maître provençale, architecture XVIIe-XVIIIe siècle",
    icon: "🏛️",
  },
  {
    slug: "appartement",
    name: "Appartement",
    plural: "Appartements",
    description: "Logement en ville, idéal pour les courts séjours culturels",
    icon: "🏢",
  },
  {
    slug: "gite",
    name: "Gîte",
    plural: "Gîtes",
    description: "Hébergement rural authentique, souvent partie d'une propriété",
    icon: "🌿",
  },
  {
    slug: "maison-village",
    name: "Maison de village",
    plural: "Maisons de village",
    description: "Maison de caractère au cœur des villages provençaux",
    icon: "🏘️",
  },
  {
    slug: "avec-piscine",
    name: "Avec piscine",
    plural: "Avec piscine",
    description: "Tous types de biens disposant d'une piscine privée",
    icon: "🏊",
  },
  {
    slug: "domaine",
    name: "Domaine",
    plural: "Domaines",
    description: "Propriété étendue avec plusieurs bâtiments et terres",
    icon: "🌾",
  },
];

export const activityTags: ActivityTag[] = [
  {
    slug: "randonnee-alpilles",
    name: "Randonnée Alpilles",
    description: "GR653, sentiers balisés, panoramas",
    icon: "🥾",
  },
  {
    slug: "velo-provence",
    name: "Vélo en Provence",
    description: "Via Rhôna, pistes cyclables, location vélos",
    icon: "🚴",
  },
  {
    slug: "oenotourisme",
    name: "Œnotourisme",
    description: "Domaines viticoles Vallée du Rhône, Coteaux des Baux",
    icon: "🍷",
  },
  {
    slug: "golf",
    name: "Golf",
    description: "Golf de Servanes, Golf des Baux",
    icon: "⛳",
  },
  {
    slug: "equitation",
    name: "Équitation",
    description: "Centres équestres, Camargue à 30 min",
    icon: "🐴",
  },
  {
    slug: "famille",
    name: "En famille",
    description: "Parcs aquatiques, activités enfants, équipements bébé",
    icon: "👨‍👩‍👧‍👦",
  },
  {
    slug: "romantique",
    name: "Séjour romantique",
    description: "Spas, tables gastronomiques, escapades en duo",
    icon: "💕",
  },
  {
    slug: "culture",
    name: "Culture & Patrimoine",
    description: "Sites UNESCO, musées, festivals d'été",
    icon: "🏛️",
  },
];

export const blogPosts: BlogPost[] = [
  {
    slug: "preparer-location-estivale-provence",
    title: "Comment préparer votre location estivale en Provence",
    excerpt:
      "Nos conseils pour maximiser vos revenus locatifs pendant la haute saison en Alpilles.",
    date: "2025-04-15",
    category: "Conseils propriétaires",
    image: "/images/blog/blog-1.jpg",
    readTime: 6,
  },
  {
    slug: "guide-feria-arles",
    title: "Feria d'Arles 2025 : guide complet pour les visiteurs",
    excerpt:
      "Dates, programme, hébergements et conseils pour profiter pleinement de la Feria d'Arles.",
    date: "2025-04-08",
    category: "Guides de voyage",
    image: "/images/blog/blog-2.jpg",
    readTime: 8,
  },
  {
    slug: "printemps-alpilles-que-faire",
    title: "Printemps aux Alpilles : nos 10 incontournables",
    excerpt:
      "Randonnées fleuries, marchés colorés et douceur provençale — le printemps aux Alpilles est magique.",
    date: "2025-03-28",
    category: "Guides de voyage",
    image: "/images/blog/blog-3.jpg",
    readTime: 5,
  },
  {
    slug: "fiscalite-location-courte-duree-provence",
    title: "Fiscalité de la location courte durée : guide complet 2025",
    excerpt:
      "Déclaration des revenus Airbnb, régimes micro-BIC et réel, taxe de séjour, CFE — tout ce que le propriétaire doit savoir.",
    date: "2025-03-10",
    category: "Conseils propriétaires",
    image: "/images/blog/blog-4.jpg",
    readTime: 10,
  },
  {
    slug: "saint-remy-de-provence-guide-complet",
    title: "Saint-Rémy-de-Provence : le guide complet du voyageur",
    excerpt:
      "Marché provençal, Glanum, Van Gogh, restaurants étoilés — tout ce qu'il faut savoir pour séjourner à Saint-Rémy.",
    date: "2025-02-20",
    category: "Guides de voyage",
    image: "/images/blog/blog-5.jpg",
    readTime: 9,
  },
  {
    slug: "optimiser-annonce-airbnb-provence",
    title: "Comment optimiser son annonce Airbnb pour la Provence",
    excerpt:
      "Photos, titre, description, tarification — les 7 leviers qui font passer une annonce de la page 3 à la page 1.",
    date: "2025-02-05",
    category: "Conseils propriétaires",
    image: "/images/blog/blog-6.jpg",
    readTime: 7,
  },
  {
    slug: "marches-provencaux-alpilles",
    title: "Les marchés provençaux des Alpilles : notre sélection",
    excerpt:
      "Saint-Rémy, Maussane, Eygalières, Arles… Chaque marché a son âme. Notre guide pour ne rater aucun incontournable.",
    date: "2025-01-15",
    category: "Guides de voyage",
    image: "/images/blog/blog-7.jpg",
    readTime: 6,
  },
  {
    slug: "investir-location-saisonniere-alpilles",
    title: "Investir dans la location saisonnière aux Alpilles : rentabilité 2025",
    excerpt:
      "Rendements attendus, communes à privilégier, fiscalité avantageuse — le guide de l'investisseur en location courte durée en Provence.",
    date: "2024-12-10",
    category: "Actualités région",
    image: "/images/blog/blog-8.jpg",
    readTime: 11,
  },
];

export const testimonials: Testimonial[] = [
  {
    name: "Marie-Claire D.",
    role: "proprietaire",
    location: "Mas à Saint-Rémy-de-Provence",
    rating: 5,
    text: "Confier notre mas à Entre Rhône et Alpilles a été la meilleure décision. Zéro stress, revenus en hausse de 40% la première année, et des voyageurs ravis. L'équipe est réactive, professionnelle et connaît parfaitement la région.",
    date: "2025-03-15",
  },
  {
    name: "Jean-Pierre M.",
    role: "proprietaire",
    location: "Villa à Eygalières",
    rating: 5,
    text: "Après des années à gérer seul notre villa, la délégation totale à ERA a changé notre qualité de vie. Le taux d'occupation a dépassé 85% en haute saison. Je recommande sans hésitation.",
    date: "2025-02-20",
  },
  {
    name: "Sophie et Thomas K.",
    role: "voyageur",
    location: "Séjour à Maussane-les-Alpilles",
    rating: 5,
    text: "Deux semaines parfaites dans un mas exceptionnel. L'accueil était aux petits soins, le bien était exactement comme décrit. Les recommandations locales de l'équipe ERA ont fait de ce séjour une expérience inoubliable.",
    date: "2025-04-02",
  },
  {
    name: "David H.",
    role: "voyageur",
    location: "Appartement à Arles",
    rating: 5,
    text: "Pendant les Rencontres de la Photographie, l'équipe a tout prévu : check-in tardif, conseils d'expositions, restaurants réservés. Un service conciergerie digne d'un hôtel 5 étoiles.",
    date: "2025-04-10",
  },
];

export function getCommuneBySlug(slug: string): Commune | undefined {
  return communes.find((c) => c.slug === slug);
}

export function getPropertyTypeBySlug(slug: string): PropertyType | undefined {
  return propertyTypes.find((p) => p.slug === slug);
}

export function getCommunesByCircle(circle: Circle): Commune[] {
  return communes.filter((c) => c.circle === circle);
}

export function getCircleLabel(circle: Circle): string {
  switch (circle) {
    case 1:
      return "Cœur des Alpilles";
    case 2:
      return "Zone de développement";
    case 3:
      return "Frontière stratégique";
  }
}
