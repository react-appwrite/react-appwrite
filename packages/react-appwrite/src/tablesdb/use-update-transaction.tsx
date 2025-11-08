import { type AppwriteMutationOptions, useAppwrite } from '../index'
import { useMutation } from '@tanstack/react-query'
import type { Models, AppwriteException } from 'appwrite'

export type Props = {
  transactionId: string,
  commit?: boolean,
  rollback?: boolean,
}

export function useUpdateTablesTransaction(
  options: AppwriteMutationOptions<Models.Transaction, Props>
) {
  const { tablesDB } = useAppwrite()

  return useMutation<Models.Transaction, AppwriteException, Props>({
    mutationFn: ({ transactionId, commit, rollback }) => {
      return tablesDB.updateTransaction({
        transactionId,
        commit,
        rollback,
      })
    },

    ...options,
  })
}
