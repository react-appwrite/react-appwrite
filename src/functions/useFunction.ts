import { Models } from 'appwrite'
import { useContext, useEffect, useState } from 'react'
import { AppwriteContext } from '../context'
import { useAsyncEffect } from '../hooks'
import { useLoadingReducer } from '../hooks/useLoadingReducer'
import type { AppwriteFunction, ExecutionData, LoadingResult } from '../types'

export function useFunction<Request, Response>(id: string): AppwriteFunction<Request, Response> {
  const { client, functions } = useContext(AppwriteContext)
  const { state, dispatch } = useLoadingReducer<ExecutionData<Response>>()

  useEffect(() => {
    if (!state?.data) {
      return
    }

    const unsubscribe = client.subscribe(`executions.${state.data.$id}`, event => {
      console.log({ event })

      // @ts-ignore
      switch (event.payload.status) {
        case 'completed':
          dispatch({
            type: 'success',
            data: {
              // @ts-ignore
              ...event.payload,

              // @ts-ignore
              data: JSON.parse(event.payload.response),
            }
          })
          break

        case 'failed':
          dispatch({
            // @ts-ignore
            type: 'error',
            // @ts-ignore
            error: event.payload.response,
          })
          break

        case 'waiting':
        case 'processing':
          dispatch({
            type: 'update',

            // @ts-ignore
            data: {
              // @ts-ignore
              ...event.payload,

              // @ts-ignore
              data: null,
            }
          })
          break
      }
    })

    return unsubscribe
  }, [state])

  return [
    async (request: Request) => {
      dispatch({
        type: 'loading',
        state: true,
      })

      let execution = await functions.createExecution(id, JSON.stringify(request), true) as ExecutionData<Response>

      execution = {
        ...execution,
        data: null,
      }

      dispatch({
        type: 'update',
        data: execution,
      })

      return execution
    },

    state.data,
  ]
}