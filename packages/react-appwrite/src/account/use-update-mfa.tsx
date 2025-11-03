import { useAppwrite } from '../index'
import { useMutation } from '@tanstack/react-query'

export type Props = {
  mfa: boolean,
}

export function useUpdateMfa() {
  const { account } = useAppwrite()

  return useMutation({
    mutationFn: ({ mfa }: Props) => account.updateMFA({
      mfa,
    }),
  })
}
