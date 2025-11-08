import { useAppwrite } from '../index'
import type { Models, AppwriteException } from 'appwrite'
import { useQuery } from '@tanstack/react-query'

type Props = {
  teamId: string,
}

export function useGetTeam<
  Preferences extends Models.Preferences = Models.DefaultPreferences
>({ teamId }: Props) {
  const { teams } = useAppwrite()

  return useQuery<Models.Team<Preferences>, AppwriteException>({
    queryFn: () => {
      return teams.get<Preferences>({
        teamId,
      })
    },

    queryKey: ['appwrite', 'teams', 'get', {
      teamId,
    }],
  })
}
