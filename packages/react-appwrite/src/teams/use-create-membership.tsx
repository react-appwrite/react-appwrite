import { useAppwrite } from '../index'
import { useMutation } from '@tanstack/react-query'

type Props = {
  teamId: string,
  roles: string[],
  email?: string,
  userId?: string,
  phone?: string,
  url?: string,
  name?: string,
}

export function useCreateMembership() {
  const { teams } = useAppwrite()

  return useMutation({
    mutationFn: ({ teamId, roles, email, userId, phone, url, name }: Props) => {
      return teams.createMembership({
        teamId,
        roles,
        email,
        userId,
        phone,
        url,
        name,
      })
    },
  })
}
