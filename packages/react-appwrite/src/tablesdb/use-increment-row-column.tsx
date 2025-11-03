import { useAppwrite } from '../index'
import { useMutation } from '@tanstack/react-query'

export type Props = {
  databaseId: string,
  tableId: string,
  rowId: string,
  column: string,
  value?: number,
  max?: number,
  transactionId?: string,
}

export function useIncrementRowColumn() {
  const { tablesDB } = useAppwrite()

  return useMutation({
    mutationFn: ({ databaseId, tableId, rowId, column, value, max, transactionId }: Props) => {
      return tablesDB.incrementRowColumn({
        databaseId,
        tableId,
        rowId,
        column,
        value,
        max,
        transactionId,
      })
    },
  })
}
