import { useAppwrite } from '../index'
import { useQuery } from '@tanstack/react-query'

export type Props = {
  sessionId: string,
}

export function useGetSession({ sessionId }: Props) {
  const { account } = useAppwrite()

  return useQuery({
    queryFn: () => account.getSession({
      sessionId,
    }),
    queryKey: ['appwrite', 'account', 'getSession', {
      sessionId,
    }],
  })
}
