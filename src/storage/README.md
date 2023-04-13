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

```tsx
import { useFile } from 'react-appwrite/storage'

function FileLabel() {
  const bucketId = 'photos'
  const fileId = 'headshot.png'

  const { data: file, isLoading } = useFile(bucketId, fileId)

  if (file) {
    return (
      <span>
        {file.name} - {file.sizeOriginal}
      </span>
    )
  }

  return (
    <span>
      Loading
    </span>
  )
}
```

---

## useFileDelete

```tsx
import { useFileDelete } from 'react-appwrite/storage'

function PhotoDeleteButton() {
  const bucketId = 'photos'
  const fileId = 'headshot.png'
  const deleteFile = useFileDelete()

  return (
    <button
      type="button"
      onClick={() => deleteFile.mutate({
        bucketId,
        fileId,
      })
    >
      Delete
    </button>
  )
}
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

```tsx
import { useFileUpload } from 'react-appwrite/storage'

function ImageUploader() {
  const bucketId = 'photos'
  const upload = useFileUpload()

  return (
    <form>
      <input
        type="file"
        onChange={event => {
          const file = event.target?.files?.[0]

          if (file) {
            upload.mutate({
              bucketId,
              file,
            })
          }
        }}
      />
    </form>
  )
}
```

---

## useFileDownload

```tsx
import { useFileDownload } from 'react-appwrite/storage'

function DownloadButton() {
  const bucketId = 'photos'
  const fileId = 'headshot.png'
  const { data: download } = useFileDownload(bucketId, fileId)

  return (
    <a
      download
      href={download?.href}
    >
      Download
    </a>
  )
}
```

---

## useFileView

```tsx
import { useFileView } from 'react-appwrite/storage'

function OpenImageButton() {
  const bucketId = 'photos'
  const fileId = 'headshot.png'
  const { data: view } = useFileView(bucketId, fileId)

  return (
    <a
      href={view?.href}
    >
      Open Image
    </a>
  )
}
```

---

## useFilePreview

```tsx
import { useFilePreview } from 'react-appwrite/storage'

function FilePreview() {
  const bucketId = 'photos'
  const fileId = 'headshot.png'
  const { data: preview } = useFilePreview(bucketId, fileId, {
    dimensions: {
      width: 100,
      height: 100,
    }
  })

  if (preview) {
    return (
      <Image
        width={100}
        height={100}
        src={preview?.href}
        alt="Preview Image"
      />
    )
  }

  return (
    <span>
      No preview available
    </span>
  )
}
```