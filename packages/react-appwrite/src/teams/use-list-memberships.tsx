import { useAppwrite } from '../index'
import { useQuery } from '@tanstack/react-query'

type Props = {
  teamId: string,
  queries?: string[],
  search?: string,
}

export function useListMemberships({ teamId, queries, search }: Props) {
  const { teams } = useAppwrite()

  return useQuery({
    queryFn: () => {
      return teams.listMemberships({
        teamId,
        queries,
        search,
      })
    },

    queryKey: ['appwrite', 'teams', 'listMemberships', {
      teamId,
      queries,
      search,
    }],
  })
}
