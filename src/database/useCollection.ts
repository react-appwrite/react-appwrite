import { Models } from 'appwrite'
import { useContext, useEffect, useMemo } from 'react'
import { AppwriteContext } from '../context'
import { useLoadingReducer } from '../hooks'
import type { DocumentData, LoadingResult, RealtimeDocumentOperation } from '../types'

export function useCollection<T>(
  databaseId: string,
  collectionId: string,
  queries?: string[],
): LoadingResult<DocumentData<T>[]> {
  const { client, database } = useContext(AppwriteContext)
  const { state, dispatch } = useLoadingReducer<DocumentData<T>[]>()
  const { data: documents, loading, error } = state
  const collectionPath = `databases.${databaseId}.collections.${collectionId}`

  const getDocumentIndex = (documentId: string) => {
    return documents?.findIndex(document => document.$id === documentId) ?? -1
  }

  const upsertDocument = (document: DocumentData<T>) => {
    if (documents) {
      const documentIndex = getDocumentIndex(document.$id)

      if (documentIndex >= 0) {
        const newDocuments = [...documents]

        newDocuments[documentIndex] = document

        dispatch({
          type: 'update',
          data: newDocuments
        })
      }
      else {
        const newDocuments = [...documents]

        newDocuments.push(document)

        dispatch({
          type: 'update',
          data: newDocuments,
        })
      }
    }
  }

  const deleteDocument = (document: DocumentData<T>) => {
    if (documents) {
      dispatch({
        type: 'update',
        data: documents.filter(storedDocument => storedDocument.$id !== document.$id)
      })
    }
  }

  useEffect(() => {
    if (!documents) {
      return
    }

    const unsubscribe = client.subscribe(`${collectionPath}.documents`, event => {
      const [, operation] = event.events[0].match(/\.(\w+)$/) as RegExpMatchArray

      switch (operation as RealtimeDocumentOperation) {
        case 'create':
        case 'update':
          upsertDocument(event.payload as DocumentData<T>)
          break
        case 'delete':
          deleteDocument(event.payload as DocumentData<T>)
          break
      }
    })

    return unsubscribe
  }, [documents])

  useEffect(() => {
    (async () => {
      dispatch({
        type: 'loading',
        state: true,
      })

      try {
        const response = await database.listDocuments<DocumentData<T>>(databaseId, collectionId, queries)

        dispatch({
          type: 'success',
          data: response.documents,
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
        documents,
        loading,
        error,
      ]
    ),
    (
      [
        documents,
        loading,
        error,
      ]
    )
  )
}