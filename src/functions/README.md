# Functions Hooks

## useFunction

```tsx
import { useFunction } from 'react-appwrite-hooks/functions'

// In your component.
const sum = useFunction<Request, Response>(functionId)
```

### Example

This example assumes you have a cloud function that takes an array of numbers, and returns the sum of those numbers.

```tsx
type Request = number[]
type Response = number

function MyComponent() {
  const sum = useFunction<Request, Response>('sum')
  const [text, setText] = useState('')

  const handleClick = async () => {
    const request = text.split(' ').map(digit => Number(digit))
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