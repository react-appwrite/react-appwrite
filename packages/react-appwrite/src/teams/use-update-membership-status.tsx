import { useAppwrite } from '../index'
import { useMutation } from '@tanstack/react-query'

type Props = {
  teamId: string,
  membershipId: string,
  userId: string,
  secret: string,
}

export function useUpdateMembershipStatus() {
  const { teams } = useAppwrite()

  return useMutation({
    mutationFn: ({ teamId, membershipId, userId, secret }: Props) => {
      return teams.updateMembershipStatus({
        teamId,
        membershipId,
        userId,
        secret,
      })
    },
  })
}
