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
export function useTeamDelete<Preferences extends Models.Preferences>() {
  const queryClient = useQueryClient()
  const { teams } = useAppwrite()
  const mutation = useMutation<unknown, unknown, Props, unknown>({
    mutationFn: async ({ teamId }) => {
      return teams.delete(teamId)
    },

    onSuccess: async (_, { teamId }) => {
      queryClient.setQueryData<Models.Team<Preferences>[]>(['appwrite', 'teams'], previousTeams => {
        previousTeams?.splice(previousTeams.findIndex((team) => team.$id === teamId), 1)
        return previousTeams
      })
    }
  })

  return mutation
}