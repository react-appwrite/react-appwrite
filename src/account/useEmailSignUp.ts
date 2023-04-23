'use client'

import { useMutation } from '@tanstack/react-query'
import { ID, Models } from 'appwrite'
import { useAppwrite } from 'react-appwrite'

type TRequest = {
  userId?: string,
  name?: string,
  email: string,
  password: string,
}

/**
 * Create new account using email.
 * @link [Appwrite Documentation](https://appwrite.io/docs/client/account?sdk=web-default#accountCreateEmailSession)
 */
function useEmailSignUp<Preferences extends Models.Preferences>() {
  const { account } = useAppwrite()
  const mutation = useMutation<Models.User<Preferences>, unknown, TRequest, unknown>({
    mutationFn: async request => {
      return await account.create(request.userId ?? ID.unique(), request.email, request.password, request.name)
    },
  })

  return mutation
}

export { useEmailSignUp }
