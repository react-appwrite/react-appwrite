import { useQuery, useQueryClient, UseQueryOptions } from '@tanstack/react-query'
import { useContext, useEffect, useMemo } from 'react'
import { Models } from 'appwrite'
import { useAppwrite } from '..'

export function useFile(
  bucketId: string,
  fileId: string,
  options?: UseQueryOptions<Models.File, unknown, Models.File, string[]>
) {
  const { storage, client } = useAppwrite()
  const queryClient = useQueryClient()
  const queryKey = useMemo(() => ['appwrite', 'storage', bucketId, fileId], [bucketId, fileId])
  const queryResult = useQuery({
    queryKey,
    queryFn: async () => {
      return await storage.getFile(bucketId, fileId)
    },

    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: false,

    ...options,
  })

  useEffect(() => {
    const unsubscribe = client.subscribe(`buckets.${bucketId}.files.${fileId}`, event => {
      queryClient.setQueriesData(queryKey, event.payload)
    })

    return unsubscribe
  }, [bucketId, fileId])

  return queryResult
}