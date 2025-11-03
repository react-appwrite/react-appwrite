import { useAppwrite } from '../index'
import { useMutation } from '@tanstack/react-query'

export type Props = {
  challengeId: string,
  otp: string,
}

export function useUpdateMfaChallenge() {
  const { account } = useAppwrite()

  return useMutation({
    mutationFn: ({ challengeId, otp }: Props) => account.updateMFAChallenge({
      challengeId,
      otp,
    }),
  })
}
