import { useAppwrite } from '../index'
import { useMutation } from '@tanstack/react-query'

export type Props = {
  userId: string,
  phone: string,
}

export function useCreatePhoneToken() {
  const { account } = useAppwrite()

  return useMutation({
    mutationFn: ({ userId, phone }: Props) => account.createPhoneToken({
      userId,
      phone,
    }),
  })
}
