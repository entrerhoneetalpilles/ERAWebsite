import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PERMANENT_REDIRECTS: Record<string, string> = {
  "/locations/saint-remy": "/locations/saint-remy-de-provence",
  "/locations/les-baux": "/locations/les-baux-de-provence",
  "/destinations/saint-remy": "/destinations/saint-remy-de-provence",
  "/destinations/les-baux": "/destinations/les-baux-de-provence",
  "/conciergerie/services": "/conciergerie/nos-services",
  "/conciergerie/estimer": "/conciergerie/estimer-mes-revenus",
};

const PROTECTED_API = ["/api/publish-article", "/api/manage-article"];

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // 301 redirects
  const destination = PERMANENT_REDIRECTS[path];
  if (destination) {
    return NextResponse.redirect(new URL(destination, request.url), { status: 301 });
  }

  // Admin API protection — require httpOnly cookie set by Server Action
  if (PROTECTED_API.some((p) => path.startsWith(p))) {
    const token = request.cookies.get("era_admin_token");
    if (!token || token.value !== "1") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }
}

export const config = {
  matcher: [
    "/locations/saint-remy",
    "/locations/les-baux",
    "/destinations/saint-remy",
    "/destinations/les-baux",
    "/conciergerie/services",
    "/conciergerie/estimer",
    "/api/publish-article/:path*",
    "/api/manage-article/:path*",
  ],
};
