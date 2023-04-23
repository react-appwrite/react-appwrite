import type { Models } from 'appwrite'
import type { ReadonlyRequestCookies } from 'next/dist/server/app-render'
import type { RequestCookies } from 'next/dist/server/web/spec-extension/cookies'
import type { AppwriteNextMiddlewareHandler, AppwriteServerConfiguration } from './types'

export * from './types'

export class AppwriteNextServer {
  private configuration: AppwriteServerConfiguration

  constructor(configuration: AppwriteServerConfiguration) {
    this.configuration = configuration
  }

  authMiddleware<Preferences extends Models.Preferences>(
    handler: AppwriteNextMiddlewareHandler<Preferences>
  ): AppwriteNextMiddlewareHandler<Preferences> {
    return async request => {
      const cookieName = `a_session_${this.configuration.projectId.toLowerCase()}_legacy`
      const token = request.cookies.get(cookieName)?.value

      if (!token) {
        return handler(request)
      }

      try {
        const account = await this.getUser<Preferences>(request.cookies)

        request.user = account || undefined

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
      const cookieName = `a_session_${this.configuration.projectId.toLowerCase()}_legacy`
      const token = cookies.get(cookieName)?.value ?? ''
      const response = await fetch(`${this.configuration.url}/account`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          Cookie: `${cookieName}=${token}`,
          'x-appwrite-project': this.configuration.projectId,
        },

        cache: 'no-store',
      })

      const json = await response.json() as any

      if (json.code) {
        return null
      }

      return json as Models.User<Preferences>
    }

    catch (error) {
      return null
    }
  }
}