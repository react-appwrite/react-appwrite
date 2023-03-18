import { useMutation } from '@tanstack/react-query'
import { useAppwrite } from 'react-appwrite'

type Props = {
  databaseId: string,
  collectionId: string,
  documentId: string,
}

/**
 * Deletes a document from a collection.
 * @link [Appwrite Documentation](https://appwrite.io/docs/client/databases?sdk=web-default#databasesUpdateDocument)
 */
export function useDocumentDelete() {
  const { databases } = useAppwrite()
  const mutation = useMutation({
    mutationFn: async ({ databaseId, collectionId, documentId }: Props) => {
      return databases.deleteDocument(databaseId, collectionId, documentId)
    },
  })

  return mutation
}