import { useAppwrite } from '../index'
import type { Models } from 'appwrite'
import { useMutation } from '@tanstack/react-query'

type Props<Preferences extends Models.Preferences = Models.DefaultPreferences> = {
  teamId: string,
  prefs: Preferences,
}

export function useUpdateTeamPrefs<
  Preferences extends Models.Preferences = Models.DefaultPreferences
>() {
  const { teams } = useAppwrite()

  return useMutation({
    mutationFn: ({ teamId, prefs }: Props<Preferences>) => {
      return teams.updatePrefs<Preferences>({
        teamId,
        prefs,
      })
    },
  })
}
