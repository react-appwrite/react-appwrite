'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useMemo } from 'react';
import { useAppwrite } from '..';
import { useAccount } from 'react-appwrite';

/**
 * Access to all teams the local user is a member of.
 * @link [Appwrite Documentation](https://appwrite.io/docs/client/teams?sdk=web-default#teamsList)
 */
export function useTeams() {
  const { teams } = useAppwrite();
  const { data: account } = useAccount();
  const queryClient = useQueryClient();
  const queryKey = useMemo(() => ['appwrite', 'teams'], []);
  const queryResult = useQuery({
    enabled: !!account,
    queryKey,
    queryFn: async () => {
      const response = await teams.list();

      return response.teams;
    },

    onSuccess: (teams) => {
      for (const team of teams) {
        queryClient.setQueryData(['appwrite', 'teams', team.$id], team);
      }
    },
  });

  useEffect(() => {
    const unsubscribe = teams.client.subscribe('teams', (res) => {
      console.log({ res });
    });
    return unsubscribe;
  }, []);

  return queryResult;
}
