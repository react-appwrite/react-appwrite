'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ID, Models } from 'appwrite'
import { useAppwrite } from 'react-appwrite-hooks'

type Request = {
  userId?: string,
  name?: string,
  email: string,
  password: string,
}

function useEmailSignUp<Preferences extends Models.Preferences>() {
  const { account } = useAppwrite()
  const mutation = useMutation<Models.Account<Preferences>, unknown, Request, unknown>({
    mutationFn: async request => {
      return await account.create(request.userId ?? ID.unique(), request.email, request.password, request.name)
    },
  })

  return mutation
}

export { useEmailSignUp }
