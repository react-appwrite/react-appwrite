import { useAppwrite } from '../index'
import { useQuery } from '@tanstack/react-query'

export type Props = {
  functionId: string,
  executionId: string,
}

export function useGetExecution({ functionId, executionId }: Props) {
  const { functions } = useAppwrite()

  return useQuery({
    queryFn: () => {
      return functions.getExecution({
        functionId,
        executionId,
      })
    },

    queryKey: ['appwrite', 'functions', 'getExecution', {
      functionId,
      executionId,
    }],
  })
}
