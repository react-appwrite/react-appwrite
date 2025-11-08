// oxlint-disable max-lines-per-function
import { useAppwrite } from '../index'
import { useCreateExecution } from './use-create-execution'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export type Props = {
  functionId: string,
}

type RealtimeSubscription = {
  close: () => Promise<void>,
}

export function useFunction<TRequest, TResponse>({ functionId }: Props) {
  const { realtime } = useAppwrite()
  const createExecution = useCreateExecution()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (request: TRequest) => {
      const execution = await createExecution.mutateAsync({
        functionId,
        async: true,
        body: JSON.stringify(request),
      })

      if (execution.status === 'completed') {
        return JSON.parse(execution.responseBody)
      }

      if (execution.status === 'failed') {
        throw new Error(execution.responseBody)
      }

      // oxlint-disable-next-line init-declarations
      let subscription: RealtimeSubscription | null

      // oxlint-disable-next-line no-async-promise-executor
      const response = await new Promise<TResponse>(async (resolve, reject) => {
        subscription = await realtime.subscribe(`executions.${execution.$id}`, event => {
          switch (event.payload.status) {
            case 'completed':
              resolve(JSON.parse(event.payload.response))
              break
            case 'failed':
              reject(event.payload.response)
              break
            default:
              break
          }

          queryClient.setQueryData(['appwrite', 'functions', 'getExecution', {
            functionId,
            executionId: execution.$id,
          }], event.payload)
        })
      })

      // @ts-expect-error
      subscription?.close()

      return response
    },
  })
}
