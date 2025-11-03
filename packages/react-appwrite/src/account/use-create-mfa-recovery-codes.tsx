import { useAppwrite } from '../index'
import { useMutation } from '@tanstack/react-query'

export function useCreateMfaRecoveryCodes() {
  const { account } = useAppwrite()

  return useMutation({
    mutationFn: () => account.createMFARecoveryCodes(),
  })
}
