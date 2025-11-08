import { useAppwrite } from '../index'
import { useQuery } from '@tanstack/react-query'
import type { Models, AppwriteException } from 'appwrite'

export type Props = {
  functionId: string,
  queries?: string[],
}

export function useListExecutions({ functionId, queries }: Props) {
  const { functions } = useAppwrite()

  return useQuery<Models.ExecutionList, AppwriteException>({
    queryFn: () => {
      return functions.listExecutions({
        functionId,
        queries,
      })
    },

    queryKey: ['appwrite', 'functions', 'listExecutions', {
      functionId,
      queries,
    }],
  })
}
