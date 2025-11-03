import { useAppwrite } from '../index'
import type { Models } from 'appwrite'
import { useMutation } from '@tanstack/react-query'

export type Props = {
  email: string,
  password: string,
}

export function useUpdateEmail<Preferences extends Models.Preferences = Models.DefaultPreferences>() {
  const { account } = useAppwrite()

  return useMutation({
    mutationFn: ({ email, password }: Props) => account.updateEmail<Preferences>({
      email,
      password,
    }),
  })
}
