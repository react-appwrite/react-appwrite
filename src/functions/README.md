# Functions Hooks

## useFunction

```typescript
import { useFunction } from 'react-appwrite-hooks/functions'

// In your component.
const [func, isLoading, error] = useFunction<Data, ReturnData>(appwrite, functionId)
```

`func.execute()` takes `Data` as a parameter and executes your function.

`func.execution` is an [execution object](https://appwrite.io/docs/models/execution) that also has a `data` field which contains the deserialized json from the server, typed as `ReturnData`.

`func.execution` becomes available after you call `func.execute`.

### Example

Here's an example that assumes you have a cloud function that takes an object containing an array of numbers, and returns an object containing the result of summing those numbers up.

```typescript
export default function MyComponent() {
  const [sum] = useFunction<{ numbers: [] }, { result: number }>(appwrite, 'myFunctionId')

  const handleClick = () => {
    sum.execute({ numbers: [1, 2, 3, 4, 5] })
  }

  useEffect(() => {
    // Here we access the result of the calculation, but we could also access any other info regarding the execution.
    const result = sum.execution?.data?.result // 1 + 2 + 3 + 4 + 5 = 15

    // ...
  }, [sum.execution])

  return <span onClick={handleClick}>{sum.execution?.data?.result}</span>
}
```