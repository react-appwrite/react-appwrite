import type { Models } from 'appwrite'
import { AppwriteNextMiddleware, AppwriteServerConfiguration } from './types'

const notAuthorizedResponse = () => {
  const response = new Response('Unauthorized', {
    status: 401,
  })

  return response
}

export async function getAccount<Preferences extends Models.Preferences>(configuration: AppwriteServerConfiguration, token: string) {
  try {
    const response = await fetch(`${configuration.url}/account`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        Cookie: `a_session_test_legacy=${token}`,
        'x-appwrite-project': configuration.projectId,
      },
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

export function createMiddleware<Preferences extends Models.Preferences>(configuration: AppwriteServerConfiguration): AppwriteNextMiddleware<Preferences> {
  return handler => {
    return async request => {
      const token = request.cookies.get('a_session_test_legacy')?.value

      if (!token) {
        return notAuthorizedResponse()
      }

      try {
        const account = await getAccount<Preferences>(configuration, token)

        if (!account) {
          return notAuthorizedResponse()
        }

        request.account = account

        return handler(request)
      }

      catch (error) {
        console.error(error)

        return notAuthorizedResponse()
      }
    }
  }
}

export * from './types'