import { useAppwrite } from '../index'
import { useMutation } from '@tanstack/react-query'

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

export function useCreateTablesOperations() {
  const { tablesDB } = useAppwrite()

  return useMutation({
    mutationFn: ({ transactionId, operations }: Props) => {
      return tablesDB.createOperations({
        transactionId,
        operations,
      })
    },
  })
}
