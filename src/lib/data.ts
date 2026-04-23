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
    slug: "gestionnaire-airbnb-aux-alpilles-choisir-le-bon-partenaire",
    title: "Gestionnaire Airbnb aux Alpilles : choisir le bon partenaire",
    excerpt:
      "La location saisonnière dans les Alpilles connaît une croissance spectaculaire. Consultez notre guide complet, trouvez le meilleur partenaire ",
    date: "2026-04-24",
    category: "Guides de voyage",
    image: "/images/blog/gestionnaire-airbnb-aux-alpilles-choisir-le-bon-partenaire.jpg",
    readTime: 7,
  },
  {
    slug: "alpilles-dynamique-economique-tourisme-quelques-conseils",
    title: "Alpilles : dynamique économique tourisme, quelques conseils",
    excerpt:
      "La Provence attire depuis toujours les voyageurs en quête d’authenticité, de lumière et d’art de vivre. Au cœur de cette région emblématique, les Alpilles…",
    date: "2026-04-22",
    category: "Guides de voyage",
    image: "/images/blog/alpilles-provence-dynamique-economique-tourisme.jpg",
    readTime: 5,
  },
  {
    slug: "preparer-location-estivale-provence",
    title: "Comment préparer votre location estivale en Provence",
    excerpt:
      "Nos conseils pour maximiser vos revenus locatifs pendant la haute saison en Alpilles et préparer votre bien avant l'afflux estival.",
    date: "2025-04-15",
    category: "Conseils propriétaires",
    image: "/images/blog/location-estivale-provence-preparer.jpg",
    readTime: 6,
  },
  {
    slug: "guide-feria-arles",
    title: "Feria d'Arles 2025 : guide complet pour les visiteurs",
    excerpt:
      "Dates, programme, hébergements et conseils pratiques pour profiter pleinement de la Feria de Pâques et de la Vendange à Arles.",
    date: "2025-04-08",
    category: "Guides de voyage",
    image: "/images/blog/feria-arles-guide-visiteurs.jpg",
    readTime: 8,
  },
  {
    slug: "printemps-alpilles-que-faire",
    title: "Printemps aux Alpilles : nos 10 incontournables",
    excerpt:
      "Randonnées fleuries, marchés colorés et douceur provençale — le printemps aux Alpilles est magique. Nos 10 activités incontournables.",
    date: "2025-03-28",
    category: "Guides de voyage",
    image: "/images/blog/printemps-alpilles-que-faire.jpg",
    readTime: 5,
  },
  {
    slug: "fiscalite-location-courte-duree-provence",
    title: "Fiscalité location courte durée — guide complet 2025",
    excerpt:
      "Déclaration des revenus Airbnb, régimes micro-BIC et réel, taxe de séjour, CFE — tout ce que le propriétaire doit savoir.",
    date: "2025-03-10",
    category: "Conseils propriétaires",
    image: "/images/blog/fiscalite-location-courte-duree-provence.jpg",
    readTime: 10,
  },
  {
    slug: "saint-remy-de-provence-guide-complet",
    title: "Saint-Rémy-de-Provence : le guide complet du voyageur",
    excerpt:
      "Marché provençal, Glanum, Van Gogh, restaurants étoilés — tout ce qu'il faut savoir pour réussir votre séjour à Saint-Rémy-de-Provence.",
    date: "2025-02-20",
    category: "Guides de voyage",
    image: "/images/blog/saint-remy-de-provence-guide-voyage.jpg",
    readTime: 9,
  },
  {
    slug: "optimiser-annonce-airbnb-provence",
    title: "Comment optimiser son annonce Airbnb pour la Provence",
    excerpt:
      "Photos, titre, description, tarification — les 7 leviers qui font passer une annonce Airbnb de la page 3 à la page 1 en Provence.",
    date: "2025-02-05",
    category: "Conseils propriétaires",
    image: "/images/blog/optimiser-annonce-airbnb-provence.jpg",
    readTime: 7,
  },
  {
    slug: "marches-provencaux-alpilles",
    title: "Les marchés provençaux des Alpilles : notre sélection",
    excerpt:
      "Saint-Rémy, Maussane, Eygalières, Arles… Chaque marché provençal a son âme. Notre guide pour ne rater aucun incontournable de la région.",
    date: "2025-01-15",
    category: "Guides de voyage",
    image: "/images/blog/marches-provencaux-alpilles.jpg",
    readTime: 6,
  },
  {
    slug: "investir-location-saisonniere-alpilles",
    title: "Investissement locatif Alpilles — rentabilité 2025",
    excerpt:
      "Rendements attendus, communes à privilégier, fiscalité avantageuse — le guide de l'investisseur en location courte durée en Provence.",
    date: "2024-12-10",
    category: "Actualités région",
    image: "/images/blog/investir-location-saisonniere-alpilles.jpg",
    readTime: 11,
  },
];

export const testimonials: Testimonial[] = [
  {
    name: "Marie-Hélène D.",
    role: "proprietaire",
    location: "Mas à Saint-Rémy-de-Provence",
    rating: 5,
    text: "On a confié notre mas après deux saisons à tout gérer seuls, et franchement on ne reviendra jamais en arrière. L'équipe est sérieuse, disponible, et elle connaît le secteur mieux que quiconque. Le taux d'occupation a nettement augmenté, les voyageurs repartent ravis, et nous on n'a plus à gérer les urgences à distance. C'est exactement ce qu'on cherchait.",
    date: "2023-09-12",
  },
  {
    name: "François B.",
    role: "proprietaire",
    location: "Propriété à Maussane-les-Alpilles",
    rating: 5,
    text: "Excellent. Ma propriété est enfin présentée comme elle mérite de l'être.",
    date: "2023-10-05",
  },
  {
    name: "Isabelle et Laurent T.",
    role: "proprietaire",
    location: "Maison à Eygalières",
    rating: 4,
    text: "On était hésitants à déléguer parce que cette maison nous tient vraiment à cœur. Mais dès les premières semaines, on a compris qu'on avait fait le bon choix. Les comptes-rendus sont clairs, les voyageurs repartent satisfaits, et on sent une vraie attention portée à chaque détail. On recommande chaleureusement.",
    date: "2023-11-18",
  },
  {
    name: "Gilles P.",
    role: "proprietaire",
    location: "Mas à Les Baux-de-Provence",
    rating: 5,
    text: "Je vis à Paris. Gérer un mas en Provence à distance, c'était devenu une source de stress permanente. Depuis qu'ils s'en occupent, je n'ai plus qu'à regarder le calendrier se remplir. Sérieux, réactifs, jamais besoin de relancer. Une vraie sérénité retrouvée.",
    date: "2023-12-03",
  },
  {
    name: "Christine M.",
    role: "proprietaire",
    location: "Propriété à Fontvieille",
    rating: 4,
    text: "Transition très rapide et très bien menée. En moins d'une semaine, tout était en place.",
    date: "2024-01-22",
  },
  {
    name: "Jean-Paul A.",
    role: "proprietaire",
    location: "Bien à Tarascon",
    rating: 5,
    text: "J'avais essayé une autre conciergerie avant. La différence est frappante. Ici, il y a une vraie présence locale, une vraie connaissance des voyageurs qui viennent dans les Alpilles, et un vrai sens des responsabilités. Mon bien est géré comme s'il leur appartenait, et ça se ressent dans chaque retour client.",
    date: "2024-02-14",
  },
  {
    name: "Nathalie et Éric V.",
    role: "proprietaire",
    location: "Maison à Mouriès",
    rating: 4,
    text: "Leur honnêteté nous a tout de suite séduits. Pas de promesses exagérées, des engagements tenus. Les voyageurs ont laissé de très belles notes et la maison est toujours rendue impeccable.",
    date: "2024-03-08",
  },
  {
    name: "Alain R.",
    role: "proprietaire",
    location: "Propriété à Arles",
    rating: 5,
    text: "Deux ans de collaboration sans un seul vrai problème. C'est le meilleur indicateur que je puisse donner. Le ménage est irréprochable, les remises de clés toujours assurées, et les petits imprévus se règlent sans qu'on ait besoin d'intervenir. Une équipe en or.",
    date: "2024-04-19",
  },
  {
    name: "Sophie L.",
    role: "proprietaire",
    location: "Bien à Saint-Étienne-du-Grès",
    rating: 5,
    text: "Humain et professionnel à la fois. Ce n'est pas si courant.",
    date: "2024-05-07",
  },
  {
    name: "Marc et Agnès D.",
    role: "proprietaire",
    location: "Bastide à Paradou",
    rating: 4,
    text: "Notre bastide était mal valorisée avant. Depuis qu'on leur a confié la gestion, les retours des voyageurs ont changé du tout au tout. Le soin apporté à la préparation du logement se voit immédiatement dans les avis en ligne. On est vraiment fiers du résultat.",
    date: "2024-06-15",
  },
  {
    name: "Véronique H.",
    role: "proprietaire",
    location: "Propriété à Aureille",
    rating: 5,
    text: "On craignait de perdre le contrôle sur notre bien. C'est tout le contraire qui s'est passé. On est informés à chaque étape importante, les décisions se prennent ensemble, et on se sent vraiment partenaires. Une relation de confiance solide et durable.",
    date: "2024-07-22",
  },
  {
    name: "Thomas G.",
    role: "proprietaire",
    location: "Mas à Orgon",
    rating: 4,
    text: "Réactivité exemplaire. Une question le soir, une réponse dans l'heure. En pleine saison.",
    date: "2024-08-03",
  },
  {
    name: "Claire et Dominique B.",
    role: "proprietaire",
    location: "Maison à Maillane",
    rating: 5,
    text: "La saison a été bien remplie, sans stress et sans mauvaise surprise. Les voyageurs ont été bien sélectionnés, la maison a été respectée, et les notes sur les plateformes sont excellentes. On n'espérait pas un résultat aussi bon dès la première année.",
    date: "2024-09-11",
  },
  {
    name: "Patrice F.",
    role: "proprietaire",
    location: "Propriété à Graveson",
    rating: 4,
    text: "Ça fait vraiment du bien de travailler avec des gens qui ont le sens du service et de l'engagement. Tout est propre, bien communiqué, bien géré. On recommande sans la moindre réserve à tous les propriétaires de la région.",
    date: "2024-10-24",
  },
  {
    name: "Hélène M.",
    role: "proprietaire",
    location: "Bien à Boulbon",
    rating: 5,
    text: "Ce qui m'a le plus surprise, c'est leur regard sur la valorisation du bien. Ils m'ont conseillée sur quelques petites améliorations très ciblées qui ont eu un impact direct sur les réservations. Ce n'est pas juste de la gestion — c'est du vrai conseil de qualité.",
    date: "2024-11-06",
  },
  {
    name: "Renaud et Sylvie T.",
    role: "proprietaire",
    location: "Maison à Saint-Martin-de-Crau",
    rating: 4,
    text: "Premier été ensemble, et vraiment une belle réussite. On n'a reçu que de bonnes nouvelles.",
    date: "2024-12-18",
  },
  {
    name: "Olivier C.",
    role: "proprietaire",
    location: "Mas à Mas-Blanc-des-Alpilles",
    rating: 5,
    text: "La maison est traitée avec un respect sincère à chaque passage. Ce n'est pas un détail quand on parle d'un mas familial chargé d'histoire. On sent que l'équipe comprend ça, et cette sensibilité change vraiment tout dans la relation.",
    date: "2025-01-09",
  },
  {
    name: "Brigitte A.",
    role: "proprietaire",
    location: "Propriété à Vernègues",
    rating: 4,
    text: "Enfin une conciergerie qui tient ses engagements et qui ne disparaît pas entre deux séjours. Fiable, constante, disponible. Exactement ce dont j'avais besoin en tant que propriétaire non-résidente.",
    date: "2025-02-14",
  },
  {
    name: "Paul et Martine V.",
    role: "proprietaire",
    location: "Bien à Eyguières",
    rating: 5,
    text: "On a gagné du temps, de l'argent et une tranquillité d'esprit qu'on n'avait plus depuis des années. Le calcul est vite fait. On aurait dû le faire bien plus tôt.",
    date: "2025-03-05",
  },
  {
    name: "Catherine R.",
    role: "proprietaire",
    location: "Maison à Saint-Rémy-de-Provence",
    rating: 4,
    text: "Une belle découverte. Une équipe attentive, des voyageurs satisfaits, et une maison qui retrouve toute sa valeur chaque saison. On est vraiment contents d'avoir fait ce choix.",
    date: "2025-04-17",
  },
  {
    name: "Bernard et Françoise L.",
    role: "proprietaire",
    location: "Propriété à Châteaurenard",
    rating: 4,
    text: "On a pris le temps de trouver nos marques ensemble, mais le résultat est vraiment là. L'équipe est à l'écoute, s'adapte sans se plaindre, et met tout en œuvre pour que la saison se passe bien. On renouvelle sans hésiter.",
    date: "2025-05-08",
  },
  {
    name: "Sandrine V.",
    role: "proprietaire",
    location: "Bien à Mollégès",
    rating: 4,
    text: "Rigueur et transparence. C'est tout ce que je demandais, et c'est exactement ce que j'ai eu. Les comptes sont clairs, les retours honnêtes. Une collaboration saine et vraiment efficace.",
    date: "2025-06-21",
  },
  {
    name: "Frédéric et Anne-Claire D.",
    role: "proprietaire",
    location: "Maison de famille à Saint-Andiol",
    rating: 4,
    text: "Notre maison de famille est entre leurs mains depuis deux saisons maintenant. Les voyageurs ont été bien choisis, la maison est toujours rendue en parfait état, et on n'a jamais eu à se soucier de quoi que ce soit. C'est un luxe auquel on ne renoncera plus.",
    date: "2025-07-14",
  },
  {
    name: "Monique B.",
    role: "proprietaire",
    location: "Propriété à Plan-d'Orgon",
    rating: 4,
    text: "Il y a eu un petit couac en début de saison, réglé très rapidement et avec beaucoup d'honnêteté. Ce genre de réactivité et de transparence, ça rassure vraiment sur la qualité d'une équipe.",
    date: "2025-08-02",
  },
  {
    name: "Thierry M.",
    role: "proprietaire",
    location: "Mas à Cabannes",
    rating: 5,
    text: "Je cherchais quelqu'un d'ancré dans le territoire, pas une grosse structure froide. Ici, on n'est pas un numéro. C'est humain, sérieux, et franchement très efficace. Je recommande à tous mes voisins propriétaires.",
    date: "2025-08-30",
  },
  {
    name: "Laurence et Michel P.",
    role: "proprietaire",
    location: "Bien à Alleins",
    rating: 4,
    text: "Réservations régulières tout l'été, voyageurs bien sélectionnés, comptes-rendus soignés. Que demander de plus ?",
    date: "2025-09-15",
  },
  {
    name: "Jacques T.",
    role: "proprietaire",
    location: "Propriété à Lamanon",
    rating: 4,
    text: "Je craignais de perdre le lien avec mon bien en déléguant entièrement. Ce n'est absolument pas le cas. On est impliqué quand c'est important, déchargé du reste. C'est vraiment le bon équilibre entre autonomie et délégation.",
    date: "2025-10-08",
  },
  {
    name: "Élodie R.",
    role: "proprietaire",
    location: "Maison à Sénas",
    rating: 5,
    text: "Ce qui m'a le plus marquée, c'est l'attention portée aux petits détails à l'arrivée des voyageurs. Ce sont ces attentions-là qui font remonter les avis et fidélisent la clientèle. On voit tout de suite qu'ils ont l'expérience et l'envie de bien faire.",
    date: "2025-11-19",
  },
  {
    name: "Nicolas et Valérie H.",
    role: "proprietaire",
    location: "Bien à Rognonas",
    rating: 4,
    text: "On avait tout essayé : gérer seuls, plateformes, gardien de confiance. Cette formule est de très loin la plus efficace et la plus sereine. On délègue vraiment, les résultats sont là, et on profite enfin de notre bien sans la charge mentale.",
    date: "2025-12-04",
  },
  {
    name: "Martine G.",
    role: "proprietaire",
    location: "Propriété à Noves",
    rating: 5,
    text: "Une présence locale vraiment rassurante. En cas de souci, quelqu'un est là dans l'heure. Pas besoin d'attendre 48h une réponse par mail. Pour une propriétaire qui habite loin, c'est absolument précieux.",
    date: "2026-01-13",
  },
  {
    name: "Antoine et Cécile F.",
    role: "proprietaire",
    location: "Maison à Verquières",
    rating: 4,
    text: "Première saison très satisfaisante. Quelques ajustements ont été nécessaires, mais l'équipe les a pris en compte rapidement et sans ego. On repart sur une deuxième saison avec beaucoup de confiance.",
    date: "2026-02-07",
  },
  {
    name: "Dominique A.",
    role: "proprietaire",
    location: "Bien à Barbentane",
    rating: 4,
    text: "La gestion du planning est impeccable. Pas de chevauchements, pas de confusion, tout est parfaitement coordonné. On loue depuis plusieurs années et on n'avait jamais eu une organisation aussi fluide et aussi rassurante.",
    date: "2026-02-25",
  },
  {
    name: "Stéphanie et Romain C.",
    role: "proprietaire",
    location: "Propriété à Maillane",
    rating: 5,
    text: "Séduits dès la première rencontre par leur approche directe et concrète. Pas de discours commercial, juste des explications claires sur comment ils travaillent. Ce ton honnête, on le retrouve tout au long de la saison. C'est précieux.",
    date: "2026-03-11",
  },
  {
    name: "Philippe L.",
    role: "proprietaire",
    location: "Mas à Aureille",
    rating: 4,
    text: "Notre mas méritait un soin particulier. Ils l'ont compris sans qu'on ait besoin de l'expliquer. Les photos sont superbes, les descriptions sont justes, et les voyageurs qui arrivent correspondent exactement au profil qu'on souhaitait attirer.",
    date: "2026-03-22",
  },
  {
    name: "Carole et Jean-Marc V.",
    role: "proprietaire",
    location: "Propriété à Les Baux-de-Provence",
    rating: 5,
    text: "Trois saisons. Zéro problème majeur. Ce bilan parle de lui-même.",
    date: "2026-04-02",
  },
  {
    name: "Hubert D.",
    role: "proprietaire",
    location: "Bien à Fontvieille",
    rating: 4,
    text: "Équipe solide et organisation bien rodée. J'aurais aimé un peu plus de proactivité sur la stratégie tarifaire en basse saison, mais les échanges sont toujours agréables et le service est globalement de très bonne qualité.",
    date: "2026-04-08",
  },
  {
    name: "Aurélie et Sébastien M.",
    role: "proprietaire",
    location: "Maison à Mouriès",
    rating: 4,
    text: "Leur connaissance du marché local est vraiment un atout majeur. Ils savent ce que les voyageurs qui viennent dans les Alpilles cherchent, et ça se traduit directement dans la qualité des réservations et les avis laissés.",
    date: "2026-04-10",
  },
  {
    name: "Gérard P.",
    role: "proprietaire",
    location: "Propriété à Eygalières",
    rating: 5,
    text: "La formule tout inclus m'avait rendu sceptique au départ. Finalement c'est très bien calibré : on paie pour un service complet et on l'obtient vraiment, sans mauvaises surprises et sans frais cachés. Une vraie honnêteté commerciale qui fait du bien.",
    date: "2026-04-13",
  },
  {
    name: "Isabelle C.",
    role: "proprietaire",
    location: "Bien à Saint-Rémy-de-Provence",
    rating: 4,
    text: "Je recommande à tous les propriétaires qui veulent professionnaliser leur location sans y consacrer leurs soirées et leurs week-ends. L'équipe est sérieuse, chaleureuse et genuinement investie dans la réussite de chaque bien qu'elle gère.",
    date: "2026-04-16",
  },
  {
    name: "Robert et Danièle B.",
    role: "proprietaire",
    location: "Appartement à Arles",
    rating: 5,
    text: "On a confié notre bien avec beaucoup d'appréhension. Aujourd'hui on regrette juste de ne pas l'avoir fait plus tôt. La tranquillité que ça apporte n'a vraiment pas de prix. Merci pour ce travail discret, constant et remarquablement bien fait.",
    date: "2026-04-18",
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
