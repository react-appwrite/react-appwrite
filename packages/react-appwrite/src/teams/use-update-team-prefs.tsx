import { type AppwriteMutationOptions, useAppwrite } from '../index'
import type { Models, AppwriteException } from 'appwrite'
import { useMutation } from '@tanstack/react-query'

type Props<Preferences extends Models.Preferences = Models.DefaultPreferences> = {
  teamId: string,
  prefs: Preferences,
}

export function useUpdateTeamPrefs<
  Preferences extends Models.Preferences = Models.DefaultPreferences
>(options: AppwriteMutationOptions<Preferences, Props<Preferences>>) {
  const { teams } = useAppwrite()

  return useMutation<Preferences, AppwriteException, Props<Preferences>>({
    mutationFn: ({ teamId, prefs }) => {
      return teams.updatePrefs<Preferences>({
        teamId,
        prefs,
      })
    },

    ...options,
  })
}