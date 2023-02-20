# Database Hooks

These hooks automatically subscribe to realtime updates.

## useCollection

```typescript
import { useCollection } from 'react-appwrite-hooks/database'

// In your component.
const { data: collection } = useCollection<Model>(databaseId, collectionId)
```

`collection` is an array of [documents](https://appwrite.io/docs/models/document) that also contain the fields from `Model`.

---

## useDocument

```typescript
import { useDocument } from 'react-appwrite-hooks/database'

// In your component.
const { data: document } = useDocument<Model>(databaseId, collectionId, documentId)
```

`document` is a [document](https://appwrite.io/docs/models/document) that also contains the fields from `Model`.

### Example

