'use client'

import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { useMemo } from 'react'
import { useAppwrite } from 'react-appwrite'
import { Image } from './types'

/**
 * Get a file preview of an image.
 * @param bucketId Storage bucket unique ID
 * @param fileId  File ID
 * @param imageOptions Options for cutting and resizing your preview image.
 * @param options Options to pass to `react-query`
 * @link [Appwrite Documentation](https://appwrite.io/docs/client/storage?sdk=web-default#storageGetFilePreview)
 */
export function useFilePreview(
  bucketId: string,
  fileId: string,
  imageOptions?: Image,
  options?: UseQueryOptions<URL, unknown, URL, string[]>
) {
  const { storage } = useAppwrite()
  const queryKey = useMemo(() => ['appwrite', 'storage', bucketId, fileId], [bucketId, fileId])
  const queryResult = useQuery({
    queryKey,
    queryFn: async ({ queryKey: [, , bucketId, fileId] }) => {
      return await storage.getFilePreview(bucketId, fileId,  
        imageOptions?.width, 
        imageOptions?.height, 
        imageOptions?.gravity, 
        imageOptions?.quality, 
        imageOptions?.borderWidth, 
        imageOptions?.borderColor, 
        imageOptions?.borderRadius, 
        imageOptions?.opacity, 
        imageOptions?.rotation, 
        imageOptions?.background, 
        imageOptions?.output 
      )
    },

    ...options,
  })

    return queryResult
}