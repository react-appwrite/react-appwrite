import { useAppwrite } from '../index'
import { useMutation } from '@tanstack/react-query'

export function useUpdateMfaRecoveryCodes() {
  const { account } = useAppwrite()

  return useMutation({
    mutationFn: () => account.updateMFARecoveryCodes(),
  })
}
