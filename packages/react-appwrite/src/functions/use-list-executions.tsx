import { useAppwrite } from '../index'
import { useQuery } from '@tanstack/react-query'

export type Props = {
  functionId: string,
  queries?: string[],
}

export function useListExecutions({ functionId, queries }: Props) {
  const { functions } = useAppwrite()

  return useQuery({
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
