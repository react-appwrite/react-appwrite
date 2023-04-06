'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ID, Models } from 'appwrite'
import { useAppwrite } from 'react-appwrite'

type Props = {
  teamId?: string,
  name: string,
  roles?: string[],
}

/**
 * Create a new Team
 * @link [Appwrite Documentation](https://appwrite.io/docs/client/teams?sdk=web-default#teamsCreate)
 */
export function useTeamCreate() {
  const queryClient = useQueryClient()
  const { teams } = useAppwrite()
  const mutation = useMutation<Models.Team, unknown, Props, unknown>({
    mutationFn: async ({ teamId, name, roles }) => {
      return teams.create(teamId ?? ID.unique(), name, roles)
    },

    onSuccess: async (team) => {
      queryClient.setQueryData<Models.Team[]>(['appwrite', 'teams'], (previousTeams) => {
        if (previousTeams) {
          return [...previousTeams, team]
        }

        return [team]
      })
    }
  })

  return mutation
}
