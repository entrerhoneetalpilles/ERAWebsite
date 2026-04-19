import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import BlogCard from "@/components/BlogCard";
import Breadcrumb from "@/components/Breadcrumb";
import NewsletterForm from "@/components/NewsletterForm";
import { blogPosts } from "@/lib/data";

export const metadata: Metadata = {
  title: "Blog — Conseils Conciergerie & Guides Provence",
  description:
    "Conseils pour propriétaires, guides de voyage Provence, actualités du marché locatif. Le blog d'Entre Rhône et Alpilles.",
  alternates: { canonical: "https://entre-rhone-alpilles.fr/blog" },
  openGraph: {
    title: "Blog Provence — Conseils Conciergerie & Guides de Voyage",
    description: "Conseils pour propriétaires, guides Provence, actualités du marché locatif. Le blog d'Entre Rhône et Alpilles.",
    url: "https://entre-rhone-alpilles.fr/blog",
  },
};

const categories = ["Tous", "Conseils propriétaires", "Guides de voyage", "Actualités région"];

export default function BlogPage() {
  return (
    <div className="pt-20">
      <div className="bg-[var(--color-cream)] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: "Blog" }]} />
          <div className="mt-8 max-w-3xl">
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-gray-900 mb-6">Blog & Conseils</h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Conseils pour maximiser vos revenus locatifs, guides de voyage en Provence,
              actualités de la conciergerie et du marché Airbnb.
            </p>
          </div>
        </div>
      </div>

      <section className="py-8 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-3 flex-wrap">
            {categories.map((cat) => (
              <button key={cat}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${cat === "Tous" ? "bg-[var(--color-rhone)] text-white" : "border border-gray-200 text-gray-600 hover:border-[var(--color-rhone)] hover:text-[var(--color-rhone)]"}`}>
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white" aria-labelledby="articles-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="articles-heading" className="sr-only">Articles du blog</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((p) => <BlogCard key={p.slug} post={p} />)}
          </div>
        </div>
      </section>

      <section className="py-16 bg-[var(--color-rhone-dark)]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-2xl font-bold text-white mb-4">Recevez nos conseils chaque mois</h2>
          <p className="text-white/80 mb-8">Newsletter mensuelle : astuces conciergerie, tendances du marché, guides exclusifs.</p>
          <NewsletterForm />
          <p className="text-white/50 text-xs mt-3">Sans engagement · Désinscription en 1 clic · RGPD compliant</p>
        </div>
      </section>
    </div>
  );
}
