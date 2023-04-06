'use client'

import { useQuery } from '@tanstack/react-query'
import { useEffect, useMemo } from 'react'
import { useAppwrite } from 'react-appwrite'

/**
 * Access to list of team members by team ID.
 * @param teamId Team ID
 * @link [Appwrite Documentation](https://appwrite.io/docs/client/teams?sdk=web-default#teamsListMemberships)
 */
export function useTeamMembers(teamId: string) {
  const { teams } = useAppwrite()
  const queryKey = useMemo(
    () => ['appwrite', 'teams', teamId, 'members'],
    [teamId]
  )
  const queryResult = useQuery({
    queryKey,
    queryFn: async ({ queryKey: [, , teamId] }) => {
      const response = await teams.listMemberships(teamId)

      return response.memberships
    },
  })

  useEffect(() => {
    const unsubscribe = teams.client.subscribe(
      `teams.${teamId}`,
      (response) => {
        console.log({ response })
      }
    )

    return unsubscribe
  }, [])

  return queryResult
}
