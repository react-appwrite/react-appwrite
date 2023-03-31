'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Models } from 'appwrite'
import { useAppwrite } from 'react-appwrite'

type Props = {
  teamId: string,
}

/**
 * Delete a team
 * @link [Appwrite Documentation](https://appwrite.io/docs/client/teams?sdk=web-default#teamsDelete)
 */
export function useTeamDelete() {

  const queryClient = useQueryClient();
  const { teams } = useAppwrite()
  const mutation = useMutation<{}, unknown, Props, unknown>({
    mutationFn: async ({ teamId }) => {
      return teams.delete(teamId)
    },

    onSuccess: async ({},{teamId}) => {
      const previousTeams = queryClient.getQueryData<Models.Team[]>(['appwrite', 'teams'])
      previousTeams?.splice(previousTeams.findIndex((team) => team.$id === teamId), 1)
      queryClient.setQueryData(['appwrite', 'teams'], previousTeams)
    }
  })

  return mutation
}
