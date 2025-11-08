// oxlint-disable no-explicit-any
import { type AppwriteMutationOptions, useAppwrite } from '../index'
import { type Models, ID, type AppwriteException } from 'appwrite'
import { useMutation } from '@tanstack/react-query'

export type Props<Row extends Models.Row = Models.DefaultRow> = {
  databaseId: string,
  tableId: string,
  rowId?: string,
  data: Row extends Models.DefaultRow
    ? Partial<Models.Row> & Record<string, any>
    : Partial<Models.Row> & Omit<Row, keyof Models.Row>,
  permissions?: string[],
  transactionId?: string,
}

export function useCreateRow<Row extends Models.Row = Models.DefaultRow>(
  options: AppwriteMutationOptions<Row, Props<Row>>
) {
  const { tablesDB } = useAppwrite()

  return useMutation<Row, AppwriteException, Props<Row>>({
    mutationFn: ({ databaseId, tableId, rowId, data, permissions, transactionId }) => {
      return tablesDB.createRow<Row>({
        databaseId,
        tableId,
        rowId: rowId ?? ID.unique(),
        data,
        permissions,
        transactionId,
      })
    },

    ...options,
  })
}
