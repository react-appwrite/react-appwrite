import { useAppwrite } from '../index'
import type { Models } from 'appwrite'
import { useMutation } from '@tanstack/react-query'

type Props = {
  teamId: string,
  name: string,
}

export function useUpdateTeamName<
  Preferences extends Models.Preferences = Models.DefaultPreferences
>() {
  const { teams } = useAppwrite()

  return useMutation({
    mutationFn: ({ teamId, name }: Props) => {
      return teams.updateName<Preferences>({
        teamId,
        name,
      })
    },
  })
}
