import { useAppwrite } from '../index'
import { useMutation } from '@tanstack/react-query'

export type Props = {
  url: string,
}

export function useCreateEmailVerification() {
  const { account } = useAppwrite()

  return useMutation({
    mutationFn: ({ url }: Props) => account.createEmailVerification({
      url,
    }),
  })
}
