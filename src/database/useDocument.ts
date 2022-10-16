import { Models } from 'appwrite'
import { useContext, useEffect, useMemo } from 'react'
import { AppwriteContext } from '../context'
import { useAsyncEffect, useLoadingReducer, usePromiseEffect } from '../hooks'
import type { DocumentData, LoadingResult } from '../types'

export function useDocument<T>(
  databaseId: string,
  collectionId: string,
  documentId: string
): LoadingResult<DocumentData<T>> {
  const { client, database } = useContext(AppwriteContext)
  const { state, dispatch } = useLoadingReducer<DocumentData<T>>()
  const { data: document, loading, error } = state

  useEffect(() => {
    if (!document) {
      return
    }

    const unsubscribe = client.subscribe(`databases.${databaseId}.collections.${collectionId}.documents.${documentId}`, event => {
      dispatch({
        type: 'update',

        // @ts-ignore
        data: event.payload,
      })
    })

    return unsubscribe
  }, [document])

  useEffect(() => {
    (async () => {
      dispatch({
        type: 'loading',
        state: true,
      })

      try {
        dispatch({
          type: 'success',
          data: await database.getDocument<DocumentData<T>>(databaseId, collectionId, documentId),
        })
      }

      catch (error: unknown) {
        dispatch({
          type: 'error',

          // @ts-ignore
          error: error,
        })
      }

      finally {
        dispatch({
          type: 'loading',
          state: false,
        })
      }
    })()
  }, [])

  return useMemo(
    () => (
      [
        document,
        loading,
        error,
      ]
    ),
    (
      [
        document,
        loading,
        error,
      ]
    )
  )
}