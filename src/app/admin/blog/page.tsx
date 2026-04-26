import type { Metadata } from "next";
import { cookies } from "next/headers";
import AdminBlogClient from "./AdminBlogClient";
import { blogPosts } from "@/lib/data";

export const metadata: Metadata = {
  title: "Admin — Gérer le blog ERA",
  robots: { index: false, follow: false },
};

export default async function AdminBlogPage() {
  const cookieStore = await cookies();
  const isAuthenticated = cookieStore.get("era_admin_token")?.value === "1";
  return <AdminBlogClient initialPosts={blogPosts} isAuthenticated={isAuthenticated} />;
}
