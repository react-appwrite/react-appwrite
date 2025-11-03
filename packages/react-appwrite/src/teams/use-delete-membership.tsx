import { useAppwrite } from '../index'
import { useMutation } from '@tanstack/react-query'

type Props = {
  teamId: string,
  membershipId: string,
}

export function useDeleteMembership() {
  const { teams } = useAppwrite()

  return useMutation({
    mutationFn: ({ teamId, membershipId }: Props) => {
      return teams.deleteMembership({
        teamId,
        membershipId,
      })
    },
  })
}
