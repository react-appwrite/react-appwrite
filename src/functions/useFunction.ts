import { Models } from 'appwrite'
import { useContext, useEffect, useState } from 'react'
import { useMutation, UseMutationResult } from '@tanstack/react-query'
import { AppwriteContext } from '../context'
import type { AppwriteFunction, ExecutionData, LoadingResult } from '../types'

export function useFunction<Request, Response>(id: string): UseMutationResult<Response, unknown, Request, unknown> {
  const { functions, client } = useContext(AppwriteContext)
  const mutation = useMutation<Response, unknown, Request, unknown>({
    mutationFn: async (request: Request) => {
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
      }) as Response

      // @ts-ignore
      unsubscribe?.()

      return response
    }
  })

  return mutation
}