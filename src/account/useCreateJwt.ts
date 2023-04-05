'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Models } from 'appwrite'
import { useAppwrite } from 'react-appwrite'

/**
 * Create JSON Web Token for current user.
 * @link [Appwrite Documentation](https://appwrite.io/docs/client/account?sdk=web-default#accountCreateJWT) 
 */

function useCreateJwt() {
  const { account } = useAppwrite()
  const queryClient = useQueryClient()
  const mutation = useMutation<Models.Jwt>({
    mutationFn: async (request) => {
      return await account.createJWT()
    },
  })
    
  return mutation
}

export { useCreateJwt }