'use client'

import { useTeamCreate, useTeams } from 'react-appwrite/teams'

export default function TeamsPage() {
  const { data: teams } = useTeams()
  const createTeam = useTeamCreate();

  return (
    <div className="flex flex-col items-center justify-center flex-1">
      <h1>
        Teams
      </h1>
      <button onClick={() => {
        createTeam.mutate({name: "Nice Team"})
      }}>Create team</button>
      <ul>
        {
          teams?.map(team => (
            <li
              key={team.$id}
            >
              • {team.name}
            </li>
          ))
        }
      </ul>
    </div>
  )
}