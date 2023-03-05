'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Models } from 'appwrite'
import { useAppwrite } from 'react-appwrite-hooks'
import type { OAuth2Provider } from './types'

type TRequest = {
  provider: OAuth2Provider,
  successUrl: string,
  failureUrl: string,
  scopes?: string[],
}

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
