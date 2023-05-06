'use client'

import { useState } from 'react'
import { useTeam, useTeamCreateMembership, useTeamMembers, useTeamRename } from 'react-appwrite/teams'
import { FiLink } from 'react-icons/fi'

type Props = {
  params: {
    teamId: string,
  }
}

export default function TeamPage({ params: { teamId } }: Props) {
  const { data: team } = useTeam(teamId)
  const { data: members } = useTeamMembers(teamId)
  const [newMemberEmail, setNewMemberEmail] = useState("")
  const [newName, setNewName] = useState("")
  const renameTeam = useTeamRename();
  const inviteMember = useTeamCreateMembership();

  return (
    <div className='flex flex-col justify-center items-center flex-1 gap-2'>
      <h1 className='text-2xl'>
        {team?.name}
      </h1>
      <div className="flex items-center justify-center gap-4">
        <form className='bg-white text-black rounded-sm p-4 flex flex-col items-center justify-center gap-4' onSubmit={async (e) => {
          e.preventDefault();
          await renameTeam.mutateAsync({ teamId: team?.$id as string, name: newName })
          setNewName("")
        }}>
          <span>Update team</span>
          <input type="text" placeholder='New team name' className='text-white' value={newName} onChange={(e) => {
            setNewName(e.target.value)
          }} />
          <button onClick={() => {
          }} className='p-2 bg-blue-500 rounded-md w-full'>Submit</button>
        </form>
        <form className='bg-white text-black rounded-sm p-4 flex flex-col items-center justify-center gap-4' onSubmit={async (e) => {
          e.preventDefault();
          await inviteMember.mutateAsync({ email: newMemberEmail, roles: [], teamId: team?.$id as string, url: document.location.href }).then(() => {
            alert(`Invite sent to ${newMemberEmail} succesfully!`)
          })
          setNewMemberEmail("")
        }}>
          <span>Invite member</span>
          <div className='flex items-center font-bold gap-2'> requires SMTP enabled <a href='https://appwrite.io/docs/email-delivery' target='_blank'><FiLink /></a></div>
          <input type="email" placeholder='New member email' className='text-white' value={newMemberEmail} onChange={(e) => {
            setNewMemberEmail(e.target.value)
          }} />
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