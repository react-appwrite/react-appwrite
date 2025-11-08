import { useAppwrite } from '../index'
import { useQuery } from '@tanstack/react-query'
import type { Models, AppwriteException } from 'appwrite'

export type Props = {
  queries?: string[],
}

export function useListTablesTransactions({ queries }: Props) {
  const { tablesDB } = useAppwrite()

  return useQuery<Models.TransactionList, AppwriteException>({
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
