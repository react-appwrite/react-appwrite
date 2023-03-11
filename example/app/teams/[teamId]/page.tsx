'use client'

import { usePathname } from 'next/navigation'
import { useTeam, useTeamMembers } from 'react-appwrite/teams'

type Props = {
  params: {
    teamId: string,
  }
}

export default function TeamPage({ params: { teamId } }: Props) {
  const { data: team } = useTeam(teamId)
  const { data: members } = useTeamMembers(teamId)

  return (
    <div className="flex flex-col items-center justify-center flex-1">
      <h1>
        {team?.name}
      </h1>

      <ul>
        {
          members?.map(member => (
            <li
              key={member.$id}
            >
              • {member.userName}
            </li>
          ))
        }
      </ul>
    </div>
  )
}