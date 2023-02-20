import { NextResponse } from 'next/server'
import { appwrite } from './util'

export const middleware = appwrite.userMiddleware(request => {
  if (!request.user) {
    return new Response('Unauthorized', {
      status: 401,
    })
  }

  return NextResponse.next()
})

export const config = {
  matcher: []
}