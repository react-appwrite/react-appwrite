import { NextResponse } from 'next/server'
import { appwrite } from './util'

export const middleware = appwrite.authMiddleware(request => {
  return NextResponse.json(request.account)
})

export const config = {
  matcher: []
}