import { useQuery } from '@tanstack/react-query'
import { useContext, useMemo } from 'react'
import { useAppwrite } from 'react-appwrite-hooks'

export function useTeam(teamId: string) {
  const { teams } = useAppwrite()
  const queryKey = useMemo(() => ['appwrite', 'teams', teamId], [teamId])
  const queryResult = useQuery({
    queryKey,
    queryFn: async () => {
      return await teams.get(teamId)
    },

    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: false,
  })

  return queryResult
}