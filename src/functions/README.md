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