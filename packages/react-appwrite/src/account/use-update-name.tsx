import { useAppwrite } from '../index'
import type { Models } from 'appwrite'
import { useMutation } from '@tanstack/react-query'

export type Props = {
  name: string,
}

export function useUpdateName<Preferences extends Models.Preferences = Models.DefaultPreferences>() {
  const { account } = useAppwrite()

  return useMutation({
    mutationFn: ({ name }: Props) => account.updateName<Preferences>({
      name,
    }),
  })
}
