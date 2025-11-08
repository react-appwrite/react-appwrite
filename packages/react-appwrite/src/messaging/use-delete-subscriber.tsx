import { type AppwriteMutationOptions, useAppwrite } from '../index'
import { useMutation } from '@tanstack/react-query'
import type { AppwriteException } from 'appwrite'

export type Props = {
  topicId: string,
  subscriberId: string,
}

export function useDeleteSubscriber(
  options: AppwriteMutationOptions<{}, Props>
) {
  const { messaging } = useAppwrite()

  return useMutation<{}, AppwriteException, Props>({
    mutationFn: ({ topicId, subscriberId }) => {
      return messaging.deleteSubscriber({
        topicId,
        subscriberId,
      })
    },

    ...options,
  })
}
