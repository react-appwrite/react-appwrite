import { useAppwrite } from '../index'
import { useMutation } from '@tanstack/react-query'

export type Props = {
  transactionId: string,
  commit?: boolean,
  rollback?: boolean,
}

export function useUpdateTablesTransaction() {
  const { tablesDB } = useAppwrite()

  return useMutation({
    mutationFn: ({ transactionId, commit, rollback }: Props) => {
      return tablesDB.updateTransaction({
        transactionId,
        commit,
        rollback,
      })
    },
  })
}
