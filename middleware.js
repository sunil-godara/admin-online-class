import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { logger } from "./utils/logger";
// import { isSessionValid } from "./utils/helpers";

// Optimize how we handle large headers
export const middleware = async request => {
  const pathname = request.nextUrl.pathname;

  // Get token with optimized configuration
  const session = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET
  });

  if (!session) {
    await logger("Session expired or no session found");

    return NextResponse.redirect(
      new URL(
        `/account/login?redirectTo=${encodeURIComponent(pathname)}`,
        request.url
      )
    );
  }

  try {
    return NextResponse.next();
  } catch (error) {
    console.error("Error in middleware:", error);
    await logger(error.stack || error);
    return NextResponse.redirect(new URL("/admin/500", request.url));
  }
};

export const config = {
  matcher: [
    "/api/email-templates/:path*",
    "/api/site-setting/:path*",
    "/api/user-management/:path*",
    "/email-template-management/:path*",
    "/site-setting/:path*",
    "/user-management/:path*"
  ]
};
