// oxlint-disable no-explicit-any
import { useAppwrite } from '../index'
import type { Models } from 'appwrite'
import { useMutation } from '@tanstack/react-query'

export type Props<Row extends Models.Row = Models.DefaultRow> = {
  databaseId: string,
  tableId: string,
  rowId: string,
  data?: Row extends Models.DefaultRow
    ? Partial<Models.Row> & Record<string, any>
    : Partial<Models.Row> & Partial<Omit<Row, keyof Models.Row>>,
  permissions?: string[],
  transactionId?: string,
}

export function useUpdateRow<Row extends Models.Row = Models.DefaultRow>() {
  const { tablesDB } = useAppwrite()

  return useMutation({
    mutationFn: ({ databaseId, tableId, rowId, data, permissions, transactionId }: Props<Row>) => {
      return tablesDB.updateRow<Row>({
        databaseId,
        tableId,
        rowId,
        data,
        permissions,
        transactionId,
      })
    },
  })
}
