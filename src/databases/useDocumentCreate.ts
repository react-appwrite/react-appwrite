import { useMutation } from '@tanstack/react-query'
import { ID, Models } from 'appwrite'
import { useAppwrite } from 'react-appwrite'

type Props<TDocument> = {
  databaseId: string,
  collectionId: string,
  documentId?: string,
  data: Models.Document & TDocument,
  permissions?: string[],
}

/**
 * Creates a document in a collection.
 * @link [Appwrite Documentation](https://appwrite.io/docs/client/databases?sdk=web-default#databasesCreateDocument)
 */
export function useDocumentCreate<TDocument extends Models.Document>() {
  const { databases } = useAppwrite()
  const mutation = useMutation({
    mutationFn: async ({ databaseId, collectionId, documentId, data, permissions }: Props<TDocument>) => {
      return databases.createDocument(databaseId, collectionId, documentId ?? ID.unique(), data, permissions)
    },
  })

  return mutation
}