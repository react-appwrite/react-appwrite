import { useAppwrite } from '../index'
import type { AppwriteException } from 'appwrite'
import { useMutation } from '@tanstack/react-query'

export type Props = {
  databaseId: string,
  tableId: string,
  rowId: string,
  transactionId?: string,
}

export function useDeleteRow() {
  const { tablesDB } = useAppwrite()

  return useMutation<{}, AppwriteException, Props>({
    mutationFn: ({ databaseId, tableId, rowId, transactionId }) => {
      return tablesDB.deleteRow({
        databaseId,
        tableId,
        rowId,
        transactionId,
      })
    },
  })
}
