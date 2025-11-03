import { useAppwrite } from '../index'
import { useMutation } from '@tanstack/react-query'
import type { OAuthProvider } from 'appwrite'

export type Props = {
  provider: OAuthProvider,
  success?: string,
  failure?: string,
  scopes?: string[],
}

export function useCreateOAuth2Token() {
  const { account } = useAppwrite()

  return useMutation({
    mutationFn: ({ provider, success, failure, scopes }: Props) => {
      const token = account.createOAuth2Token({
        provider,
        success,
        failure,
        scopes,
      })

      if (!token) {
        return Promise.resolve(null)
      }

      return Promise.resolve(token)
    },
  })
}
