'use client'
import { useQueryClient } from '@tanstack/react-query'
import { useFile, useFileUpload } from 'react-appwrite-hooks/storage'

export default function StoragePage() {
  const upload = useFileUpload('test', 'test')
  const { data } = useFile('test', 'test')

  return (
    <div>
      <input
        type="file"
        onChange={event => {
          const file = event.target?.files?.[0]

          if (file) {
            upload.mutate({
              file
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
    </div>
  )
}