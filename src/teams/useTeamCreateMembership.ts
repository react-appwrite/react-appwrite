'use client'

import { useMutation } from '@tanstack/react-query'
import { Models } from 'appwrite'
import { useAppwrite } from 'react-appwrite'

type Props = {
  teamId: string,
  email: string,
  roles: string[],
  url: string,
  name?: string,
  userId?: string,
  phone?: string,
}

/**
 * Invite a new member to join your team.
 * @link [Appwrite Documentation](https://appwrite.io/docs/client/teams?sdk=web-default#teamsCreateMembership)
 */
export function useTeamCreateMembership() {
  const { teams } = useAppwrite()
  const mutation = useMutation<Models.Membership, unknown, Props, unknown>({
    mutationFn: async ({ teamId, email, roles, url, name, userId, phone }) => {
      return teams.createMembership(teamId, roles, url, email, userId, phone, name)
    },
  })

  return mutation
}