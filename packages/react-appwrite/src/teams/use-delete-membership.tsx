import { type AppwriteMutationOptions, useAppwrite } from '../index'
import type { AppwriteException } from 'appwrite'
import { useMutation } from '@tanstack/react-query'

type Props = {
  teamId: string,
  membershipId: string,
}

export function useDeleteMembership(
  options: AppwriteMutationOptions<{}, Props>
) {
  const { teams } = useAppwrite()

  return useMutation<{}, AppwriteException, Props>({
    mutationFn: ({ teamId, membershipId }) => {
      return teams.deleteMembership({
        teamId,
        membershipId,
      })
    },

    ...options,
  })
}