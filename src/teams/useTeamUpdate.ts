'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Models } from 'appwrite'
import { useAppwrite } from 'react-appwrite'

type Props = {
  teamId: string,
  name: string,
}

/**
 * Update team
 * @link [Appwrite Documentation](https://appwrite.io/docs/client/teams?sdk=web-default#teamsUpdate)
 */
export function useTeamUpdate() {
  const queryClient = useQueryClient()
  const { teams } = useAppwrite()
  const mutation = useMutation<Models.Team, unknown, Props, unknown>({
    mutationFn: async ({ teamId, name }) => {
      return teams.update(teamId, name)
    },

    onSuccess: async (team) => {
      queryClient.setQueryData(['appwrite', 'teams', team.$id], team)
    }
  })

  return mutation
}
