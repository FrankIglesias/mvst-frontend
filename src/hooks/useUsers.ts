import { useLazyQuery } from '@apollo/client';
import { gql } from '../__generated__';
import { useCallback } from 'react';
import { debounce } from 'lodash';
import { User } from '../__generated__/graphql';
/**
 * This is a query to search for users on GitHub.
 * It returns the first 5 users that match the query.
 * The query is debounced to avoid making too many requests.
 * @param query The query to search for users.
 * @returns The users that match the query.
 * @see https://docs.github.com/en/graphql/reference/objects#user
 */
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

/**
 * This hook is used to search for users on GitHub.
 * It returns the first 5 users that match the query.
 * The query is debounced to avoid making too many requests.
 * @returns {Object} The users that match the query.
 */
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
