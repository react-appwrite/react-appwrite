import { useAppwrite } from '../index'
import { useMutation } from '@tanstack/react-query'

export type Props = {
  phone: string,
  password: string,
}

export function useUpdatePhone() {
  const { account } = useAppwrite()

  return useMutation({
    mutationFn: ({ phone, password }: Props) => account.updatePhone({
      phone,
      password,
    }),
  })
}
