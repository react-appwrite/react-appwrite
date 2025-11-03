import { useAppwrite } from '../index'
import { useMutation } from '@tanstack/react-query'

type Props = {
  teamId: string,
  membershipId: string,
  roles: string[],
}

export function useUpdateMembership() {
  const { teams } = useAppwrite()

  return useMutation({
    mutationFn: ({ teamId, membershipId, roles }: Props) => {
      return teams.updateMembership({
        teamId,
        membershipId,
        roles,
      })
    },
  })
}
