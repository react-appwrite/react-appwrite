import { useAppwrite } from '../index'
import { useMutation } from '@tanstack/react-query'

type Props = {
  teamId: string,
}

export function useDeleteTeam() {
  const { teams } = useAppwrite()

  return useMutation({
    mutationFn: ({ teamId }: Props) => {
      return teams.delete({
        teamId,
      })
    },
  })
}
