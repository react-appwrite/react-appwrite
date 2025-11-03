import { useAppwrite } from '../index'
import { useMutation } from '@tanstack/react-query'

export type Props = {
  identityId: string,
}

export function useDeleteIdentity() {
  const { account } = useAppwrite()

  return useMutation({
    mutationFn: ({ identityId }: Props) => account.deleteIdentity({
      identityId,
    }),
  })
}
