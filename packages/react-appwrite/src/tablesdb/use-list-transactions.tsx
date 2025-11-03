import { useAppwrite } from '../index'
import { useQuery } from '@tanstack/react-query'

export type Props = {
  queries?: string[],
}

export function useListTablesTransactions({ queries }: Props) {
  const { tablesDB } = useAppwrite()

  return useQuery({
    queryFn: () => {
      return tablesDB.listTransactions({
        queries,
      })
    },

    queryKey: ['appwrite', 'tablesDB', 'listTransactions', {
      queries,
    }],
  })
}
