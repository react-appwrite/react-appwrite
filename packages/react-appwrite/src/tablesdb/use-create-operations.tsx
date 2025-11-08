import { type AppwriteMutationOptions, useAppwrite } from '../index'
import { useMutation } from '@tanstack/react-query'
import type { Models, AppwriteException } from 'appwrite'

export type Operation = {
  action: 'create' | 'update' | 'delete',
  databaseId: string,
  tableId: string,
  rowId: string,
  data?: Record<string, unknown>,
}

export type Props = {
  transactionId: string,
  operations?: Operation[],
}

export function useCreateTablesOperations(
  options: AppwriteMutationOptions<Models.Transaction, Props>
) {
  const { tablesDB } = useAppwrite()

  return useMutation<Models.Transaction, AppwriteException, Props>({
    mutationFn: ({ transactionId, operations }) => {
      return tablesDB.createOperations({
        transactionId,
        operations,
      })
    },

    ...options,
  })
}
