import { useAppwrite } from '../index'
import type { AppwriteException } from 'appwrite'
import { useMutation } from '@tanstack/react-query'

type Props = {
  teamId: string,
}

export function useDeleteTeam() {
  const { teams } = useAppwrite()

  return useMutation<{}, AppwriteException, Props>({
    mutationFn: ({ teamId }) => {
      return teams.delete({
        teamId,
      })
    },
  })
}