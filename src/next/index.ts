import { AppwriteNextMiddlewareConfiguration, AppwriteNextMiddlewareHandler, AppwriteNextMiddleware } from './types'
import type { Models } from 'appwrite'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

const notAuthorizedResponse = () => {
  const response = new Response('Unauthorized', {
    status: 401,
  })

  return response
}

export function createMiddleware<Preferences extends Models.Preferences>(configuration: AppwriteNextMiddlewareConfiguration): AppwriteNextMiddleware<Preferences> {
  return handler => {
    return async request => {
      const appwriteToken = request.cookies.get('a_session_test_legacy')?.value

      if (!appwriteToken) {
        return notAuthorizedResponse()
      }

      try {
        const decodedToken = JSON.parse(atob(appwriteToken))
        const userId = decodedToken.id as string

        const response = await fetch(`${configuration.url}/account`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            Cookie: `a_session_test_legacy=${appwriteToken}`,
            'x-appwrite-project': configuration.projectId,
          },
        })

        request.account = await response.json() as Models.Account<never>

        return handler(request)
      }

      catch (error) {
        return notAuthorizedResponse()
      }
    }
  }
}