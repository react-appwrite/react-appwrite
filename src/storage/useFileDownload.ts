'use client'

import { useMutation } from '@tanstack/react-query'
import { useAppwrite } from 'react-appwrite'

type Props = {
  bucketId: string,
  fileId: string,
}

/**
 * Retrieves a file URL for download.
 * @returns 
 */
export function useFileDownload() {
  const { storage } = useAppwrite()
  const mutation = useMutation({
    mutationFn: async ({ bucketId, fileId, }: Props) => {
      return storage.getFileDownload(bucketId, fileId)
    },
  })

  return mutation
}