'use client'

import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { useAppwrite } from 'react-appwrite'

/**
 * Access to a team by its ID.
 * @param teamId Team ID
 * @link [Appwrite Documentation](https://appwrite.io/docs/client/teams?sdk=web-default#teamsGet)
 */
export function useTeam(teamId: string) {
  const { teams } = useAppwrite()
  const queryKey = useMemo(() => ['appwrite', 'teams', teamId], [teamId])
  const queryResult = useQuery({
    queryKey,
    queryFn: async ({ queryKey: [, , teamId] }) => {
      return await teams.get(teamId)
    },
  })

  return queryResult
}