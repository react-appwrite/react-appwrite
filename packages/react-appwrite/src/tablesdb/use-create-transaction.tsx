import { type AppwriteMutationOptions, useAppwrite } from '../index'
import { useMutation } from '@tanstack/react-query'
import type { Models, AppwriteException } from 'appwrite'

export type Props = {
  ttl?: number,
}

export function useCreateTablesTransaction(
  options: AppwriteMutationOptions<Models.Transaction, Props>
) {
  const { tablesDB } = useAppwrite()

  return useMutation<Models.Transaction, AppwriteException, Props>({
    mutationFn: ({ ttl }) => {
      return tablesDB.createTransaction({
        ttl,
      })
    },

    ...options,
  })
}
