import { useAppwrite } from '../index'
import { useMutation } from '@tanstack/react-query'

export type Props = {
  targetId: string,
  identifier: string,
  providerId?: string,
}

export function useCreatePushTarget() {
  const { account } = useAppwrite()

  return useMutation({
    mutationFn: ({ targetId, identifier, providerId }: Props) => account.createPushTarget({
      targetId,
      identifier,
      providerId,
    }),
  })
}
