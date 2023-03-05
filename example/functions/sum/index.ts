import functions from 'appwrite-functions'

type TRequest = number[]
type TResponse = number
type TVariables =
  | 'MAX_RESULT'

export = functions.onRequest<TRequest, TResponse, TVariables>(async request => {
  return (
    Math.min(
      request.data.reduce((previousValue, currentValue) => previousValue + currentValue, 0),
      Number(request.variables.MAX_RESULT) || Infinity
    )
  )
})