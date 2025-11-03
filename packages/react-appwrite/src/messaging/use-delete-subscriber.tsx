import { useAppwrite } from '../index'
import { useMutation } from '@tanstack/react-query'

export type Props = {
  topicId: string,
  subscriberId: string,
}

export function useDeleteSubscriber() {
  const { messaging } = useAppwrite()

  return useMutation({
    mutationFn: ({ topicId, subscriberId }: Props) => {
      return messaging.deleteSubscriber({
        topicId,
        subscriberId,
      })
    },
  })
}
