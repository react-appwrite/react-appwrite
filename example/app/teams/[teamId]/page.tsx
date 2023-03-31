'use client'

import { useState } from 'react'
import { useTeam, useTeamMembers, useTeamUpdate } from 'react-appwrite/teams'

type Props = {
  params: {
    teamId: string,
  }
}

export default function TeamPage({ params: { teamId } }: Props) {
  const { data: team } = useTeam(teamId)
  const { data: members } = useTeamMembers(teamId)
  const [newName, setNewName] = useState("")
  const updateTeam = useTeamUpdate();

  return (
    <div className='flex flex-col justify-center items-center flex-1 gap-2'>
      <h1 className='text-2xl'>
        {team?.name}
      </h1>
    <div className="flex items-center justify-center gap-4">
      <form className='bg-white text-black rounded-sm p-4 flex flex-col items-center justify-center gap-4' onSubmit={async (e) => {
        e.preventDefault();
        await updateTeam.mutateAsync({teamId: team?.$id as string,name: newName})
        setNewName("")
      }}>
        <span>Update team</span>
        <input type="text" placeholder='New team name' className='text-white' value={newName} onChange={(e) => {
          setNewName(e.target.value)
        }}/>
      <button onClick={() => {
      }} className='p-2 bg-blue-500 rounded-md w-full'>Submit</button>
      </form>
      <div className='flex flex-col justify-center items-center'>
        <h1 className='font-bold'>
          Team Members
        </h1>
        {
          members?.map(member => (
            <div
            key={member.$id}
            className='bg-white rounded-sm text-black p-2 w-full flex gap-2 items-center justify-between'
            >
              {member.userEmail}
            </div>
          ))
        }
      </div>
    </div>
    </div>
  )
}