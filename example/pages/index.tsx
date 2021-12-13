import React, { useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import { useAccount } from 'react-appwrite-hooks/account'
import { useFunction } from 'react-appwrite-hooks/functions'
import { useCollection } from 'react-appwrite-hooks/database'
import { Formik } from 'formik'
import AppwriteContext from '../components/AppwriteContext'

type CreateAccountProps = {
  email: string,
  password: string,
}

export default function Home({ }) {
  const appwrite = useContext(AppwriteContext)
  const router = useRouter()
  const [account] = useAccount(appwrite)
  const [collection] = useCollection(appwrite, process.env.NEXT_PUBLIC_APPWRITE_COLLECTION as string)
  const [sum] = useFunction<{ numbers: number[] }, { result: number }>(appwrite, process.env.NEXT_PUBLIC_APPWRITE_FUNCTION as string)

  const handleSubmitClick = async ({ email, password }: CreateAccountProps) => {
    await appwrite.account.create(email, password)
    await appwrite.account.createSession(email, password)

    router.push('/sum')
  }

  useEffect(() => {
    console.log('Account is', account)
    console.log('Collection is', collection)
    console.log(`Sum is ${sum.execution?.data.result}`)
  }, [account, collection, sum.execution])

  return (
    <main className="container flex items-center">
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={handleSubmitClick}
      >
        {
          props => (
            <form className="mx-auto space-y-4 w-96" onSubmit={props.handleSubmit}>
              <h1 className="mb-4 text-3xl">Create Account</h1>

              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" value={props.values.email} onChange={props.handleChange} />

              <label htmlFor="password">Password</label>
              <input type="password" id="password" name="password" value={props.values.password} onChange={props.handleChange} />

              <button type="submit">Submit</button>
            </form>
          )
        }
      </Formik>
    </main>
  )
}