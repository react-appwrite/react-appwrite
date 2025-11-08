import { useAppwrite } from '../index'
import type { Models, AppwriteException } from 'appwrite'
import { useMutation } from '@tanstack/react-query'

type Props = {
  teamId: string,
  membershipId: string,
  roles: string[],
}

export function useUpdateMembership() {
  const { teams } = useAppwrite()

  return useMutation<Models.Membership, AppwriteException, Props>({
    mutationFn: ({ teamId, membershipId, roles }) => {
      return teams.updateMembership({
        teamId,
        membershipId,
        roles,
      })
    },
  })
}