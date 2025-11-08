import { useAppwrite } from '../index'
import type { Models, AppwriteException } from 'appwrite'
import { useQuery } from '@tanstack/react-query'

export type Props = {
  databaseId: string,
  tableId: string,
  rowId: string,
  queries?: string[],
  transactionId?: string,
}

export function useGetRow<
  Row extends Models.Row = Models.DefaultRow
>({ databaseId, tableId, rowId, queries, transactionId }: Props) {
  const { tablesDB } = useAppwrite()

  return useQuery<Row, AppwriteException, Props>({
    queryFn: () => {
      return tablesDB.getRow<Row>({
        databaseId,
        tableId,
        rowId,
        queries,
        transactionId,
      })
    },

    queryKey: ['appwrite', 'tablesDB', 'getRow', {
      databaseId,
      tableId,
      rowId,
      queries,
      transactionId,
    }],
  })
}
