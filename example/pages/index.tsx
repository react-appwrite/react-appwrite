import React, { useEffect } from 'react'
import { Appwrite } from 'appwrite'
import { useAccount, useFunction } from 'react-appwrite-hooks'

const appwrite = new Appwrite()

appwrite
  .setEndpoint('http://localhost/v1')
  .setProject('6185b167517e2')

export default function Home({ }) {
  // const [account] = useAccount(appwrite)
  const [sum] = useFunction<{ numbers: number[] }, { result: number }>(appwrite, '')

  useEffect(() => {
    console.log(`Sum is ${sum.execution?.data.result}`)
  }, [sum.execution])

  return (
    <main>
      <button onClick={() => sum.execute({ numbers: [1, 2, 3, 4, 5] })}>Execute</button>
    </main>
  )
}