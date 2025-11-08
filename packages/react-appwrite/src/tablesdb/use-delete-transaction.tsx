import { type AppwriteMutationOptions, useAppwrite } from '../index'
import { useMutation } from '@tanstack/react-query'
import type { AppwriteException } from 'appwrite'

export type Props = {
  transactionId: string,
}

export function useDeleteTablesTransaction(
  options: AppwriteMutationOptions<{}, Props>
) {
  const { tablesDB } = useAppwrite()

  return useMutation<{}, AppwriteException, Props>({
    mutationFn: ({ transactionId }) => {
      return tablesDB.deleteTransaction({
        transactionId,
      })
    },

    ...options,
  })
}
