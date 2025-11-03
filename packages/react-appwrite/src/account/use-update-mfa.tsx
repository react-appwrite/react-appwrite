import { useAppwrite } from '../index'
import type { Models } from 'appwrite'
import { useMutation } from '@tanstack/react-query'

export type Props = {
  mfa: boolean,
}

export function useUpdateMfa<Preferences extends Models.Preferences = Models.DefaultPreferences>() {
  const { account } = useAppwrite()

  return useMutation({
    mutationFn: ({ mfa }: Props) => account.updateMFA<Preferences>({
      mfa,
    }),
  })
}
