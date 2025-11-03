import { useAppwrite } from '../index'
import { useMutation } from '@tanstack/react-query'
import type { AuthenticatorType } from 'appwrite'

export type Props = {
  type: AuthenticatorType,
}

export function useCreateMfaAuthenticator() {
  const { account } = useAppwrite()

  return useMutation({
    mutationFn: ({ type }: Props) => account.createMFAAuthenticator({
      type,
    }),
  })
}
