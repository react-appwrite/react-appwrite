import { useAppwrite } from '../index'
import { useQuery } from '@tanstack/react-query'

type Props = {
  teamId: string,
  membershipId: string,
}

export function useGetMembership({ teamId, membershipId }: Props) {
  const { teams } = useAppwrite()

  return useQuery({
    queryFn: () => {
      return teams.getMembership({
        teamId,
        membershipId,
      })
    },

    queryKey: ['appwrite', 'teams', 'getMembership', {
      teamId,
      membershipId,
    }],
  })
}
