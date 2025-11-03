import { useAppwrite } from '../index'
import { useMutation } from '@tanstack/react-query'

export type Props = {
  sessionId: string,
}

export function useUpdateSession() {
  const { account } = useAppwrite()

  return useMutation({
    mutationFn: ({ sessionId }: Props) => account.updateSession({
      sessionId,
    }),
  })
}
