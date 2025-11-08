import { useAppwrite } from '../index'
import { useMutation } from '@tanstack/react-query'
import type { AppwriteException } from 'appwrite'

export type Props = {
  transactionId: string,
}

export function useDeleteTablesTransaction() {
  const { tablesDB } = useAppwrite()

  return useMutation<{}, AppwriteException, Props>({
    mutationFn: ({ transactionId }) => {
      return tablesDB.deleteTransaction({
        transactionId,
      })
    },
  })
}
