import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Models } from 'appwrite'
import produce from 'immer'
import { type DatabaseCollection, useAppwrite } from 'react-appwrite'

type Props<TDocument> = {
  databaseId: string,
  collectionId: string,
  documentId: string,
  data: Partial<TDocument>,
  permissions?: string[],
}

/**
 * Updates a document in a collection.
 * @link [Appwrite Documentation](https://appwrite.io/docs/client/databases?sdk=web-default#databasesUpdateDocument)
 */
export function useDocumentUpdate<TDocument extends Models.Document>() {
  const { databases } = useAppwrite()
  const mutation = useMutation({
    mutationFn: async ({ databaseId, collectionId, documentId, data, permissions }: Props<TDocument>) => {
      return databases.updateDocument<TDocument>(databaseId, collectionId, documentId, data, permissions)
    },
  })

  return mutation
}