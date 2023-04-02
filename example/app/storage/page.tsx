'use client'

import { useEffect, useState } from 'react'
import { useFile, useBucket, useFileDelete, useFileDownload, useFileUpload, useFileView, useFilePreview } from 'react-appwrite/storage'
import { FiExternalLink, FiDelete, FiImage, FiTrash, FiFile, FiDownload } from "react-icons/fi"
import Image from 'next/image'
import { ID, Models } from 'appwrite'

export default function StoragePage() {
  const upload = useFileUpload()
  const { data } = useFile('test', '6428a8b2f3e353df1be3')
  const download = useFileDownload()
  const { data: uploadedFiles } = useBucket("test")

  useEffect(() => {
    download.mutate({ bucketId: 'test', fileId: 'test' })
  }, [])

  return (
    <div className="flex items-center justify-center gap-4 flex-1">
      <form className='bg-white text-black rounded-sm p-4 flex flex-col items-center justify-center gap-4' onSubmit={async (e) => {
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
                fileId: ID.unique(),
                file,
              })
            }
          }}
        />
      </form>
      <div className='flex flex-col gap-4 items-center justify-center'>
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
  const { data: preview } = useFilePreview('test', file.$id, { height: 50, width: 50})
  const { data: fileView } = useFileView('test', file.$id)
  const deleteFile = useFileDelete()

  console.log(preview)

  return (
    <div className='flex gap-2 items-center justify-center w-full'>
      <div
      key={file.$id}
      className='bg-white rounded-sm text-black p-2 w-full flex gap-2 items-center justify-between'
      >
        {preview && <Image src={preview.href} alt={`${file.name} Preview`} height={50} width={50} />}
        {file.name}
      </div>
      <a href={fileView?.href} download>
        <FiDownload className='cursor-pointer' size={20}/>
        <p className='sr-only'>Download</p>
      </a>
      <FiTrash className='cursor-pointer' size={20} onClick={async () => {
        await deleteFile.mutateAsync({bucketId: "test", fileId: file.$id})
      }}/>
    </div>
  )
}