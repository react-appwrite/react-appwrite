import { useAppwrite } from '../index'
import { useMutation } from '@tanstack/react-query'

export type Props = {
  databaseId: string,
  tableId: string,
  rowId: string,
  transactionId?: string,
}

export function useDeleteRow() {
  const { tablesDB } = useAppwrite()

  return useMutation({
    mutationFn: ({ databaseId, tableId, rowId, transactionId }: Props) => {
      return tablesDB.deleteRow({
        databaseId,
        tableId,
        rowId,
        transactionId,
      })
    },
  })
}
