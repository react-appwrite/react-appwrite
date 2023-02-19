'use client'
import { useContext, useEffect } from 'react'
import { useFunction } from 'react-appwrite-hooks/functions'
import { useForm } from 'react-hook-form'

const StatusDot = ({ className }: { className?: string }) => {
  return (
    // />
    <svg
      className="w-[10px] h-[10px]"

      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        fill="currentColor"
        cx="50" cy="50"
        r="50"
      />
    </svg>
  )
}

export { StatusDot }

type Props = {}

type Form = {
  digits: string,
}

type Request = number[]
type Response = number

export default function FunctionsPage({ }: Props) {
  const sum = useFunction<Request, Response>('sum')
  const { register, handleSubmit } = useForm()

  const onSubmit = async (data: Form) => {
    const numbers = data.digits.split(' ').map(digit => Number(digit))
    const result = await sum.mutateAsync(numbers)

    console.log('The result is', result)
  }

  return (
    <form
      // @ts-ignore
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center justify-center flex-1 m-auto"
    >
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Digits"
            {...register("digits")}
          />

          <button
            type="submit"
            className="success button"
          >
            Execute
          </button>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <div className={typeof sum.data !== 'undefined' ? 'text-success' : sum.error ? 'text-error' : sum.isLoading ? 'text-warning' : ''}>
              <StatusDot />
            </div>

            <span className="capitalize">
              {sum.status}
            </span>
          </div>

          <p>
            Result: {sum.data ?? 'None'}
          </p>
        </div>
      </div>
    </form>
  )
}