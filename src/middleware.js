import { NextResponse } from "next/server";

export function middleware (req){
  const path = req.nextUrl.pathname
  const isPublicPath =  path === '/signup' || path ===  '/'
  const token = req.cookies.get('token')?.value || ''

  // console.log("Token from cookie:", token);

  if(isPublicPath && token){
    return NextResponse.redirect(new  URL('/home', req.url))
  }
  
  if(!isPublicPath && !token){
    return NextResponse.redirect(new  URL('/', req.url))
  }
}

//list of every route
export const config ={
  matcher:[
    '/',
    '/signup',
    '/home',
    '/profile',
    '/notification',
    '/bookmarks'
  ],
}
