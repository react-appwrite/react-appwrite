import { useAppwrite } from '../index'
import { useMutation } from '@tanstack/react-query'

export type Props = {
  sessionId: string,
}

export function useDeleteSession() {
  const { account } = useAppwrite()

  return useMutation({
    mutationFn: ({ sessionId }: Props) => account.deleteSession({
      sessionId,
    }),
  })
}
