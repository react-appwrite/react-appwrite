import { useAppwrite } from '../index'
import { ID, type Models } from 'appwrite'
import { useMutation } from '@tanstack/react-query'

export type Props = {
  userId?: string,
  email: string,
  password: string,
  name?: string,
}

export function useCreateAccount<
  Preferences extends Models.Preferences = Models.DefaultPreferences
>() {
  const { account } = useAppwrite()

  return useMutation({
    mutationFn: ({ userId, email, password, name }: Props) => {
      return account.create<Preferences>({
        userId: userId ?? ID.unique(),
        email,
        password,
        name,
      })
    },
  })
}