'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Models } from 'appwrite'
import { useAppwrite } from 'react-appwrite'

type Props = {
  teamId: string,
  name: string,
}

/**
 * Rename a team.
 * @link [Appwrite Documentation](https://appwrite.io/docs/client/teams?sdk=web-default#teamsUpdate)
 */
export function useTeamRename<Preferences extends Models.Preferences>() {
  const queryClient = useQueryClient()
  const { teams } = useAppwrite()
  const mutation = useMutation<Models.Team<Preferences>, unknown, Props, unknown>({
    mutationFn: async ({ teamId, name }) => {
      return teams.updateName(teamId, name)
    },

    onSuccess: async (team) => {
      queryClient.setQueryData(['appwrite', 'teams', team.$id], team)
    }
  })

  return mutation
}
