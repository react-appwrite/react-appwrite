import { useAppwrite } from '../index'
import type { Models, AppwriteException } from 'appwrite'
import { useMutation } from '@tanstack/react-query'

type Props = {
  teamId: string,
  membershipId: string,
  userId: string,
  secret: string,
}

export function useUpdateMembershipStatus() {
  const { teams } = useAppwrite()

  return useMutation<Models.Membership, AppwriteException, Props>({
    mutationFn: ({ teamId, membershipId, userId, secret }) => {
      return teams.updateMembershipStatus({
        teamId,
        membershipId,
        userId,
        secret,
      })
    },
  })
}