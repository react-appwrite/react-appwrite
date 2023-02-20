'use client'

import { useQuery } from '@tanstack/react-query'
import { useContext, useEffect, useMemo } from 'react'
import { useAppwrite } from 'react-appwrite-hooks'

export function useTeamMembers(teamId: string) {
  const { teams } = useAppwrite()
  const queryKey = useMemo(() => ['appwrite', 'teams', teamId, 'members'], [teamId])
  const queryResult = useQuery({
    queryKey,
    queryFn: async () => {
      const response = await teams.listMemberships(teamId)

      return response.memberships
    },
  })

  useEffect(() => {
    const unsubscribe = teams.client.subscribe('teams.*', response => {
      console.log({ response })
    })

    return unsubscribe
  }, [])

  return queryResult
}