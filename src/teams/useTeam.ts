import { useQuery } from '@tanstack/react-query'
import { useContext, useMemo } from 'react'
import { AppwriteContext } from '../context'

export function useTeam(teamId: string) {
  const { teams } = useContext(AppwriteContext)
  const queryKey = useMemo(() => ['appwrite', 'teams', teamId], [teamId])
  const queryResult = useQuery({
    queryKey,
    queryFn: async () => {
      return await teams.get(teamId)
    },

    refetchOnMount: false,
    refetchOnWindowFocus: false,
  })

  return queryResult
}