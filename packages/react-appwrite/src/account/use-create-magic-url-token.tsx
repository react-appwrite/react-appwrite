import { useAppwrite } from '../index'
import { useMutation } from '@tanstack/react-query'

export type Props = {
  userId: string,
  email: string,
  url?: string,
  phrase?: boolean,
}

export function useCreateMagicUrlToken() {
  const { account } = useAppwrite()

  return useMutation({
    mutationFn: ({ userId, email, url, phrase }: Props) => account.createMagicURLToken({
      userId,
      email,
      url,
      phrase,
    }),
  })
}
