# Account Hooks

## useAccount

```typescript
import { useAccount } from 'react-appwrite-hooks/account'

// In your component.
const [account, isLoading, error] = useAccount<Preferences>(appwrite)
```

`account` is a [user object](https://appwrite.io/docs/models/user). This hook currently doesn't work properly because of the ["Authentication with Existing Subscription"](https://appwrite.io/docs/realtime#known-limitations) issue with Appwrite.