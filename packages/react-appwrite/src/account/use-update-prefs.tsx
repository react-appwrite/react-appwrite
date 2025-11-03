import { useAppwrite } from '../index'
import type { Models } from 'appwrite'
import { useMutation } from '@tanstack/react-query'

export type Props<Preferences extends Models.Preferences = Models.DefaultPreferences> = {
  prefs: Preferences,
}

export function useUpdateAccountPrefs<
  Preferences extends Models.Preferences = Models.DefaultPreferences
>() {
  const { account } = useAppwrite()

  return useMutation({
    mutationFn: ({ prefs }: Props<Preferences>) => {
      return account.updatePrefs<Preferences>({
        prefs,
      })
    },
  })
}
