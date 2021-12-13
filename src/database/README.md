# Database Hooks

## useCollection

```typescript
import { useCollection } from 'react-appwrite-hooks/database'

// In your component.
const [collection, isLoading, error] = useCollection<Model>(appwrite, collectionId, options?)
```

`collection` is an array of [documents](https://appwrite.io/docs/models/document) that also contain the fields from `Model`.

`options` is an optional object containing all the extra fields from [`appwrite.database.listDocuments`](https://appwrite.io/docs/client/database#databaseListDocuments).

Currently, this hook is inefficient when there are a lot of documents being created in the collection. This is because Appwrite does not have the ability to listen to queries, and so this library re-executes your query every time it is notified of a document being created.

Delete and update operations should work fine and efficiently.

---

## useDocument

```typescript
import { useDocument } from 'react-appwrite-hooks/database'

// In your component.
const [doc, isLoading, error] = useDocument<Model>(appwrite, collectionId, documentId)
```

`doc` is a [document](https://appwrite.io/docs/models/document) that also contains the fields from `Model`.