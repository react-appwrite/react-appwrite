'use client'

import { useQuery, useQueryClient, UseQueryOptions } from '@tanstack/react-query'
import { useMemo } from 'react'
import { useAppwrite } from 'react-appwrite'

type ImageOptions = {
  width?: number,
  height?: number,
  gravity?: number,
  quality?: number,
  borderWidth?: number,
  borderColor?: string,
  borderRadius?: number,
  opacity?: number,
  rotation?: number,
  background?: string,
  output?: string,
}

/**
 * Access to the file object by its unique file ID.
 * @param bucketId Storage bucket unique ID
 * @param fileId  File ID
 * @param options Options to pass to `react-query`
 * @link [Appwrite Documentation](https://appwrite.io/docs/client/storage?sdk=web-default#storageGetFile)
 */
export function useFilePreview(
  bucketId: string,
  fileId: string,
  imageOptions: ImageOptions = {
    width: undefined,
    height: undefined,
    gravity: undefined,
    quality: undefined,
    borderWidth: undefined,
    borderColor: undefined,
    borderRadius: undefined,
    opacity: undefined,
    rotation: undefined,
    background: undefined,
    output: undefined,
  },
  options?: UseQueryOptions<URL, unknown, URL, string[]>
) {
  const { storage } = useAppwrite()
  const queryClient = useQueryClient()
  const queryKey = useMemo(() => ['appwrite', 'storage', bucketId, fileId], [bucketId, fileId])
  const queryResult = useQuery({
    queryKey,
    queryFn: async ({ queryKey: [, , bucketId, fileId] }) => {
      return await storage.getFilePreview(bucketId, fileId,  ...Object.values<any>(imageOptions))
    },

    ...options,
  })

    return queryResult
}