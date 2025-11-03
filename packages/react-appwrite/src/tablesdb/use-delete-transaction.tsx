import { useAppwrite } from '../index'
import { useMutation } from '@tanstack/react-query'

export type Props = {
  transactionId: string,
}

export function useDeleteTablesTransaction() {
  const { tablesDB } = useAppwrite()

  return useMutation({
    mutationFn: ({ transactionId }: Props) => {
      return tablesDB.deleteTransaction({
        transactionId,
      })
    },
  })
}
