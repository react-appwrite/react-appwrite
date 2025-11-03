import { useAppwrite } from '../index'
import { useMutation } from '@tanstack/react-query'

export type Props = {
  targetId: string,
  identifier: string,
}

export function useUpdatePushTarget() {
  const { account } = useAppwrite()

  return useMutation({
    mutationFn: ({ targetId, identifier }: Props) => account.updatePushTarget({
      targetId,
      identifier,
    }),
  })
}
