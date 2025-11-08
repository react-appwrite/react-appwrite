import { useAppwrite } from '../index'
import { useMutation } from '@tanstack/react-query'
import type { Models, AppwriteException } from 'appwrite'

export type Props = {
  ttl?: number,
}

export function useCreateTablesTransaction() {
  const { tablesDB } = useAppwrite()

  return useMutation<Models.Transaction, AppwriteException, Props>({
    mutationFn: ({ ttl }) => {
      return tablesDB.createTransaction({
        ttl,
      })
    },
  })
}
