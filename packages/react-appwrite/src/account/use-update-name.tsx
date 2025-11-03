import { useAppwrite } from '../index'
import { useMutation } from '@tanstack/react-query'

export type Props = {
  name: string,
}

export function useUpdateName() {
  const { account } = useAppwrite()

  return useMutation({
    mutationFn: ({ name }: Props) => account.updateName({
      name,
    }),
  })
}
