'use client'
import { useFile, useFileDelete, useFileDownload, useFileUpload } from 'react-appwrite-hooks/storage'

export default function StoragePage() {
  const upload = useFileUpload()
  const { data } = useFile('test', 'test')
  const deleteFile = useFileDelete()

  return (
    <div>
      <input
        type="file"
        onChange={event => {
          const file = event.target?.files?.[0]

          if (file) {
            upload.mutate({
              bucketId: 'test',
              fileId: 'test',
              file,
            })
          }
        }}
      />

      {
        upload.isLoading &&
        <span>
          Loading
        </span>
      }

      {
        data &&
        <span>
          {data.name}
        </span>
      }

      <button
        type="button"
        onClick={() => {
          const url = deleteFile.mutate({
            bucketId: 'test',
            fileId: 'test',
          })
        }}
      >
        Delete
      </button>
    </div>
  )
}