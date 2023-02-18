import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useContext } from 'react'
import { AppwriteContext } from '../context'
import { Models } from 'appwrite'

type Request = {
  email: string,
  password: string,
}

function useEmailSignIn() {
  const { account: accountService } = useContext(AppwriteContext)
  const queryClient = useQueryClient()
  const mutation = useMutation<Models.Session, unknown, Request, unknown>({
    mutationFn: async request => await accountService.createEmailSession(request.email, request.password),

    onSuccess: async session => {
      const account = await accountService.get()

      queryClient.setQueryData(['account'], account)
    }
  })

  return mutation
}

export { useEmailSignIn }