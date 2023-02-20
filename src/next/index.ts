import type { Models } from 'appwrite'
import type { AppwriteNextMiddleware, AppwriteServerConfiguration, AppwriteNextMiddlewareHandler, AppwriteNextHandlerResult } from './types'
import { cookies } from 'next/headers'
import type { RequestCookies } from 'next/dist/server/web/spec-extension/cookies'
import type { ReadonlyRequestCookies } from 'next/dist/server/app-render'
import { NextRequest, NextResponse } from 'next/server'

export * from './types'

export class AppwriteNextServer {
  private configuration: AppwriteServerConfiguration

  constructor(configuration: AppwriteServerConfiguration) {
    this.configuration = configuration
  }

  userMiddleware<Preferences extends Models.Preferences>(
    handler: AppwriteNextMiddlewareHandler<Preferences>
  ): AppwriteNextMiddlewareHandler<Preferences> {
    return async request => {
      const token = request.cookies.get('a_session_test_legacy')?.value

      if (!token) {
        return handler(request)
      }

      try {
        const account = await this.getUser<Preferences>(request.cookies)

        if (!account) {
          return handler(request)
        }

        request.user = account

        return handler(request)
      }

      catch (error) {
        console.error(error)

        return handler(request)
      }
    }
  }

  async getUser<Preferences extends Models.Preferences>(cookies: RequestCookies | ReadonlyRequestCookies) {
    try {
      const token = cookies.get('a_session_test_legacy')?.value ?? ''
      const response = await fetch(`${this.configuration.url}/account`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          Cookie: `a_session_test_legacy=${token}`,
          'x-appwrite-project': this.configuration.projectId,
        },

        cache: 'no-store',
      })

      const json = await response.json() as any

      if (json.code) {
        return null
      }

      return json as Models.Account<Preferences>
    }

    catch (error) {
      return null
    }
  }
}