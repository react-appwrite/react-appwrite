import { useAppwrite } from '../index'
import { useMutation } from '@tanstack/react-query'

export type Props = {
  databaseId: string,
  tableId: string,
  rowId: string,
  column: string,
  value?: number,
  min?: number,
  transactionId?: string,
}

export function useDecrementRowColumn() {
  const { tablesDB } = useAppwrite()

  return useMutation({
    mutationFn: ({ databaseId, tableId, rowId, column, value, min, transactionId }: Props) => {
      return tablesDB.decrementRowColumn({
        databaseId,
        tableId,
        rowId,
        column,
        value,
        min,
        transactionId,
      })
    },
  })
}
