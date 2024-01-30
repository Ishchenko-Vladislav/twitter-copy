import { withAuth, NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  async function middleware(req: NextRequestWithAuth) {
    const token = req.nextauth.token;
    const pathname = req.nextUrl.pathname;
    if (pathname === "/profile" && !!token) {
      return NextResponse.redirect(new URL("/" + token.sub, req.url));
    }
    if (!!token && (pathname.startsWith("/login") || pathname.startsWith("/register"))) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    // // if()
    // console.log("MIDDLEWAARE t", pathname);
    return NextResponse.next();
  },
  {
    pages: {
      signIn: "/login",
      error: "/error",
    },
    secret: process.env.NEXTAUTH_JWT_SECRET,
    callbacks: {
      authorized: async ({ req, token }) => {
        const pathname = req.nextUrl.pathname;
        if (pathname === "/login" || pathname === "/register") return true;

        return !!token;
      },
    },
  }
);
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
