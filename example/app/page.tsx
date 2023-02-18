'use client'
import { useAccount } from 'react-appwrite-hooks/account'
import { AppwriteContext, useEmailSignIn } from 'react-appwrite-hooks'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { ID } from 'appwrite'

type Props = {}

type Form = {
  email: string,
  password: string,
  create: boolean,
}

function HomePage() {
  const { data: account } = useAccount({
    refetchOnWindowFocus: false,
  })

  const signIn = useEmailSignIn()

  const { account: accountService } = useContext(AppwriteContext)
  const { register, handleSubmit } = useForm()

  const onSubmit = async (data: Form) => {
    console.log({ data })

    if (data.create) {
      const a = await accountService.create(ID.unique(), data.email, data.password)

      console.log({ a })
    }
    else {
      const a = await signIn.mutateAsync(data)

      console.log({ a })
    }
  }

  console.log({ account })

  return (
    <div className="container flex h-full">
      <form
        // @ts-ignore
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col m-auto space-y-4"
      >
        <input
          type="text"
          placeholder="Email"
          {...register("email")}
        />

        <input
          type="text"
          placeholder="Password"
          {...register("password")}
        />

        <div className="flex gap-2">
          <input
            defaultChecked
            type="checkbox"
            id="create"
            {...register("create")}
          />

          <label
            htmlFor="create"
          >
            Create
          </label>
        </div>

        <button
          type="submit"
        >
          Sign in
        </button>
      </form>

      {
        account &&
        <h1>
          Signed in as {account.email}
        </h1>
      }
    </div>
  )
}

export default HomePage