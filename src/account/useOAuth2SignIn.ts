'use client'

import { useMutation } from '@tanstack/react-query'
import { useAppwrite } from 'react-appwrite'
import type { OAuth2Provider } from './types'

type TRequest = {
  provider: OAuth2Provider,
  successUrl: string,
  failureUrl: string,
  scopes?: string[],
}

/**
 * Create Oauth2 session using one of the OAuth2 providers
 * @link [Appwrite Documentation](https://appwrite.io/docs/client/account?sdk=web-default#accountCreateOAuth2Session)
 */
function useOAuth2SignIn() {
  const { account } = useAppwrite()
  const mutation = useMutation<void | URL, unknown, TRequest, unknown>({
    mutationFn: async request => {
      return account.createOAuth2Session(request.provider, request.successUrl, request.failureUrl, request.scopes)
    },
  })

  return mutation
}

export { useOAuth2SignIn }
