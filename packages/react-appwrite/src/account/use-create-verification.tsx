import { useAppwrite } from '../index'
import { useMutation } from '@tanstack/react-query'

export type Props = {
  url: string,
}

export function useCreateVerification() {
  const { account } = useAppwrite()

  return useMutation({
    mutationFn: ({ url }: Props) => account.createVerification({
      url,
    }),
  })
}
