import { useAppwrite } from '../index'
import type { Models } from 'appwrite'
import { useMutation } from '@tanstack/react-query'

export type Props = {
  phone: string,
  password: string,
}

export function useUpdatePhone<Preferences extends Models.Preferences = Models.DefaultPreferences>() {
  const { account } = useAppwrite()

  return useMutation({
    mutationFn: ({ phone, password }: Props) => account.updatePhone<Preferences>({
      phone,
      password,
    }),
  })
}
