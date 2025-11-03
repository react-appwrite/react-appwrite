import { useAppwrite } from '../index'
import { useQuery } from '@tanstack/react-query'

export type Props = {
  transactionId: string,
}

export function useGetTablesTransaction({ transactionId }: Props) {
  const { tablesDB } = useAppwrite()

  return useQuery({
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
