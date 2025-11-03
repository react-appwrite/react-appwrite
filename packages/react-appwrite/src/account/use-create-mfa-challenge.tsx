import { useAppwrite } from '../index'
import { useMutation } from '@tanstack/react-query'
import type { AuthenticationFactor } from 'appwrite'

export type Props = {
  factor: AuthenticationFactor,
}

export function useCreateMfaChallenge() {
  const { account } = useAppwrite()

  return useMutation({
    mutationFn: ({ factor }: Props) => account.createMFAChallenge({
      factor,
    }),
  })
}
