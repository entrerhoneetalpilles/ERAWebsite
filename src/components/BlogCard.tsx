import Link from "next/link";
import { Clock } from "lucide-react";
import type { BlogPost } from "@/lib/data";
import { formatDate } from "@/lib/utils";

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
      <Link href={`/blog/${post.slug}`} className="block relative aspect-[16/9] overflow-hidden">
        <div
          className="w-full h-full bg-gradient-to-br from-[var(--color-cream)] to-[var(--color-alpilles)]/30 group-hover:scale-105 transition-transform duration-500"
          style={post.image ? { backgroundImage: `url(${post.image})`, backgroundSize: "cover", backgroundPosition: "center" } : {}}
          role="img"
          aria-label={`Illustration pour "${post.title}"`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <span className="absolute bottom-3 left-3 inline-flex items-center px-2.5 py-1 bg-white/90 text-[var(--color-rhone)] text-xs font-medium rounded-full backdrop-blur-sm">
          {post.category}
        </span>
      </Link>

      <div className="p-5">
        <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" aria-hidden="true" />
            {post.readTime} min
          </span>
        </div>

        <Link href={`/blog/${post.slug}`}>
          <h3 className="font-serif text-base font-semibold text-gray-900 group-hover:text-[var(--color-rhone)] transition-colors leading-snug mb-2">
            {post.title}
          </h3>
        </Link>

        <p className="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-2">
          {post.excerpt}
        </p>

        <Link
          href={`/blog/${post.slug}`}
          className="text-xs font-medium text-[var(--color-rhone)] hover:text-[var(--color-rhone-light)] transition-colors inline-flex items-center gap-1 uppercase"
          style={{ letterSpacing: "0.06em" }}
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
