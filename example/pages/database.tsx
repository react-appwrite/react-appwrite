import React, { useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import { useCollection, useDocument } from 'react-appwrite-hooks/database'
import { Formik } from 'formik'
import AppwriteContext from '../components/AppwriteContext'

export default function Database({ }) {
  const collectionId = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION as string
  const documentId = process.env.NEXT_PUBLIC_APPWRITE_DOCUMENT as string

  const appwrite = useContext(AppwriteContext)
  const router = useRouter()

  const [collection] = useCollection(appwrite, collectionId)
  const [doc] = useDocument<{ name: string }>(appwrite, collectionId, documentId)

  const handleSubmitClick = async ({ name }: { name: string }) => {
    appwrite
      .database
      .updateDocument(collectionId, documentId, { name })
  }

  useEffect(() => {
    // console.log('Collection', collection)
  }, [collection])

  return (
    <main className="container flex items-center">
      <Formik
        initialValues={{ name: '' }}
        onSubmit={handleSubmitClick}
      >
        {
          props => (
            <form className="mx-auto space-y-4 w-96" onSubmit={props.handleSubmit}>
              <h1 className="mb-4 text-3xl">Database</h1>

              <label htmlFor="name">Name</label>

              <input
                type="text"
                id="name"
                name="name"
                value={props.values.name}
                onChange={props.handleChange}
              />

              <button type="submit">Submit</button>
              <span className="ml-4">{doc?.name}</span>
            </form>
          )
        }
      </Formik>
    </main>
  )
}