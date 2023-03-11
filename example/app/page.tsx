'use client'
import { useAccount, useOAuth2SignIn } from 'react-appwrite/account'
import { useForm } from 'react-hook-form'
import { ID } from 'appwrite'

import { useEmailSignIn, useEmailSignUp } from 'react-appwrite/account'

type Props = {}

type Form = {
  email: string,
  password: string,
  create: boolean,
}

function HomePage() {
  const { data: account } = useAccount()

  const signIn = useEmailSignIn()
  const signUp = useEmailSignUp()
  const oAuthSignIn = useOAuth2SignIn()

  const { register, handleSubmit } = useForm()

  const onSubmit = async (data: Form) => {
    console.log({ data })

    if (data.create) {
      signUp.mutateAsync(data)
    }
    else {
      signIn.mutateAsync(data)
    }
  }

  return (
    <div className="container flex flex-1">
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

        <div className="flex items-center gap-2">
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
          className="success button"
          type="submit"
        >
          Sign in
        </button>

        <button
          type="button"
          className="primary button"
          onClick={() => {
            oAuthSignIn.mutate({
              provider: 'google',
              successUrl: 'http://localhost:3000/ssr',
              failureUrl: '',
            })
          }}
        >
          Google sign in
        </button>

        {
          account &&
          <p>
            Signed in as {account.email}
          </p>
        }
      </form>
    </div>
  )
}

export default HomePage