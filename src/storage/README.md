# Storage Hooks

## useBucket

```tsx
import { useBucket } from 'react-appwrite/storage'
import { Query } from 'appwrite'

function UploadedImagesList() {
  const bucketId = 'myBucket'
  
  const { data: uploadedImages } = useBucket(bucketId, [
    Query.orderDesc('$updatedAt')
  ])
  
  return (
    <ol>
      {
        uploadedImages?.map(image => (
          <li
            key={image.$id}
          >
            {image.name}
          </li>
        ))
      }
    </ol>
  )
}
```

## useFile

```typescript
import { useFile } from 'react-appwrite/storage'

// In your component.
const { data: file } = useFile(bucketId, fileId)
```

`file` is a [user object](https://appwrite.io/docs/models/file).

---

## useFileDelete

```typescript
import { useFileDelete } from 'react-appwrite/storage'

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
import { useFileUpdate } from 'react-appwrite/storage'

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
import { useFileUpload } from 'react-appwrite/storage'

// In your component.
const uploadFile = useFileUpload()

uploadFile.mutateAsync({
  bucketId,
  fileId,
  file,
  permissions,
})
```

---

## useFileDownload

```typescript
import { useFileDownload } from 'react-appwrite/storage'

// In your component.
const downloadFile = useFileDownload()

downloadFile.mutateAsync({
  bucketId,
  fileId,
})
```

---

## useFileView

```typescript
import { useFileView } from 'react-appwrite/storage'

// In your component.
const viewFile = useFileView()

viewFile.mutateAsync({
  bucketId,
  fileId,
})
```

---

## useFilePreview

```typescript
import { useFilePreview } from 'react-appwrite/storage'

// In your component.
 const { data: preview} = useFilePreview('test', 'test', { width: 100, height: 100 })

 <Image width={100} height={100} src={preview.href} alt="Preview Image" />
```