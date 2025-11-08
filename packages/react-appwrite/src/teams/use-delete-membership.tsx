import { useAppwrite } from '../index'
import type { AppwriteException } from 'appwrite'
import { useMutation } from '@tanstack/react-query'

type Props = {
  teamId: string,
  membershipId: string,
}

export function useDeleteMembership() {
  const { teams } = useAppwrite()

  return useMutation<{}, AppwriteException, Props>({
    mutationFn: ({ teamId, membershipId }) => {
      return teams.deleteMembership({
        teamId,
        membershipId,
      })
    },
  })
}