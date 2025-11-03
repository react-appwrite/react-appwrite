import { useAppwrite } from '../index'
import { useMutation } from '@tanstack/react-query'
import type { OAuthProvider } from 'appwrite'

export type Props = {
  provider: OAuthProvider,
  success?: string,
  failure?: string,
  scopes?: string[],
}

export function useCreateOAuth2Session() {
  const { account } = useAppwrite()

  return useMutation({
    mutationFn: ({ provider, success, failure, scopes }: Props) => {
      const session = account.createOAuth2Session({
        provider,
        success,
        failure,
        scopes,
      })

      if (!session) {
        return Promise.resolve(null)
      }

      return Promise.resolve(session)
    },
  })
}
