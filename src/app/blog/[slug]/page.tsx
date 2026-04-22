import type { Metadata } from "next";
import { Fragment } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Clock, Tag } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";
import BlogCard from "@/components/BlogCard";
import { blogPosts } from "@/lib/data";
import { formatDate as fmtDate } from "@/lib/utils";
import { OG_IMG } from "@/lib/og";

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: { absolute: `${post.title} | ERA` },
    description: post.excerpt,
    alternates: { canonical: `https://entre-rhone-alpilles.fr/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date.length === 10 ? `${post.date}T00:00:00Z` : post.date,
      authors: ["Entre Rhône et Alpilles"],
      tags: [post.category, "Provence", "Alpilles"],
      images: OG_IMG,
    },
  };
}

const articleContent: Record<string, string[]> = {
  "alpilles-dynamique-economique-tourisme-quelques-conseils": [
    "La **Provence** attire depuis toujours les voyageurs en quête d’authenticité, de lumière et d’art de vivre. Au cœur de cette région emblématique, les **Alpilles** concentrent une activité touristique dense, raffinée et en constante évolution. De [Saint-Rémy-de-Provence](chatgpt://generic-entity?number=0) à [Eygalières](chatgpt://generic-entity?number=1), en passant par [Les Baux-de-Provence](chatgpt://generic-entity?number=2), le territoire séduit une clientèle exigeante.",
    "Pour les propriétaires, comprendre la **dynamique économique** locale est essentiel pour optimiser une **location saisonnière** et sécuriser un **investissement** pérenne. Le marché évolue rapidement, porté par des tendances internationales, des attentes clients en mutation et une concurrence accrue.",
    "Dans ce contexte, il devient stratégique d’adopter des **conseils** adaptés au territoire des **Alpilles** afin de maximiser rentabilité et attractivité.",
    "## Comprendre la dynamique économique des Alpilles",
    "La **dynamique économique** des **Alpilles** repose sur un équilibre subtil entre tourisme de luxe, patrimoine culturel et nature préservée. Cette combinaison attire une clientèle internationale à fort pouvoir d’achat.",
    "Le marché de la **location saisonnière** en **Provence** bénéficie d’une saisonnalité élargie. Contrairement à d'autres régions, l’activité ne se limite plus à l’été. Printemps et automne enregistrent une fréquentation croissante, notamment autour des événements culturels et gastronomiques.",
    "Plusieurs facteurs expliquent cette évolution :",
    "- L’attrait pour le tourisme lent et authentique",
    "- La montée en gamme des hébergements",
    "- La digitalisation des réservations",
    "- L’influence des réseaux sociaux sur les destinations",
    "Dans des communes comme Maussane-les-Alpilles ou Saint-Rémy-de-Provence, les prix à la nuitée reflètent cette montée en gamme. Cela renforce l’intérêt d’un **investissement** bien positionné.",
    "Pour les propriétaires, analyser cette **dynamique économique** permet d’adapter leur stratégie et d’anticiper les périodes de forte demande.",
    "## Location saisonnière en Provence : tendances et opportunités",
    "La **location saisonnière** dans les **Alpilles** s’inscrit dans une logique d’expérience. Les voyageurs ne recherchent plus seulement un logement, mais un véritable art de vivre provençal.",
    "Les attentes évoluent rapidement, avec des critères de sélection précis :",
    "- Piscine et extérieurs aménagés",
    "- Décoration authentique mais haut de gamme",
    "- Services personnalisés (conciergerie, chef à domicile)",
    "- Proximité avec les villages emblématiques",
    "À Eygalières ou aux Baux-de-Provence, les biens offrant une vue ou un cachet architectural se démarquent fortement. Cette différenciation est essentielle dans un marché concurrentiel.",
    "La **Provence** bénéficie également d’une clientèle internationale fidèle, notamment américaine, suisse et belge. Cette diversité renforce la stabilité de la **dynamique économique** locale.",
    "Pour maximiser votre **investissement**, il est crucial de positionner votre bien sur un segment clair : luxe, charme ou familial.",
    "## Conseils pour optimiser votre investissement locatif",
    "Réussir en **location saisonnière** dans les **Alpilles** nécessite une approche structurée. Voici des **conseils** concrets pour améliorer la rentabilité de votre bien.",
    "### Soigner le positionnement de votre bien",
    "Un bien bien positionné capte immédiatement l’attention. Il doit correspondre à une cible précise.",
    "- Maison de charme pour couples",
    "- Mas provençal pour familles",
    "- Villa contemporaine pour clientèle premium",
    "Cette cohérence renforce la visibilité et améliore les taux de réservation.",
    "### Adapter les tarifs à la dynamique économique",
    "La tarification dynamique est devenue incontournable. Elle consiste à ajuster les prix selon :",
    "- La saison",
    "- Les événements locaux",
    "- La demande en temps réel",
    "Dans les Alpilles, un festival ou une exposition peut fortement influencer les prix. Comprendre cette **dynamique économique** permet d’optimiser vos revenus.",
    "### Miser sur la qualité de l’expérience client",
    "La satisfaction client est un levier clé. Elle impacte directement :",
    "- Les avis en ligne",
    "- Le taux de retour",
    "- La recommandation",
    "Une expérience fluide et premium valorise votre **location saisonnière** sur le long terme.",
    "## L’impact du tourisme sur l’économie locale des Alpilles",
    "Le tourisme est un moteur majeur de la **dynamique économique** des **Alpilles**. Il soutient de nombreux secteurs :",
    "- Restauration",
    "- Artisanat",
    "- Culture",
    "- Immobilier",
    "Cette interdépendance renforce l’attractivité du territoire. Un **investissement** en **location saisonnière** participe donc directement à l’économie locale.",
    "Dans des villages comme Saint-Rémy-de-Provence, la vitalité commerciale dépend en grande partie des visiteurs. Cela crée un cercle vertueux entre tourisme et développement économique.",
    "La **Provence** continue d’attirer grâce à son image forte et à son patrimoine exceptionnel. Cette stabilité est un atout majeur pour les propriétaires.",
    "## Pourquoi faire appel à une conciergerie dans les Alpilles",
    "Gérer une **location saisonnière** demande du temps, des compétences et une connaissance fine du marché. C’est ici qu’une conciergerie comme **Entre Rhône et Alpilles** intervient.",
    "Externaliser la gestion permet de :",
    "- Optimiser les revenus",
    "- Gagner du temps",
    "- Améliorer la qualité de service",
    "- S’adapter à la **dynamique économique** locale",
    "Une conciergerie premium maîtrise les attentes des voyageurs en **Provence**. Elle valorise chaque bien en fonction de ses atouts.",
    "Dans les Alpilles, où l’exigence est élevée, ce niveau de service devient un véritable avantage concurrentiel.",
    "## Anticiper l’évolution du marché touristique en Provence",
    "Le marché des **Alpilles** est en constante évolution. Pour sécuriser votre **investissement**, il est essentiel d’anticiper les tendances.",
    "Parmi les évolutions à surveiller :",
    "- L’essor du télétravail et des séjours longue durée",
    "- La demande croissante pour des expériences personnalisées",
    "- L’importance accrue de l’écologie et du tourisme durable",
    "La **Provence** s’adapte progressivement à ces nouvelles attentes. Les propriétaires qui intègrent ces dimensions renforcent leur position sur le marché.",
    "La **dynamique économique** reste positive, mais elle exige une adaptation continue. Une stratégie figée devient rapidement obsolète.",
    "Investir dans la **location saisonnière** dans les **Alpilles** est une opportunité solide, à condition d’en comprendre les mécanismes. Entre attractivité touristique, montée en gamme et évolution des attentes, chaque décision compte. Pour bénéficier d’un accompagnement sur mesure et valoriser pleinement votre bien, vous pouvez contacter **Entre Rhône et Alpilles** : https://entre-rhone-alpilles.fr/contact",
    "```json",
    "{",
    "\"@context\": \"https://schema.org\",",
    "\"@type\": \"Article\",",
    "\"headline\": \"Alpilles Provence : dynamique économique tourisme\",",
    "\"author\": {",
    "\"@type\": \"Organization\",",
    "\"name\": \"Entre Rhône et Alpilles\"",
    "},",
    "\"publisher\": {",
    "\"@type\": \"Organization\",",
    "\"name\": \"Entre Rhône et Alpilles\",",
    "\"url\": \"https://entre-rhone-alpilles.fr\"",
    "},",
    "\"inLanguage\": \"fr-FR\",",
    "\"keywords\": [",
    "\"Location saisonnière\",",
    "\"Dynamique économique\",",
    "\"Conseils\",",
    "\"Investissement\",",
    "\"Alpilles\",",
    "\"Provence\"",
    "]",
    "}",
  ],
  "preparer-location-estivale-provence": [
    "La saison estivale en Provence est la plus lucrative pour les propriétaires de locations saisonnières. Juin, juillet, août et septembre représentent souvent 60 à 70% des revenus annuels d'un bien. Bien se préparer est donc essentiel pour maximiser ces revenus.",
    "**Soigner les photos de votre annonce** est la première priorité. Les voyageurs scannent des dizaines d'annonces en quelques secondes : des photos professionnelles, lumineuses et bien composées font la différence. Nous recommandons de refaire les photos tous les 2 ans, et surtout après chaque rénovation.",
    "**La tarification dynamique** est votre meilleur allié. Les prix doivent s'ajuster quotidiennement en fonction de la demande, des événements locaux et de la concurrence. Un bien à Saint-Rémy-de-Provence peut valoir 250€/nuit en mai et 420€/nuit un week-end de juillet. Des outils comme PriceLabs automatisent ces ajustements.",
    "**Préparez votre bien physiquement** : vérifiez la climatisation (indispensable en Provence l'été), le bon état de la piscine et son système de filtration, l'état des stores et volets. Un check-up technique en avril vous évitera les urgences en juillet.",
    "**Répondez vite aux demandes** : sur Airbnb, un taux de réponse élevé et rapide (moins d'une heure) améliore votre classement dans les résultats de recherche. En haute saison, les voyageurs envoient plusieurs demandes en parallèle — le premier à répondre gagne souvent la réservation.",
    "**Constituez un kit de bienvenue** provençal : huile d'olive locale, savon de Marseille, quelques bouteilles de vin de la région, un guide des marchés et restaurants. Ces petites attentions génèrent des avis 5 étoiles et des retours.",
    "Avec Entre Rhône et Alpilles, tout cela est géré pour vous. Notre équipe s'occupe de la préparation, de la tarification et de l'accueil — vous n'avez qu'à percevoir vos revenus.",
  ],
  "guide-feria-arles": [
    "La Feria d'Arles est l'un des événements les plus spectaculaires de Provence. Deux fois par an — à Pâques et en septembre — la ville se transforme pendant 5 jours en capitale de la tauromachie et de la fête. En 2025, la Feria de Pâques se tient du 17 au 21 avril, la Feria des Vendanges du 12 au 14 septembre.",
    "**Les arènes romaines** sont évidemment le cœur de la Feria. Classées au patrimoine mondial UNESCO, elles accueillent corridas, novilladas et spectacles équestres. Les billets pour les corridas de gala se vendent en quelques heures — réservez dès l'ouverture des ventes (généralement 3 mois avant).",
    "**La Feria ne se réduit pas aux arènes.** Les bandas (fanfares) parcourent les rues à toute heure, les bodégas (buvettes géantes) résonnent de flamenco, les terrasses débordent. Le centre historique d'Arles se vit entièrement à pied.",
    "**Où se loger pendant la Feria ?** Les hébergements sont pris d'assaut dès octobre pour la Feria de Pâques. Privilégiez un appartement en centre-ville pour marcher jusqu'aux arènes, ou un mas dans les Alpilles (15-20 min) pour fuir le bruit la nuit. Nos appartements à Arles et nos mas à Saint-Rémy sont très demandés.",
    "**Conseils pratiques :** arrivez à Arles en train (gare à 15 min des arènes à pied). La voiture est déconseillée — parking introuvable. Habillez-vous en blanc pour la Feria de Pâques, tradition oblige. Budget boisson/restauration : 50-80€/jour minimum.",
    "**Que faire en dehors des corridas ?** La fondation LUMA, les Alyscamps, le musée de l'Arles antique — profitez des journées plus calmes pour visiter une ville exceptionnelle.",
  ],
  "printemps-alpilles-que-faire": [
    "Le printemps est sans doute la plus belle saison dans les Alpilles. De mars à mai, la nature explose de couleurs : les amandiers en fleurs, les cerisiers, les premières lavandes, les coquelicots dans la plaine. La lumière provençale retrouve sa douceur après l'hiver.",
    "**Randonnée sur le GR653 :** le sentier de Saint-Jacques traverse les Alpilles de Fontvieille à Eygalières. Au printemps, la garrigue embaume le thym et le romarin. Comptez 3 à 4 heures pour le tronçon le plus beau entre Les Baux et Saint-Rémy.",
    "**Les marchés provençaux en pleine forme :** le marché de Saint-Rémy-de-Provence (mercredi matin) est particulièrement festif au printemps — asperges vertes, fraises de Carpentras, premiers melons, fromages de chèvre frais. Arrivez avant 9h pour éviter la foule.",
    "**Vélo sur la Via Rhôna :** la piste cyclable longe le Rhône de Villeneuve-lès-Avignon à Arles sur 60 km. Terrain plat, paysages de plaine, villages de charme — idéal pour les familles avec enfants.",
    "**Les Carrières de Lumières :** le spectacle son et lumière des Carrières, dans les entrailles calcaires des Baux, change chaque année. Au printemps, profitez-en avant les files d'attente de l'été. Réservation en ligne conseillée.",
    "**Le printemps en chiffres :** température 15-22°C, ensoleillement maximal, pas de foule, prix des hébergements 20-30% inférieurs à l'été. La saison idéale pour découvrir la région authentiquement.",
    "**Où loger au printemps dans les Alpilles ?** Nos mas et gîtes avec jardin et piscine (parfois non encore chauffée en mars-avril) offrent des prix très attractifs. C'est la période préférée des connaisseurs.",
  ],

  "fiscalite-location-courte-duree-provence": [
    "Mettre son bien en location saisonnière génère des revenus, mais aussi des obligations fiscales précises. En 2025, la réglementation s'est renforcée — voici ce que tout propriétaire provençal doit savoir pour être en règle et optimiser sa situation.",
    "**Quel régime fiscal choisir ?** Les revenus de location meublée non professionnelle (LMNP) sont imposés dans la catégorie BIC (Bénéfices industriels et commerciaux). Deux régimes s'offrent à vous : le **régime micro-BIC** (abattement forfaitaire de 50%, ou 71% pour les meublés de tourisme classés) et le **régime réel** (déduction des charges réelles : amortissement, intérêts, travaux, charges).",
    "**Micro-BIC ou régime réel ?** Le micro-BIC est simple mais moins avantageux si vos charges dépassent l'abattement forfaitaire. Le régime réel est conseillé dès que votre bien génère plus de 20 000 € de revenus annuels ou si vous avez un emprunt en cours. Un comptable spécialisé en LMNP peut vous faire économiser plusieurs milliers d'euros par an.",
    "**La taxe de séjour** est collectée auprès des voyageurs et reversée à la commune. Son montant varie de 0,20 € à 5 € par nuit et par personne selon la commune et le classement du bien. Airbnb et Booking collectent et reversent souvent automatiquement la taxe de séjour depuis 2019 — vérifiez votre tableau de bord.",
    "**La CFE (Cotisation Foncière des Entreprises)** est due dès lors que votre activité de location meublée génère des revenus supérieurs à 5 000 €/an. Son montant est faible (50 à 500 €/an selon les communes) mais son oubli peut entraîner des pénalités.",
    "**Déclaration en mairie :** depuis 2017, toute mise en location d'une résidence principale de plus de 120 jours/an doit faire l'objet d'une déclaration préalable en mairie dans certaines communes (Arles, Villeneuve-lès-Avignon notamment). Pour une résidence secondaire, une autorisation de changement d'usage peut être requise dans les zones tendues.",
    "**Nos conseils ERA :** Confiez votre comptabilité à un expert LMNP, optez pour le classement en meublé de tourisme (un étoile minimum vous fait passer l'abattement micro-BIC de 50% à 71%), et tenez un registre précis de toutes vos recettes et dépenses. Notre équipe peut vous orienter vers des partenaires comptables spécialisés dans la région.",
    "Avec Entre Rhône et Alpilles, vous recevez chaque mois un relevé détaillé de toutes les recettes et dépenses, prêt à remettre à votre comptable. Nous collectons et reversons également la taxe de séjour en votre nom.",
  ],

  "saint-remy-de-provence-guide-complet": [
    "Saint-Rémy-de-Provence est l'une des villes les plus séduisantes de Provence. À mi-chemin entre Avignon et les Alpilles, cette petite cité de 10 000 habitants concentre à elle seule tout ce que la Provence a de meilleur : un marché légendaire, des ruines antiques exceptionnelles, le souvenir de Van Gogh, une gastronomie de haut niveau et une vie culturelle intense.",
    "**Le marché du mercredi matin** est le rendez-vous incontournable. De 8h à 13h, le centre historique se transforme en un festival de couleurs et d'odeurs. Fleurs, légumes, fromages, olives, tissus provençaux, savons de Marseille — c'est ici que se vit la Provence authentique. Arrivez avant 9h pour éviter la foule des cars de touristes.",
    "**Glanum et les Antiques** constituent l'un des sites archéologiques les mieux préservés de France. À 1 km du centre, les ruines de la cité gréco-romaine (IIe s. av. J.-C.) s'étendent sur plusieurs hectares. Face au site, les Antiques — un arc de triomphe et un mausolée romains — se dressent en parfait état depuis 2 000 ans.",
    "**L'Espace Van Gogh et Saint-Paul-de-Mausole :** c'est à Saint-Rémy que Van Gogh se fit interner volontairement en 1889, après l'épisode de l'oreille à Arles. En un an à l'asile de Saint-Paul-de-Mausole, il peignit plus de 150 toiles, dont La Nuit étoilée. La chambre du peintre et le cloître roman sont visitables.",
    "**Gastronomie :** Saint-Rémy compte plusieurs tables remarquables. La région est connue pour ses huiles d'olive AOP (moulin Castelas à Baux, moulin de Saint-Victor), ses vins des Alpilles et ses légumes du marché. Comptez 40 à 80€ par personne pour un déjeuner de qualité en terrasse.",
    "**Se déplacer :** Saint-Rémy se visite à pied dans le centre. Pour les environs (Les Baux, Eygalières, Maussane), un vélo ou une voiture sont indispensables — aucun transport en commun fréquent n'existe entre ces villages. Louez votre vélo électrique à la gare routière.",
    "**Quand venir ?** L'été est magnifique mais chargé. Nos préférences : avril-mai (cerisiers en fleurs, températures douces) et septembre-octobre (lumière de l'automne, vendanges, prix plus bas). Évitez la deuxième quinzaine de juillet et août sauf si vous aimez la foule.",
    "**Où se loger ?** Nos mas et villas autour de Saint-Rémy offrent le meilleur des deux mondes : calme et piscine à 5 minutes à pied ou à vélo du marché. Contactez-nous pour une sélection personnalisée selon votre groupe et votre budget.",
  ],

  "optimiser-annonce-airbnb-provence": [
    "Une annonce Airbnb bien optimisée peut générer 30 à 50% de revenus supplémentaires par rapport à une annonce moyenne. Après avoir géré des dizaines de biens dans les Alpilles, voici nos 7 leviers les plus efficaces.",
    "**1. Les photos sont tout.** C'est le premier filtre que les voyageurs utilisent. Des photos professionnelles, prises en lumière naturelle de fin d'après-midi, avec un grand angle et des compositions soignées, peuvent doubler le taux de clics sur votre annonce. Investir 200-300€ dans un photographe professionnel est systématiquement rentabilisé en une réservation.",
    "**2. Le titre doit être précis et évocateur.** \"Mas provençal\" n'intéresse personne. \"Mas 8 pers. | Piscine chauffée | Vue Alpilles | 5 min Saint-Rémy\" convertit. Incluez toujours la capacité d'accueil, les équipements phares et la proximité d'un lieu connu.",
    "**3. La description doit raconter une expérience.** Les voyageurs ne cherchent pas un hébergement — ils cherchent des vacances de rêve. Décrivez l'ambiance : \"Le matin, prenez votre café face aux Alpilles dans le silence de la garrigue. À 10 minutes, le marché de Saint-Rémy s'éveille...\" C'est ce style qui crée le désir.",
    "**4. La tarification dynamique est non négociable.** Prix fixe = revenus perdus. Un algorithme comme PriceLabs analyse chaque jour la demande locale, les événements (Feria d'Arles, Rencontres Photo, Noël aux Baux), les concurrents et ajuste vos prix automatiquement. Résultat moyen observé sur nos biens : +28% de revenus à taux d'occupation identique.",
    "**5. Répondez aux demandes en moins d'une heure.** Airbnb favorise les hôtes réactifs dans son algorithme de classement. Une réponse rapide rassure aussi le voyageur, qui est souvent en train de comparer plusieurs biens simultanément.",
    "**6. Les avis sont votre capital.** Chaque séjour est une opportunité d'avis 5 étoiles. Un message de bienvenue soigné, un guide local personnalisé, une attention (huile d'olive locale, bouteille de vin régional) peuvent transformer un séjour agréable en avis enthousiaste. N'oubliez pas de noter vous-même vos voyageurs — cela incite à la réciprocité.",
    "**7. Maintenez votre calendrier à jour.** Un calendrier non mis à jour génère des annulations de dernière minute, qui pénalisent votre classement. Synchronisez tous vos canaux (Airbnb, Booking, VRBO) via un channel manager pour éviter les doubles réservations.",
    "Chez Entre Rhône et Alpilles, nous prenons en charge l'intégralité de ces optimisations pour vous. Nos biens gérés affichent en moyenne un taux d'occupation de 85% en saison, et une note moyenne de 4,9/5 sur toutes les plateformes.",
  ],

  "marches-provencaux-alpilles": [
    "Les marchés provençaux sont l'âme de la région. Entre le Rhône et les Alpilles, chaque village a son marché, chacun avec sa personnalité, ses producteurs locaux et son ambiance. Voici notre sélection des incontournables.",
    "**Saint-Rémy-de-Provence — Mercredi matin (8h-13h) :** Le plus grand et le plus beau des marchés locaux. Fruits et légumes du Luberon et de la Crau, fleurs de Provence, fromages de chèvre, huiles d'olive AOP, céramiques, tissus. Les producteurs côtoient les artisans. Arrivez tôt pour trouver à vous garer (parking du Château-Estrine recommandé).",
    "**Maussane-les-Alpilles — Dimanche matin (8h-12h30) :** Marché plus modeste mais très authentique. Spécialité : les olives et huiles d'olive AOP Vallée des Baux, directement chez les mouliniers locaux. Quelques tables de restaurateurs proposent des tapas provençaux à déguster sur place.",
    "**Arles — Mercredi et samedi matin (8h-13h) :** Le grand marché arlésien s'étend sur les deux principaux boulevards de la ville. Mercredi : marché du centre (Grand Marché), le plus animé. Samedi : marché plus axé alimentation dans le quartier de la Cavalerie. Une expérience urbaine et provençale mêlées.",
    "**Eygalières — Vendredi matin (8h-13h, saison) :** Petit marché de village au charme préservé. Une vingtaine de producteurs seulement, mais tous locaux et de qualité. Ambiance détendue, célébrités du village parfois visibles. Le marché vaut autant pour la promenade dans le village perché que pour les emplettes.",
    "**Fontvieille — Jeudi matin :** Marché typique du village de Daudet. Producteurs de la plaine de la Crau, légumes du maraîcher local, artisanat provençal. Profitez-en pour visiter le moulin de Daudet juste après.",
    "**Nos conseils pratiques :** Apportez des sacs en tissu (les marchés provençaux évitent le plastique depuis plusieurs années). Prévoyez du cash — tous les producteurs ne prennent pas la carte. Venez l'estomac vide : les marchés sont aussi des buffets à ciel ouvert, avec les incontournables fougasse à l'olive, navettes et tapenade fraîche. La saison des marchés s'étend d'avril à octobre, avec les plus belles éditions en mai-juin et septembre.",
  ],

  "investir-location-saisonniere-alpilles": [
    "La région des Alpilles est l'une des destinations touristiques les plus attractives de France. Avec plus de 3 millions de visiteurs par an dans un périmètre de 30 km, une demande locative en hausse constante et des prix immobiliers encore raisonnables comparés à la Côte d'Azur, la location saisonnière y offre des rendements particulièrement intéressants.",
    "**Quels rendements attendre ?** Un mas bien situé à Saint-Rémy ou Eygalières, proposé en location haut de gamme (300-600€/nuit), peut générer 40 000 à 80 000 € de revenus annuels pour un taux d'occupation de 70-80% en saison. Pour un appartement à Arles (150-200€/nuit), comptez 15 000 à 25 000 € annuels. Le rendement brut varie de 4 à 8% selon le bien et la gestion.",
    "**Quelles communes privilégier pour l'investissement ?** Saint-Rémy-de-Provence (forte notoriété, clientèle internationale), Eygalières (prestige, discrétion, clientèle aisée), Les Baux-de-Provence (tourisme massif mais saisonnier), Maussane-les-Alpilles (rapport qualité/prix excellent). Pour les budgets plus limités : Fontvieille, Paradou, Graveson offrent des opportunités avec un potentiel de plus-value.",
    "**Le type de bien qui performe le mieux :** les mas de 150-250 m² avec piscine et 4-5 chambres constituent le segment le plus rentable. La clientèle familiale et les groupes d'amis sont les plus dépensiers. Les bastides de luxe (8+ chambres, piscine chauffée, jacuzzi) trouvent une clientèle de niche très fidèle et peu sensible aux prix.",
    "**Les pièges à éviter :** Ne pas sous-estimer les coûts d'exploitation (ménage, linge, maintenance, assurance, commission plateforme + conciergerie). Ne pas acheter dans une commune sans attrait touristique. Ne pas négliger la réglementation locale (certaines communes limitent les locations touristiques).",
    "**La fiscalité favorable du LMNP :** le statut de Loueur en Meublé Non Professionnel (LMNP) au régime réel vous permet d'amortir votre investissement sur 20-30 ans, créant souvent un résultat fiscal nul pendant plusieurs années. C'est l'un des rares investissements immobiliers où vous pouvez percevoir des revenus sans les payer (à terme, des impôts).",
    "**Déléguer ou gérer soi-même ?** Les propriétaires qui délèguent la gestion à une conciergerie professionnelle comme Entre Rhône et Alpilles génèrent en moyenne 25-35% de revenus supplémentaires par rapport à la gestion autonome. La tarification dynamique, la réactivité 24/7 et l'optimisation des annonces font la différence — sans compter le temps et le stress épargnés.",
    "La région entre le Rhône et les Alpilles offre selon nous l'un des meilleurs rapports attractivité/prix/rendement de Provence. Si vous souhaitez analyser le potentiel d'un bien précis, notre équipe réalise des études de marché gratuites avec données AirDNA à l'appui.",
  ],
};

const internalLinks: Record<string, { label: string; href: string }[]> = {
  "alpilles-dynamique-economique-tourisme-quelques-conseils": [
    { label: "Tous nos hébergements entre Rhône et Alpilles", href: "/locations" },
    { label: "Découvrir les destinations en Provence", href: "/destinations" },
    { label: "Estimer mes revenus Airbnb en Provence", href: "/conciergerie/estimer-mes-revenus" },
  ],
  "preparer-location-estivale-provence": [
    { label: "Confier mon bien à ERA — conciergerie Provence", href: "/conciergerie" },
    { label: "Estimer mes revenus locatifs gratuitement", href: "/conciergerie/estimer-mes-revenus" },
    { label: "Nos locations de vacances à Saint-Rémy-de-Provence", href: "/locations/saint-remy-de-provence" },
  ],
  "guide-feria-arles": [
    { label: "Guide complet d'Arles — que faire, voir, loger", href: "/destinations/arles" },
    { label: "Locations de vacances à Arles", href: "/locations/arles" },
    { label: "Estimer mes revenus Airbnb en Provence", href: "/conciergerie/estimer-mes-revenus" },
  ],
  "printemps-alpilles-que-faire": [
    { label: "Guide de Saint-Rémy-de-Provence au printemps", href: "/destinations/saint-remy-de-provence" },
    { label: "Locations avec piscine en Provence", href: "/locations/avec-piscine" },
    { label: "Tous nos hébergements entre Rhône et Alpilles", href: "/locations" },
  ],
  "fiscalite-location-courte-duree-provence": [
    { label: "Notre service de conciergerie Provence — gestion complète", href: "/conciergerie" },
    { label: "Nos services de gestion locative", href: "/conciergerie/nos-services" },
    { label: "FAQ — toutes vos questions sur la location saisonnière", href: "/faq" },
  ],
  "saint-remy-de-provence-guide-complet": [
    { label: "Guide de Saint-Rémy-de-Provence — incontournables & agenda", href: "/destinations/saint-remy-de-provence" },
    { label: "Nos locations de mas et villas à Saint-Rémy", href: "/locations/saint-remy-de-provence" },
    { label: "Estimer mes revenus locatifs à Saint-Rémy", href: "/conciergerie/estimer-mes-revenus" },
  ],
  "optimiser-annonce-airbnb-provence": [
    { label: "Déléguer la gestion à notre conciergerie Provence", href: "/conciergerie" },
    { label: "Découvrir tous nos services de gestion locative", href: "/conciergerie/nos-services" },
    { label: "Estimer mes revenus Airbnb gratuitement", href: "/conciergerie/estimer-mes-revenus" },
  ],
  "marches-provencaux-alpilles": [
    { label: "Guide de Saint-Rémy-de-Provence — marché du mercredi", href: "/destinations/saint-remy-de-provence" },
    { label: "Guide d'Arles — grand marché du samedi", href: "/destinations/arles" },
    { label: "Louer un mas ou une villa proche des marchés", href: "/locations" },
  ],
  "investir-location-saisonniere-alpilles": [
    { label: "Confier la gestion de mon bien — conciergerie ERA", href: "/conciergerie" },
    { label: "Nos locations haut de gamme à Eygalières", href: "/locations/eygalieres" },
    { label: "Estimer le potentiel locatif de mon bien gratuitement", href: "/conciergerie/estimer-mes-revenus" },
  ],
};

// ── Markdown renderer ──────────────────────────────────────────

type Block =
  | { kind: "p"; text: string }
  | { kind: "h2"; text: string }
  | { kind: "h3"; text: string }
  | { kind: "ul"; items: string[] };

function parseMd(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, label, url: string) => {
      // Only render internal links or ERA domain — strip all other external links
      if (!url.startsWith("/") && !url.includes("entre-rhone-alpilles.fr")) return label;
      const isExternal = url.startsWith("http");
      return `<a href="${url}" class="text-[var(--color-rhone)] underline underline-offset-2 hover:opacity-80"${isExternal ? ' target="_blank" rel="noopener noreferrer"' : ""}>${label}</a>`;
    });
}

function toBlocks(content: string[]): Block[] {
  const blocks: Block[] = [];
  let inCode = false;
  for (const raw of content) {
    const t = raw.trim();
    if (t.startsWith("```")) { inCode = !inCode; continue; }
    if (inCode) continue;
    if (!t || t === "---") continue;
    // Skip "Données structurées" heading and anything that looks like JSON
    if (/^##\s+Données structurées/i.test(t)) break;
    if (t.startsWith("## ")) {
      blocks.push({ kind: "h2", text: t.slice(3) });
    } else if (t.startsWith("### ")) {
      blocks.push({ kind: "h3", text: t.slice(4) });
    } else if (t.startsWith("- ") || t.startsWith("* ")) {
      const item = t.slice(2);
      const last = blocks.at(-1);
      if (last?.kind === "ul") last.items.push(item);
      else blocks.push({ kind: "ul", items: [item] });
    } else {
      blocks.push({ kind: "p", text: t });
    }
  }
  return blocks;
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const content = articleContent[slug] ?? [post.excerpt];
  const related = blogPosts.filter((p) => p.slug !== slug).slice(0, 2);
  const links = internalLinks[slug] ?? [];

  const schemaOrg = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Person",
      name: "Entre Rhône et Alpilles",
      url: "https://entre-rhone-alpilles.fr",
    },
    publisher: {
      "@type": "Organization",
      name: "Entre Rhône et Alpilles",
      logo: { "@type": "ImageObject", url: "https://entre-rhone-alpilles.fr/logo.png" },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `https://entre-rhone-alpilles.fr/blog/${slug}` },
    articleSection: post.category,
    inLanguage: "fr-FR",
  };

  return (
    <div className="pt-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }} />

      <div className="bg-[var(--color-cream)] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: "Blog", href: "/blog" }, { label: post.category, href: "/blog" }, { label: post.title }]} />
        </div>
      </div>

      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <header className="mb-10">
          <div className="flex items-center gap-3 text-sm text-gray-500 mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[var(--color-rhone)]/10 text-[var(--color-rhone)] rounded-full font-medium">
              <Tag className="w-3 h-3" aria-hidden="true" />
              {post.category}
            </span>
            <time dateTime={post.date}>{fmtDate(post.date)}</time>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" aria-hidden="true" />
              {post.readTime} min
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-light leading-tight mb-4">
            {post.title}
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed border-l-4 border-[var(--color-or)] pl-5">
            {post.excerpt}
          </p>
        </header>

        {/* Illustration */}
        <div className="aspect-[16/9] bg-gradient-to-br from-[var(--color-cream)] to-[var(--color-alpilles)]/30 rounded-2xl mb-10"
          role="img" aria-label={`Illustration pour "${post.title}"`} />

        {/* Content */}
        <div className="space-y-6">
          {(() => {
            const blocks = toBlocks(content);
            let pCount = 0;
            return blocks.map((block, i) => {
              if (block.kind === "h2") {
                return (
                  <h2 key={i} className="font-serif text-2xl font-light mt-10 mb-3 text-[var(--color-encre)] border-b border-gray-100 pb-2">
                    {block.text}
                  </h2>
                );
              }
              if (block.kind === "h3") {
                return (
                  <h3 key={i} className="font-semibold text-lg mt-6 mb-2 text-gray-800">
                    {block.text}
                  </h3>
                );
              }
              if (block.kind === "ul") {
                return (
                  <ul key={i} className="list-disc list-inside space-y-1.5 text-gray-700 leading-relaxed pl-1">
                    {block.items.map((item, j) => (
                      <li key={j} dangerouslySetInnerHTML={{ __html: parseMd(item) }} />
                    ))}
                  </ul>
                );
              }
              pCount += 1;
              const showCta = pCount === 3 && blocks.length > 5;
              return (
                <Fragment key={i}>
                  <p className="text-gray-700 leading-relaxed text-base"
                    dangerouslySetInnerHTML={{ __html: parseMd(block.text) }} />
                  {showCta && (
                    <div className="my-8 p-6 bg-[var(--color-cream)] rounded-xl border-l-4 border-[var(--color-or)] flex flex-col sm:flex-row sm:items-center gap-4">
                      <div className="flex-1">
                        <p className="font-serif text-lg font-light mb-1">Quel revenu peut générer votre bien ?</p>
                        <p className="text-sm text-gray-600">Estimez gratuitement en 2 minutes avec notre simulateur.</p>
                      </div>
                      <Link href="/conciergerie/estimer-mes-revenus"
                        className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-3 bg-[var(--color-rhone)] text-white text-sm font-semibold rounded-lg hover:bg-[var(--color-rhone-light)] transition-colors whitespace-nowrap">
                        Simuler mes revenus <ArrowRight className="w-4 h-4" aria-hidden="true" />
                      </Link>
                    </div>
                  )}
                </Fragment>
              );
            });
          })()}
        </div>

        {/* Internal links */}
        {links.length > 0 && (
          <div className="mt-10 p-6 bg-[var(--color-cream)] rounded-xl border border-[var(--color-gres-clair)]">
            <p className="font-serif text-lg font-light mb-4 text-[var(--color-encre)]">Pour aller plus loin</p>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}
                    className="inline-flex items-center gap-2 text-sm text-[var(--color-rhone)] hover:text-[var(--color-rhone-dark)] transition-colors font-medium">
                    <ArrowRight className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Author */}
        <div className="mt-12 pt-8 border-t border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[var(--color-rhone)] text-white flex items-center justify-center font-serif font-bold text-lg">
            E
          </div>
          <div>
            <p className="font-semibold text-gray-900">Équipe Entre Rhône et Alpilles</p>
            <p className="text-sm text-gray-500">Conciergerie & Experts locaux en Provence</p>
          </div>
        </div>

        {/* Share */}
        <div className="mt-8 p-5 bg-[var(--color-cream)] rounded-xl">
          <p className="text-sm font-semibold text-gray-700 mb-3">Partager cet article</p>
          <div className="flex gap-3">
            <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://entre-rhone-alpilles.fr/blog/${slug}`)}`}
              target="_blank" rel="noopener noreferrer"
              className="px-4 py-2 bg-black text-white text-xs font-medium rounded-lg hover:opacity-80 transition-opacity">
              X (Twitter)
            </a>
            <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://entre-rhone-alpilles.fr/blog/${slug}`)}`}
              target="_blank" rel="noopener noreferrer"
              className="px-4 py-2 bg-blue-600 text-white text-xs font-medium rounded-lg hover:opacity-80 transition-opacity">
              Facebook
            </a>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-10 p-8 bg-[var(--color-rhone)] rounded-xl text-center text-white">
          <p className="font-serif text-xl font-light mb-3">Vous êtes propriétaire en Provence ?</p>
          <p className="text-white/80 text-sm mb-6">Confiez la gestion de votre bien et maximisez vos revenus locatifs.</p>
          <Link href="/conciergerie/estimer-mes-revenus"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-or)] text-white font-semibold rounded-lg hover:bg-[var(--color-or-light)] transition-colors">
            Estimation gratuite <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </article>

      {/* Related articles */}
      {related.length > 0 && (
        <section className="py-16 bg-[var(--color-cream)]" aria-labelledby="related-heading">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 id="related-heading" className="font-serif text-2xl font-light mb-8">Articles liés</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {related.map((p) => <BlogCard key={p.slug} post={p} />)}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
