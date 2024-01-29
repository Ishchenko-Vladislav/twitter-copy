// export { default } from "next-auth/middleware";

// export const config = { matcher: ["/"] };
import { getServerSession } from "next-auth";
import { getToken } from "next-auth/jwt";
import { withAuth, NextRequestWithAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";
// import { nextAuthOptions } from "./app/api/auth/[...nextauth]/route";
// import type { WithAuthArgs } from "next-auth/middleware";
// export const nextCookieOpts = {
//   // default cookie options
//   sessionToken: {
//     name: `${cookiePrefix}${appName}.session-token`,
//     options: {
//       httpOnly: true,
//       sameSite: "lax",
//       path: "/",
//       secure: useSecureCookies,
//     },
//   },
// }
// export default async function middleware(req: NextRequest) {
//   // const session = await getServerSession(nextAuthOptions);
//   // console.log("MIDDLEWARE", session);
//   return NextResponse.next();
// }
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
    // jwt: { decode: nextAuthOptions.jwt?.decode },
    secret: process.env.NEXTAUTH_JWT_SECRET,
    callbacks: {
      authorized: async ({ req, token }) => {
        const pathname = req.nextUrl.pathname;
        // console.log("MIDDLEWARE WORK TOKEN", token);
        if (pathname === "/login" || pathname === "/register") return true;

        return !!token;
      },
    },
  }
);
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
// export const config = {
//   matcher: ["/", "/login", "/register"],
// };
