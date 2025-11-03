import { useAppwrite } from '../index'
import { useMutation } from '@tanstack/react-query'

export type Props = {
  ttl?: number,
}

export function useCreateTablesTransaction() {
  const { tablesDB } = useAppwrite()

  return useMutation({
    mutationFn: ({ ttl }: Props) => {
      return tablesDB.createTransaction({
        ttl,
      })
    },
  })
}
