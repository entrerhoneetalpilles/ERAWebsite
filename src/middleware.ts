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

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const destination = PERMANENT_REDIRECTS[path];
  if (destination) {
    return NextResponse.redirect(new URL(destination, request.url), { status: 301 });
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
  ],
};
