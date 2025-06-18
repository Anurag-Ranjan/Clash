import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

const secret = process.env.NEXTAUTH_SECRET;

export const middleware = async (req: NextRequest) => {
  const token = await getToken({ req, secret });
  const isAuth = !!token;
  const url = req.nextUrl;

  const protectedPaths = ["/dashboard"];
  const authPages = ["/login", "/signup"];

  const isProtectedPage = protectedPaths.some((path) =>
    url.pathname.startsWith(path)
  );
  const isAuthPage = authPages.some((path) => url.pathname.startsWith(path));

  if (!isAuth && isProtectedPage) {
    const loginUrl = new URL("/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  if (isAuth && isAuthPage) {
    const dashboardUrl = new URL("/dashboard", req.url);
    return NextResponse.redirect(dashboardUrl);
  }

  return NextResponse.next();
};

export const config = {
  matcher: ["/dashboard", "/login", "/signup"],
};
