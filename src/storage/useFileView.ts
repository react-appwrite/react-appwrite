'use client'

import { useMutation } from '@tanstack/react-query'
import { useAppwrite } from 'react-appwrite'

type Props = {
  bucketId: string,
  fileId: string,
}

/**
 * Retrieves a file URL for download, with no 'Content-Disposition: attachment' header.
 * @link [Appwrite Documentation](https://appwrite.io/docs/client/storage?sdk=web-default#storageGetFileView)
 */
export function useFileView() {
  const { storage } = useAppwrite()
  const mutation = useMutation({
    mutationFn: async ({ bucketId, fileId, }: Props) => {
      return storage.getFileView(bucketId, fileId)
    },
  })

  return mutation
}