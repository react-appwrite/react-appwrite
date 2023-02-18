'use client'
import { useContext, useEffect } from 'react'
import { useFunction } from 'react-appwrite-hooks/functions'
import { useForm } from 'react-hook-form'

type Props = {}

type Form = {
  numbers: string,
}

export default function FunctionsPage({ }: Props) {
  const sum = useFunction<{ numbers: number[] }, { result: number }>('sum')
  const { register, handleSubmit } = useForm()

  const onSubmit = async (data: Form) => {
    await sum.mutateAsync({ numbers: data.numbers.split(',').map(number => Number(number)) })
  }

  return (
    <form
      // @ts-ignore
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col m-auto space-y-4"
    >
      <input
        type="text"
        placeholder="Numbers"
        {...register("numbers")}
      />

      <button
        type="submit"
      >
        Execute
      </button>

      <span>
        Status: {sum.status}
      </span>

      <span>
        Result: {sum.data?.result}
      </span>
    </form>
  )
}