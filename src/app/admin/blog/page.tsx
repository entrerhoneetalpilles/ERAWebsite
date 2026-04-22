import type { Metadata } from "next";
import AdminBlogClient from "./AdminBlogClient";

export const metadata: Metadata = {
  title: "Admin — Créer un article de blog",
  robots: { index: false, follow: false },
};

export default function AdminBlogPage() {
  return <AdminBlogClient />;
}
