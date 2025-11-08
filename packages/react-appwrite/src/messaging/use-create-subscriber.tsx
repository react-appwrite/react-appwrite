import { type AppwriteMutationOptions, useAppwrite } from '../index'
import { useMutation } from '@tanstack/react-query'
import type { Models, AppwriteException } from 'appwrite'

export type Props = {
  topicId: string,
  subscriberId: string,
  targetId: string,
}

export function useCreateSubscriber(
  options: AppwriteMutationOptions<Models.Subscriber, Props>
) {
  const { messaging } = useAppwrite()

  return useMutation<Models.Subscriber, AppwriteException, Props>({
    mutationFn: ({ topicId, subscriberId, targetId }) => {
      return messaging.createSubscriber({
        topicId,
        subscriberId,
        targetId,
      })
    },

    ...options,
  })
}
