import type { Appwrite, Models } from 'appwrite/types/sdk'
import { useState, useEffect } from 'react'
import type { CloudFunction, CloudFunctionExecution } from '../types'

export type UseFunctionResult<Data, ReturnData> = [CloudFunction<Data, ReturnData>, boolean, unknown]

function executionToExecutionWithData<Data>(execution: Models.Execution): CloudFunctionExecution<Data> {
  return { ...execution, data: execution.stdout && JSON.parse(execution.stdout) || {} }
}

export default function useFunction<Data, ReturnData>(appwrite: Appwrite, functionId: string): UseFunctionResult<Data, ReturnData> {
  const [execution, setExecution] = useState<CloudFunctionExecution<ReturnData>>()
  const [error, setError] = useState<unknown>()

  useEffect(() => {
    return appwrite.subscribe(`functions.${functionId}`, e => {
      if (e.event === 'functions.executions.update') {
        setExecution(executionToExecutionWithData<ReturnData>(e.payload as CloudFunctionExecution<ReturnData>))
      }
    })
  }, [execution])

  return [
    {
      execute: data => {
        const executionPromise = appwrite.functions.createExecution(functionId, JSON.stringify(data))

        executionPromise.then(execution => setExecution(executionToExecutionWithData<ReturnData>(execution as CloudFunctionExecution<ReturnData>)))
        executionPromise.catch(setError)
      },

      execution,
    },

    execution?.status === 'completed' || execution?.status === 'failed',
    error,
  ]
}