import { useAppwrite } from '../index'
import { useQuery } from '@tanstack/react-query'
import type { ImageGravity, ImageFormat, AppwriteException } from 'appwrite'

export type Props = {
  bucketId: string,
  fileId: string,
  width?: number,
  height?: number,
  gravity?: ImageGravity,
  quality?: number,
  borderWidth?: number,
  borderColor?: string,
  borderRadius?: number,
  opacity?: number,
  rotation?: number,
  background?: string,
  output?: ImageFormat,
  token?: string,
}

// oxlint-disable-next-line max-lines-per-function
export function useGetFilePreview({
  bucketId,
  fileId,
  width,
  height,
  gravity,
  quality,
  borderWidth,
  borderColor,
  borderRadius,
  opacity,
  rotation,
  background,
  output,
  token,
}: Props) {
  const { storage } = useAppwrite()

  return useQuery<string, AppwriteException>({
    queryFn: () => {
      return storage.getFilePreview({
        bucketId,
        fileId,
        width,
        height,
        gravity,
        quality,
        borderWidth,
        borderColor,
        borderRadius,
        opacity,
        rotation,
        background,
        output,
        token,
      })
    },

    queryKey: ['appwrite', 'storage', 'getFilePreview', {
      bucketId,
      fileId,
      width,
      height,
      gravity,
      quality,
      borderWidth,
      borderColor,
      borderRadius,
      opacity,
      rotation,
      background,
      output,
      token,
    }],
  })
}
