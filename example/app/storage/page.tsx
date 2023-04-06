'use client'

import { useEffect } from 'react'
import { useFile, useBucket, useFileDelete, useFileDownload, useFileUpload, useFileView, useFilePreview } from 'react-appwrite/storage'
import { FiTrash, FiDownload } from "react-icons/fi"
import Image from 'next/image'
import { ID, Models } from 'appwrite'

export default function StoragePage() {
  const upload = useFileUpload()
  const { data: uploadedFiles } = useBucket("test")

  return (
    <div className="flex items-center justify-center flex-1 gap-4">
      <form className='flex flex-col items-center justify-center gap-4 p-4 text-black bg-white rounded-sm' onSubmit={async (e) => {
        e.preventDefault();
      }}>
        <span>Upload Image</span>
        <input
          type="file"
          onChange={event => {
            const file = event.target?.files?.[0]

            if (file) {
              upload.mutate({
                bucketId: 'test',
                file,
              })
            }
          }}
        />
      </form>
      <div className='flex flex-col items-center justify-center gap-4'>
        {
          uploadedFiles?.map((file) => (
            <FileListItem file={file} key={file.$id} />
          ))
        }
      </div>
    </div>
  )
}

function FileListItem({ file }: { file: Models.File }) {
  const { data: preview } = useFilePreview('test', file.$id, {
    dimensions: {
      width: 50,
      height: 50,
    },
  })

  const { data: fileDownload } = useFileDownload('test', file.$id)
  const deleteFile = useFileDelete()

  console.log(preview)

  return (
    <div className='flex items-center justify-center w-full gap-2'>
      <div
        key={file.$id}
        className='flex items-center justify-between w-full gap-2 p-2 text-black bg-white rounded-sm'
      >
        {preview && <Image src={preview.href} alt={`${file.name} Preview`} height={50} width={50} />}
        {file.name}
      </div>
      <a href={fileDownload?.href} download>
        <FiDownload className='cursor-pointer' size={20} />
        <p className='sr-only'>Download</p>
      </a>
      <FiTrash className='cursor-pointer' size={20} onClick={async () => {
        await deleteFile.mutateAsync({ bucketId: "test", fileId: file.$id })
      }} />
    </div>
  )
}