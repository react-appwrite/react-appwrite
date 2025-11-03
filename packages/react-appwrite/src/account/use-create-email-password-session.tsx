import { useAppwrite } from '../index'
import { useMutation } from '@tanstack/react-query'

export type Props = {
  email: string,
  password: string,
}

export function useCreateEmailPasswordSession() {
  const { account } = useAppwrite()

  return useMutation({
    mutationFn: ({ email, password }: Props) => account.createEmailPasswordSession({
      email,
      password,
    }),
  })
}
