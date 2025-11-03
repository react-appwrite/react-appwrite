import { useAppwrite } from '../index'
import type { Models } from 'appwrite'
import { useQuery } from '@tanstack/react-query'

type Props = {
  queries?: string[],
  search?: string,
}

export function useListTeams<
  Preferences extends Models.Preferences = Models.DefaultPreferences
>({ queries, search }: Props) {
  const { teams } = useAppwrite()

  return useQuery({
    queryFn: () => {
      return teams.list<Preferences>({
        queries,
        search,
      })
    },

    queryKey: ['appwrite', 'teams', 'list', {
      queries,
      search,
    }],
  })
}
