'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Models } from 'appwrite'
import { useAppwrite } from 'react-appwrite'
import { useAccount } from 'react-appwrite/account'

type TRequest = {
  sessionId?: string,
}

function useSignOut() {
  const { account: accountService } = useAppwrite()
  const queryClient = useQueryClient()
  const mutation = useMutation<Models.Session | void, unknown, TRequest | undefined | void, unknown>({
    mutationFn: async request => {
      if (!request?.sessionId) {
        return void await accountService.deleteSession('current')
      }

      const session = await accountService.getSession(request.sessionId)

      accountService.deleteSession(session.$id)

      return session
    },

    onSuccess: async () => {
      queryClient.setQueryData(['appwrite', 'account'], null)
      // queryClient.removeQueries(['appwrite', 'account'])
      // queryClient.resetQueries(['appwrite', 'account'])
    },
  })

  return mutation
}

export { useSignOut }
