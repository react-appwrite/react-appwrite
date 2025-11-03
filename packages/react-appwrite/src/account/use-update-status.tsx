import { useAppwrite } from '../index'
import type { Models } from 'appwrite'
import { useMutation } from '@tanstack/react-query'

export function useUpdateStatus<Preferences extends Models.Preferences = Models.DefaultPreferences>() {
  const { account } = useAppwrite()

  return useMutation({
    mutationFn: () => account.updateStatus<Preferences>(),
  })
}
