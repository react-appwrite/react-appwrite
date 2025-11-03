import { useAppwrite } from '../index'
import { useMutation } from '@tanstack/react-query'

export type Props = {
  topicId: string,
  subscriberId: string,
  targetId: string,
}

export function useCreateSubscriber() {
  const { messaging } = useAppwrite()

  return useMutation({
    mutationFn: ({ topicId, subscriberId, targetId }: Props) => {
      return messaging.createSubscriber({
        topicId,
        subscriberId,
        targetId,
      })
    },
  })
}
