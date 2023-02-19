import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useContext } from 'react'
import { AppwriteContext } from '../context'
import { Models } from 'appwrite'

type Request = {
  email: string,
  password: string,
}

function useEmailSignIn() {
  const { account } = useContext(AppwriteContext)
  const queryClient = useQueryClient()
  const mutation = useMutation<Models.Session, unknown, Request, unknown>({
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