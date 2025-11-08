import { useAppwrite } from '../index'
import { useQuery } from '@tanstack/react-query'
import type { Models, AppwriteException } from 'appwrite'

export type Props = {
  transactionId: string,
}

export function useGetTablesTransaction({ transactionId }: Props) {
  const { tablesDB } = useAppwrite()

  return useQuery<Models.Transaction, AppwriteException>({
    queryFn: () => {
      return tablesDB.getTransaction({
        transactionId,
      })
    },

    queryKey: ['appwrite', 'tablesDB', 'getTransaction', {
      transactionId,
    }],
  })
}
