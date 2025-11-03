import { useAppwrite } from '../index'
import type { Models } from 'appwrite'
import { useQuery } from '@tanstack/react-query'

export type Props = {
  databaseId: string,
  tableId: string,
  queries?: string[],
  transactionId?: string,
}

export function useListRows<
  Row extends Models.Row = Models.DefaultRow
>({ databaseId, tableId, queries, transactionId }: Props) {
  const { tablesDB } = useAppwrite()

  return useQuery({
    queryFn: () => {
      return tablesDB.listRows<Row>({
        databaseId,
        tableId,
        queries,
        transactionId,
      })
    },

    queryKey: ['appwrite', 'tablesDB', 'listRows', {
      databaseId,
      tableId,
      queries,
      transactionId,
    }],
  })
}
