import { useAppwrite } from '../index'
import { useMutation } from '@tanstack/react-query'

export type Props = {
  bucketId: string,
  fileId: string,
  name?: string,
  permissions?: string[],
}

export function useUpdateFile() {
  const { storage } = useAppwrite()

  return useMutation({
    mutationFn: ({ bucketId, fileId, name, permissions }: Props) => {
      return storage.updateFile({
        bucketId,
        fileId,
        name,
        permissions,
      })
    },
  })
}
