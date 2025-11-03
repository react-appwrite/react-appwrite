import { useAppwrite } from '../index'
import { useMutation } from '@tanstack/react-query'

export function useCreateJwt() {
  const { account } = useAppwrite()

  return useMutation({
    mutationFn: () => account.createJWT(),
  })
}
