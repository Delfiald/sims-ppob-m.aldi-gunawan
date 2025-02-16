import { NextResponse } from "next/server";

export function middleware(req) {
 const token = req.cookies.get("authToken");
 const { pathname } = req.nextUrl;

 if (!token) {
  if (pathname === "/login" || pathname === "/registration") {
   return NextResponse.next();
  }
  return NextResponse.redirect(new URL("/login", req.url));
 }

 if (token && (pathname === "/login" || pathname === "/registration")) {
  return NextResponse.redirect(new URL("/", req.url));
 }

 return NextResponse.next();
}

export const config = {
 matcher: [
  "/",
  "/transaction/:path*",
  "/topup/:path*",
  "/purchase/:path*",
  "/account/:path*",
  "/login",
  "/registration",
 ],
};
