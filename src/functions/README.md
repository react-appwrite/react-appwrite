# Functions Hooks

➡️ [Appwrite Documentation](https://appwrite.io/docs/client/functions)

## useFunction

```tsx
import { useFunction } from 'react-appwrite/functions'

function Component() {
  const cloudFunction = useFunction<TRequest, TResponse>(functionId)

  useEffect(() => {
    console.log('Cloud function finished executing with', cloudFunction.data)
  }, [cloudFunction.data])

  return (
    <button
      onClick={async () => {
        const response = await cloudFunction.mutateAsync(request)
      }}
    >
      Execute
    </button>
  )
}

```

### Example

This example assumes you have a cloud function that takes an array of numbers, and returns the sum of those numbers.

```tsx
type TRequest = number[]
type TResponse = number

function Component() {
  const sum = useFunction<TRequest, TResponse>('sum')
  const [text, setText] = useState('')

  const handleClick = async () => {
    const request = text.split(' ').map(number => Number(number))
    const response = await sum.mutateAsync(request)

    console.log('The result is', result)
  }

  return (
    <div>
      <input
        type="text"
        value={text}
        onChange={event => setText(event.target.value)}
      />

      <button
        onClick={handleClick}
      >
        Sum
      </button>

      <p>
        Result: {sum.data ?? 'None'}
      </p>

      <p>
        Status: {sum.status}
      </p>
    </div>
  )
}
```
![useFunction example](/docs/functions/images/useFunction.gif)