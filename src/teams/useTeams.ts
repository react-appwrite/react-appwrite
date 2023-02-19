'use client'

import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useContext, useMemo } from 'react'
import { useAppwrite } from '..'
import { useAccount } from 'react-appwrite-hooks/account'

/**
 * All teams the local user is a member of.
 */
export function useTeams() {
  const { teams } = useAppwrite()
  const { data: account } = useAccount()
  const queryClient = useQueryClient()
  const queryKey = useMemo(() => ['appwrite', 'teams'], [])
  const queryResult = useQuery({
    enabled: !!account,
    queryKey,
    queryFn: async () => {
      const response = await teams.list()

      return response.teams
    },

    onSuccess: teams => {
      for (const team of teams) {
        queryClient.setQueryData(['appwrite', 'teams', team.$id], team)
      }
    },
  })

  return queryResult
}