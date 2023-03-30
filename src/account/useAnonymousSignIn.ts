'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Models } from 'appwrite'
import { useAppwrite } from 'react-appwrite'

/**
 * Create anonymous session.
 * @link [Appwrite Documentation](https://appwrite.io/docs/client/account?sdk=web-default#accountCreateAnonymousSession) 
 */
function useAnonymousSignIn() {
  const { account } = useAppwrite()
  const queryClient = useQueryClient()
  const mutation = useMutation<Models.Session>({
    mutationFn: async (request) => {
      return await account.createAnonymousSession()
    },

    onSuccess: async () => {
      queryClient.setQueryData(['appwrite', 'account'], await account.get())
    },
  })

  return mutation
}

export { useAnonymousSignIn }
