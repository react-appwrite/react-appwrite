import { useAppwrite } from '../index'
import { useMutation } from '@tanstack/react-query'

export type Props = {
  password: string,
  oldPassword?: string,
}

export function useUpdatePassword() {
  const { account } = useAppwrite()

  return useMutation({
    mutationFn: ({ password, oldPassword }: Props) => account.updatePassword({
      password,
      oldPassword,
    }),
  })
}
