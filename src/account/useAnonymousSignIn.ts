'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Models } from 'appwrite'
import { useAppwrite } from 'react-appwrite'

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
