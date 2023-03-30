'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Models } from 'appwrite'
import { useAppwrite } from 'react-appwrite'

type TRequest = {
  email: string,
  password: string,
}
/**
 * Create email session
 * {@link https://appwrite.io/docs/client/account?sdk=web-default#accountCreateEmailSession | create email session documentation}
 */
function useEmailSignIn() {
  const { account } = useAppwrite()
  const queryClient = useQueryClient()
  const mutation = useMutation<Models.Session, unknown, TRequest, unknown>({
    mutationFn: async request => {
      return await account.createEmailSession(request.email, request.password)
    },

    onSuccess: async () => {
      queryClient.setQueryData(['appwrite', 'account'], await account.get())
    },
  })

  return mutation
}
export { useEmailSignIn }
