import React, { useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import { useAccount } from 'react-appwrite-hooks/account'
import { useFunction } from 'react-appwrite-hooks/functions'
import { useCollection } from 'react-appwrite-hooks/database'
import { Formik } from 'formik'
import AppwriteContext from '../components/AppwriteContext'

type SumProps = {
  numbers: number[],
}

type SumResult = {
  result: number,
}

export default function Sum({ }) {
  const appwrite = useContext(AppwriteContext)
  const router = useRouter()
  const [sum] = useFunction<SumProps, SumResult>(appwrite, process.env.NEXT_PUBLIC_APPWRITE_FUNCTION as string)

  const handleSubmitClick = async ({ numbers }: { numbers: string }) => {
    sum.execute({ numbers: numbers.split(',').map(number => Number(number)) })
    router.push('/sum')
  }

  useEffect(() => {
    const result = sum.execution?.data.result

    if (result !== undefined) {
      alert(`Sum is ${result}`)
      router.push('/')
    }
  }, [sum.execution])

  return (
    <main className="container flex items-center">
      <Formik
        initialValues={{ numbers: '' }}
        onSubmit={handleSubmitClick}
      >
        {
          props => (
            <form className="mx-auto space-y-4 w-96" onSubmit={props.handleSubmit}>
              <h1 className="mb-4 text-3xl">Sum</h1>

              <label htmlFor="numbers">Numbers</label>

              <input
                type="text"
                id="numbers"
                name="numbers"
                placeholder="1,2,3,4,5"
                value={props.values.numbers}
                onChange={props.handleChange}
              />

              <button type="submit">Submit</button>
              <span className="ml-4">{sum.execution?.status}</span>
            </form>
          )
        }
      </Formik>
    </main>
  )
}