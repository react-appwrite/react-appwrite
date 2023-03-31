'use client'

import { useMutation } from '@tanstack/react-query'
import { useAppwrite } from 'react-appwrite'

type Props = {
  teamId: string,
  email: string,
  roles: string[],
  url: string,
  name?: string
}

/**
 * Invite a new member to join your team.
 * @link [Appwrite Documentation](https://appwrite.io/docs/client/teams?sdk=web-default#teamsCreateMembership)
 */
export function useTeamCreateMembership() {

  const { teams } = useAppwrite()
  const mutation = useMutation<{}, unknown, Props, unknown>({
    mutationFn: async ({ teamId, email, roles, url, name }) => {
      return teams.createMembership(teamId, email, roles, url, name)
    },
  })

  return mutation
}
