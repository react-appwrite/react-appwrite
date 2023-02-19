import { AppwriteNextMiddlewareConfiguration, AppwriteNextMiddlewareHandler, AppwriteNextMiddleware } from './types'
import appwrite from 'node-appwrite'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { decodeJwt } from 'jose'

export const createMiddleware = (configuration: AppwriteNextMiddlewareConfiguration): AppwriteNextMiddleware => {
  return handler => {
    return request => {
      // @ts-ignore
      const appwriteToken = request.cookies.get('a_session_test_legacy')?.value

      if (appwriteToken) {
        const decodedToken = JSON.parse(atob(appwriteToken))
        const userId = decodedToken.id as string

        console.log({ decodedToken })
      }

      return NextResponse.next()
    }
  }
}