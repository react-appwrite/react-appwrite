import { useQuery } from '@tanstack/react-query'
import { useContext, useMemo } from 'react'
import { useAccount } from '../account'
import { AppwriteContext } from '../context'

/**
 * All teams the local user is a member of.
 */
export function useTeams() {
  const { teams } = useContext(AppwriteContext)
  const { data: account } = useAccount()
  const queryKey = useMemo(() => ['appwrite', 'teams'], [])
  const queryResult = useQuery({
    enabled: !!account,
    queryKey,
    select: response => response.teams,
    queryFn: async () => {
      return await teams.list()
    },

    refetchOnMount: false,
    refetchOnWindowFocus: false,
  })

  return queryResult
}