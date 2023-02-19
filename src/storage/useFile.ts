import { useQuery, useQueryClient, UseQueryOptions } from '@tanstack/react-query'
import { useContext, useEffect, useMemo } from 'react'
import { AppwriteContext } from '../context'
import { Models } from 'appwrite'

export function useFile(
  bucketId: string,
  fileId: string,
  options?: UseQueryOptions<Models.File, unknown, Models.File, string[]>
) {
  const { storage, client } = useContext(AppwriteContext)
  const queryClient = useQueryClient()
  const queryKey = useMemo(() => ['appwrite', 'storage', bucketId, fileId], [bucketId, fileId])
  const queryResult = useQuery({
    queryKey,
    queryFn: async () => {
      return await storage.getFile(bucketId, fileId)
    },

    refetchOnMount: false,
    refetchOnWindowFocus: false,

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