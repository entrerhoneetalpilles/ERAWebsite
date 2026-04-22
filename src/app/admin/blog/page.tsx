import type { Metadata } from "next";
import AdminBlogClient from "./AdminBlogClient";
import { blogPosts } from "@/lib/data";

export const metadata: Metadata = {
  title: "Admin — Gérer le blog ERA",
  robots: { index: false, follow: false },
};

export default function AdminBlogPage() {
  return <AdminBlogClient initialPosts={blogPosts} />;
}
