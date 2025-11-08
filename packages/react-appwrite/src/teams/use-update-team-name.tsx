import { useAppwrite } from '../index'
import type { Models, AppwriteException } from 'appwrite'
import { useMutation } from '@tanstack/react-query'

type Props = {
  teamId: string,
  name: string,
}

export function useUpdateTeamName<
  Preferences extends Models.Preferences = Models.DefaultPreferences
>() {
  const { teams } = useAppwrite()

  return useMutation<Models.Team<Preferences>, AppwriteException, Props>({
    mutationFn: ({ teamId, name }) => {
      return teams.updateName<Preferences>({
        teamId,
        name,
      })
    },
  })
}