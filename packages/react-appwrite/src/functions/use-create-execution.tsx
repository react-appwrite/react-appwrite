import { useAppwrite } from '../index'
import { useMutation } from '@tanstack/react-query'
import type { ExecutionMethod } from 'appwrite'

export type Props = {
  functionId: string,
  body?: string,
  async?: boolean,
  path?: string,
  method?: ExecutionMethod,
  headers?: Record<string, string>,
  scheduledAt?: string,
  xpath?: string,
}

export function useCreateExecution() {
  const { functions } = useAppwrite()

  return useMutation({
    mutationFn: ({ functionId, body, async, path, method, headers, scheduledAt, xpath }: Props) => {
      // @ts-expect-error
      return functions.createExecution({
        functionId,
        body,
        async,
        path,
        method,
        headers,
        scheduledAt,
        xpath,
      })
    },
  })
}
