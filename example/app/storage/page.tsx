'use client'
import { useEffect } from 'react'
import { useFile, useFileDelete, useFileDownload, useFileUpload } from 'react-appwrite/storage'

export default function StoragePage() {
  const upload = useFileUpload()
  const { data } = useFile('test', 'test')
  const deleteFile = useFileDelete()
  // const testPreview = useFilePreview('test', 'test')
  const download = useFileDownload()

  useEffect(() => {
    download.mutate({ bucketId: 'test', fileId: 'test' })
  }, [])

  return (
    <div>
      <div className="flex gap-2">
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

        <button
          type="button"
          className="error button"
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

      <div>
        {
          upload.isLoading &&
          <span>
            Loading
          </span>
        }

        {
          data &&
          <p>
            {data.name}
          </p>
        }

        <a
          download={data?.name}
          className="success button"
          href={download.data?.href}
        >
          Download
        </a>
      </div>
    </div>
  )
}