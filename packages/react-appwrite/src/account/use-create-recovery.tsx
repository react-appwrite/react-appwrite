import { useAppwrite } from '../index'
import { useMutation } from '@tanstack/react-query'

export type Props = {
  email: string,
  url: string,
}

export function useCreateRecovery() {
  const { account } = useAppwrite()

  return useMutation({
    mutationFn: ({ email, url }: Props) => account.createRecovery({
      email,
      url,
    }),
  })
}
