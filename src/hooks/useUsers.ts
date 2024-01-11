import { useLazyQuery } from '@apollo/client';
import { gql } from '../__generated__';
import { useCallback } from 'react';
import { debounce } from 'lodash';
import { User } from '../__generated__/graphql';

export const USERS_QUERY = gql(`
query Users($query: String!) {
  search(type:USER query: $query first: 5) {
    nodes {
      ... on User {
        id
        login
        avatarUrl
      }
    }
  }
}
`);


export function useUsers() {
  const [search, { data, loading, error }] = useLazyQuery(USERS_QUERY);

  const handleSearch = useCallback(
    debounce((userName: string) => {
      search({
        variables: {
          query: userName,
        },
      });
    }, 500),
    [search]
  );

  return {
    data: data?.search?.nodes as Array<User> ?? [],
    loading,
    error,
    search: handleSearch,
  };
}
