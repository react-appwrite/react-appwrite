import { useAppwrite } from '../index'
import { useMutation } from '@tanstack/react-query'
import type { AuthenticatorType } from 'appwrite'

export type Props = {
  type: AuthenticatorType,
  otp: string,
}

export function useUpdateMfaAuthenticator() {
  const { account } = useAppwrite()

  return useMutation({
    mutationFn: ({ type, otp }: Props) => account.updateMFAAuthenticator({
      type,
      otp,
    }),
  })
}
