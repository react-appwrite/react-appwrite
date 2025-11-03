import { useAppwrite } from '../index'
import type { Models } from 'appwrite'
import { useQuery } from '@tanstack/react-query'

type Props = {
  teamId: string,
}

export function useGetTeamPrefs<
  Preferences extends Models.Preferences = Models.DefaultPreferences
>({ teamId }: Props) {
  const { teams } = useAppwrite()

  return useQuery({
    queryFn: () => {
      return teams.getPrefs<Preferences>({
        teamId,
      })
    },

    queryKey: ['appwrite', 'teams', 'getPrefs', {
      teamId,
    }],
  })
}
