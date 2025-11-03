import { useAppwrite } from '../index'
import { useMutation } from '@tanstack/react-query'

export function useUpdateStatus() {
  const { account } = useAppwrite()

  return useMutation({
    mutationFn: () => account.updateStatus(),
  })
}
