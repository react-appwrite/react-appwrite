import { Models } from 'appwrite'
import { useContext, useEffect, useMemo } from 'react'
import { useQuery, useQueryClient, UseQueryOptions } from '@tanstack/react-query'
import { useAppwrite } from 'react-appwrite-hooks'
import produce, { castDraft } from 'immer'

export function useDocument<T>(
  databaseId: string,
  collectionId: string,
  documentId: string,
  options?: UseQueryOptions<T & Models.Document, unknown, T & Models.Document, string[]>
) {
  const { client, database } = useAppwrite()
  const queryClient = useQueryClient()
  const queryKey = useMemo(() => ['appwrite', 'database', databaseId, collectionId, documentId], [databaseId, collectionId, documentId])
  const queryResult = useQuery({
    queryKey,
    queryFn: async () => {
      return await database.getDocument<T & Models.Document>(databaseId, collectionId, documentId)
    },

    onSuccess: document => {
      queryClient.setQueriesData<(T & Models.Document)[]>(['appwrite', 'database', collectionId], collection => produce(collection, draft => {
        if (draft) {
          const documentIndex = draft.findIndex(storedDocument => storedDocument.$id == document.$id)

          if (documentIndex >= 0) {
            draft[documentIndex] = castDraft(document)
          }
        }
      }))
    },

    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: false,

    ...options,
  })

  useEffect(() => {
    const unsubscribe = client.subscribe(`databases.${databaseId}.collections.${collectionId}.documents.${documentId}`, event => {
      queryClient.setQueriesData(queryKey, event.payload)
    })

    return unsubscribe
  }, [databaseId, collectionId, documentId])

  return queryResult
}