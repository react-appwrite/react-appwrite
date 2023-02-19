import { NextResponse } from 'next/server'
import { createMiddleware } from 'react-appwrite-hooks/next'
import { appwriteMiddleware } from './util'

export const middleware = appwriteMiddleware(request => {
  return NextResponse.json(request.account)
})

export const config = {
  matcher: []
}