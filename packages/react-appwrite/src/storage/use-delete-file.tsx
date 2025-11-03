import { useAppwrite } from '../index'
import { useMutation } from '@tanstack/react-query'

export type Props = {
  bucketId: string,
  fileId: string,
}

export function useDeleteFile() {
  const { storage } = useAppwrite()

  return useMutation({
    mutationFn: ({ bucketId, fileId }: Props) => {
      return storage.deleteFile({
        bucketId,
        fileId,
      })
    },
  })
}
