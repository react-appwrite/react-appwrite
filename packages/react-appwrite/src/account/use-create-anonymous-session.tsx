import { useAppwrite } from '../index'
import { useMutation } from '@tanstack/react-query'

export function useCreateAnonymousSession() {
  const { account } = useAppwrite()

  return useMutation({
    mutationFn: () => account.createAnonymousSession(),
  })
}
