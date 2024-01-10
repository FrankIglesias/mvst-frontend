import { useLazyQuery, useQuery } from '@apollo/client';
import { gql } from '../__generated__';
import { useCallback } from 'react';
import { debounce } from 'lodash';

const REPOSITORIES_QUERY = gql(`
  query Repositories($userName: String!, $cursor: String) {
    user(login: $userName) {
      repositories(first: 10, after: $cursor) {
        nodes {
          id
          name
          description
          url
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  }
`);

const USERS_QUERY = gql(`
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

export function useRepositories(userName: string) {
  const { data, loading, error, fetchMore } = useQuery(REPOSITORIES_QUERY, {
    variables: {
      userName,
    },
  });

  const handleFetchMore = useCallback(
    () =>
      fetchMore({
        variables: {
          cursor: data?.user?.repositories.pageInfo.endCursor ?? null,
          userName,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          return Object.assign({}, prev, {
            user: {
              ...prev.user,
              repositories: {
                ...prev.user.repositories,
                nodes: [
                  ...prev.user.repositories.nodes,
                  ...fetchMoreResult.user.repositories.nodes,
                ],
                pageInfo: fetchMoreResult.user.repositories.pageInfo,
              },
            },
          });
        }
      })
    , [fetchMore, data, userName]);

  return {
    data: data?.user?.repositories.nodes ?? [],
    loading,
    error,
    fetchMore: handleFetchMore,
    hasMore: data?.user?.repositories.pageInfo.hasNextPage ?? false,
  };
}

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
    data: data?.search?.nodes ?? [],
    loading,
    error,
    search: handleSearch,
  };
}
