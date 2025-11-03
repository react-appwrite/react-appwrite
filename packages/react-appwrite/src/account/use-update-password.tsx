import { useAppwrite } from '../index'
import type { Models } from 'appwrite'
import { useMutation } from '@tanstack/react-query'

export type Props = {
  password: string,
  oldPassword?: string,
}

export function useUpdatePassword<Preferences extends Models.Preferences = Models.DefaultPreferences>() {
  const { account } = useAppwrite()

  return useMutation({
    mutationFn: ({ password, oldPassword }: Props) => account.updatePassword<Preferences>({
      password,
      oldPassword,
    }),
  })
}
