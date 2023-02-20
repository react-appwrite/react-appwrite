# Storage Hooks

## useAccount

```typescript
import { useFile } from 'react-appwrite-hooks/storage'

// In your component.
const { data: file } = useFile<Preferences>(bucketId, fileId)
```

`file` is a [user object](https://appwrite.io/docs/models/file).

---

## useFileDelete

```typescript
import { useFileDelete } from 'react-appwrite-hooks/storage'

// In your component.
const deleteFile = useFileDelete()

deleteFile.mutateAsync({
  bucketId,
  fileId,
})
```

---

## useFileUpdate

```typescript
import { useFileUpdate } from 'react-appwrite-hooks/storage'

// In your component.
const updateFile = useFileUpdate()

updateFile.mutateAsync({
  bucketId,
  fileId,
  permissions,
})
```

---

## useFileUpload

```typescript
import { useFileUpload } from 'react-appwrite-hooks/storage'

// In your component.
const uploadFile = useFileUpload()

uploadFile.mutateAsync({
  bucketId,
  fileId,
  file,
  permissions,
})
```