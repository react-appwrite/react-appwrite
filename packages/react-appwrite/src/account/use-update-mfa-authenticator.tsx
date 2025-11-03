import { useAppwrite } from '../index'
import { useMutation } from '@tanstack/react-query'
import type { AuthenticatorType, Models } from 'appwrite'

export type Props = {
  type: AuthenticatorType,
  otp: string,
}

export function useUpdateMfaAuthenticator<Preferences extends Models.Preferences = Models.DefaultPreferences>() {
  const { account } = useAppwrite()

  return useMutation({
    mutationFn: ({ type, otp }: Props) => account.updateMFAAuthenticator<Preferences>({
      type,
      otp,
    }),
  })
}
