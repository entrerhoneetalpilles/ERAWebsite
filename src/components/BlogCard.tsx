import Image from "next/image";
import Link from "next/link";
import { Clock } from "lucide-react";
import type { BlogPost } from "@/lib/data";
import { formatDate } from "@/lib/utils";

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <article
      className="group bg-white rounded-xl overflow-hidden border shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
      style={{ borderColor: "var(--color-gres-clair)" }}
    >
      <Link href={`/blog/${post.slug}`} className="block relative aspect-[16/9] overflow-hidden" title={post.title}>
        {post.image ? (
          <Image
            src={post.image}
            alt={`Illustration pour "${post.title}"`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div
            className="w-full h-full bg-gradient-to-br from-[var(--color-cream)] to-[var(--color-alpilles)]/30 group-hover:scale-105 transition-transform duration-500"
            role="img"
            aria-label={`Illustration pour "${post.title}"`}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <span
          className="absolute bottom-3 left-3 inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-full backdrop-blur-sm"
          style={{ background: "rgba(255,255,255,0.92)", color: "var(--color-rhone-dark)" }}
        >
          {post.category}
        </span>
      </Link>

      <div className="p-5">
        <div className="flex items-center gap-3 text-xs mb-3" style={{ color: "var(--texte-discret)" }}>
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" aria-hidden="true" />
            {post.readTime} min
          </span>
        </div>

        <Link href={`/blog/${post.slug}`} title={post.title}>
          <h3
            className="font-serif font-normal text-base text-[var(--color-encre)] group-hover:text-[var(--color-rhone-dark)] transition-colors leading-snug mb-2"
          >
            {post.title}
          </h3>
        </Link>

        <p className="text-sm leading-relaxed mb-4 line-clamp-2" style={{ color: "var(--texte-leger)" }}>
          {post.excerpt}
        </p>

        <Link
          href={`/blog/${post.slug}`}
          className="text-xs font-medium transition-colors inline-flex items-center gap-1 uppercase"
          style={{ color: "var(--color-rhone-dark)", letterSpacing: "0.06em" }}
          title={`Lire l'article : ${post.title}`}
        >
          Lire l&apos;article
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </article>
  );
}
