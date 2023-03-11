'use client'

import { useMutation, UseMutationResult } from '@tanstack/react-query'
import { useAppwrite } from 'react-appwrite-hooks'

/**
 * 
 * @param id The ID of the function.
 * @returns The function's response, automatically JSON deserialized.
 */
export function useFunction<TRequest, TResponse>(id: string): UseMutationResult<TResponse, unknown, TRequest, unknown> {
  const { functions, client } = useAppwrite()
  const mutation = useMutation<TResponse, unknown, TRequest, unknown>({
    mutationFn: async (request: TRequest) => {
      const execution = await functions.createExecution(id, JSON.stringify(request))
      let unsubscribe: (() => void) | null = null

      if (execution.status === 'completed') {
        return JSON.parse(execution.response)
      }
      else if (execution.status === 'failed') {
        console.log({ execution })
        throw new Error(execution.response)
      }

      const response = await new Promise((resolve, reject) => {
        unsubscribe = client.subscribe(`executions.${execution.$id}`, event => {
          // @ts-ignore
          switch (event.payload.status) {
            case 'completed':
              // @ts-ignore
              resolve(JSON.parse(event.payload.response))
              break
            case 'failed':
              // @ts-ignore
              reject(event.payload.response)
              break
          }
          return 1
        })
      }) as TResponse

      // @ts-ignore
      unsubscribe?.()

      return response
    }
  })

  return mutation
}