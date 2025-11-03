import { useAppwrite } from '../index'
import { useMutation } from '@tanstack/react-query'

export type Props = {
  targetId: string,
}

export function useDeletePushTarget() {
  const { account } = useAppwrite()

  return useMutation({
    mutationFn: ({ targetId }: Props) => account.deletePushTarget({
      targetId,
    }),
  })
}
