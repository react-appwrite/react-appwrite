# Functions Hooks

➡️ [Appwrite Documentation](https://appwrite.io/docs/client/functions)

## useFunction

```tsx
type TRequest = number[]
type TResponse = number

function SumCalculator() {
  const functionId = 'sum'
  const sum = useFunction<TRequest, TResponse>(functionId)
  const [text, setText] = useState('')

  const handleClick = async () => {
    const request = text.split(' ').map(number => Number(number))
    const response = await sum.mutateAsync(request)

    console.log('The result is', response)
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
        Execute
      </button>

      <p>
        Status: {sum.status}
      </p>

      <p>
        Result: {sum.data ?? 'None'}
      </p>
    </div>
  )
}
```
![useFunction example](/docs/functions/images/useFunction.gif)