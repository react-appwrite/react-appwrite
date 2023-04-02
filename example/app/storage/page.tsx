'use client'

import { useEffect } from 'react'
import { useFile, useBucket, useFileDelete, useFileDownload, useFileUpload, useFileView, useFilePreview } from 'react-appwrite/storage'
import Image from 'next/image'

export default function StoragePage() {
  const upload = useFileUpload()
  const { data } = useFile('test', 'test')
  const deleteFile = useFileDelete()
  // const testPreview = useFilePreview('test', 'test')
  const download = useFileDownload()
  const fileView = useFileView()
  const { data: uploadedImages } = useBucket("test")
  const { data: preview } = useFilePreview('test', 'test', { height: 100, width: 100})

  useEffect(() => {
    download.mutate({ bucketId: 'test', fileId: 'test' })
  }, [])

  useEffect(() => {
    fileView.mutate({ bucketId: 'test', fileId: 'test' })
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
        <a
          download={data?.name}
          className="success button"
          href={fileView.data?.href}
        >
          Get File for View
        </a>
      </div>
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
      {preview ? <Image width={100} height={100} src={preview.href} alt="Preview Image" /> : <p>Could not load preview.</p>}
    </div>
  )
}