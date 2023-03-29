'use client'
import { useAccount, useOAuth2SignIn, useSignOut } from 'react-appwrite/account'
import { useAvatar } from 'react-appwrite/avatars'
import { useForm } from 'react-hook-form'
import { ID } from 'appwrite'

import { useEmailSignIn, useEmailSignUp } from 'react-appwrite/account'
import { useRouter } from 'next/navigation'

type Props = {}

type Form = {
  email: string,
  password: string,
  create: boolean,
}

function AuthPage() {
  const router = useRouter()
  const { data: account } = useAccount()

  const signIn = useEmailSignIn()
  const signUp = useEmailSignUp()
  const signOut = useSignOut()
  const oAuthSignIn = useOAuth2SignIn()

  const { register, handleSubmit, watch } = useForm()
  const create = watch('create')

  const onSubmit = async (data: Form) => {
    console.log({ data })

    try {
      if (data.create) {
        await signUp.mutateAsync(data)
      }
      else {
        await signIn.mutateAsync(data)
      }

      router.push('/')
    }

    catch (error) {
      throw error
    }
  }

  return (
    <div className="container flex flex-col flex-1 py-4">
      <h1 className="text-6xl font-bold text-center">
        Sign In
      </h1>

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
            Create this account instead
          </label>
        </div>

        <button
          className="success button"
          type="submit"
        >
          {
            create
              ? 'Sign up'
              : 'Sign in'
          }
        </button>

        <button
          type="button"
          className="primary button"
          onClick={() => {
            oAuthSignIn.mutate({
              provider: 'google',
              successUrl: 'http://localhost:3000',
              failureUrl: '',
            })
          }}
        >
          Google sign in
        </button>

        <button
          type="button"
          className="error button"
          onClick={() => {
            signOut.mutateAsync()
          }}
        >
          Sign out
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

export default AuthPage