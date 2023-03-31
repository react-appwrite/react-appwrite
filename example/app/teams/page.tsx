'use client'

import Link from 'next/link';
import { useState } from 'react';
import { useTeamCreate, useTeamDelete, useTeams } from 'react-appwrite/teams'
import { FiExternalLink, FiDelete } from "react-icons/fi"

export default function TeamsPage() {
  const { data: teams } = useTeams()
  const createTeam = useTeamCreate();
  const deleteTeam = useTeamDelete();
  const [newTeamName, setNewTeamName] = useState("")

  return (
    <div className="flex items-center justify-center gap-4 flex-1">
      <form className='bg-white text-black rounded-sm p-4 flex flex-col items-center justify-center gap-4' onSubmit={async (e) => {
        e.preventDefault();
        await createTeam.mutateAsync({name: newTeamName})
        setNewTeamName("")
      }}>
        <span>Create new Team</span>
        <input type="text" placeholder='New team name' className='text-white' value={newTeamName} onChange={(e) => {
          setNewTeamName(e.target.value)
        }}/>
      <button onClick={() => {
      }} className='p-2 bg-blue-500 rounded-md w-full'>Submit</button>
      </form>
      <div className='flex flex-col gap-4 items-center justify-center'>
        {
          teams?.map((team, idx) => (
            <div className='flex gap-2 items-center justify-center w-full'>
            <Link
            href={`/teams/${team.$id}`}
            key={team.$id}
            className='bg-white rounded-sm text-black p-2 w-full flex gap-2 items-center justify-between'
            >
              {team.name}
              <FiExternalLink />
            </Link>
            <FiDelete className='cursor-pointer' size={32} onClick={async () => {
              await deleteTeam.mutateAsync({teamId: team.$id})
            }}/>
            </div>
          ))
        }
      </div>
    </div>
  )
}