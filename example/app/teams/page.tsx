'use client'

import { useTeams } from 'react-appwrite/teams'

export default function TeamsPage() {
  const { data: teams } = useTeams()

  return (
    <div className="flex flex-col items-center justify-center flex-1">
      <h1>
        Teams
      </h1>

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