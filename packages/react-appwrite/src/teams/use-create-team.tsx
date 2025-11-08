import { useAppwrite } from '../index'
import { type Models, ID, type AppwriteException } from 'appwrite'
import { useMutation } from '@tanstack/react-query'

type Props = {
  name: string,
  roles?: string[],
  teamId?: string,
}

export function useCreateTeam<
  Preferences extends Models.Preferences = Models.DefaultPreferences
>() {
  const { teams } = useAppwrite()

  return useMutation<Models.Team<Preferences>, AppwriteException, Props>({
    mutationFn: ({ name, roles, teamId }) => {
      return teams.create<Preferences>({
        name,
        roles,
        teamId: teamId ?? ID.unique(),
      })
    },
  })
}