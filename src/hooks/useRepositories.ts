import { useLazyQuery } from '@apollo/client';
import { gql } from '../__generated__';
import { useCallback, useEffect } from 'react';
import { debounce } from 'lodash';
import { Repository } from '../__generated__/graphql';

export const REPOSITORIES_QUERY = gql(`
  query Repositories($query: String!, $cursor: String) {
    search(type:REPOSITORY query:$query first: 10, after: $cursor) {
      repositories: nodes {
        ... on Repository {
          name
          description
          url
        }
      }
      pageInfo {
          endCursor
          hasNextPage
      }
    }
  }
`);

export function useRepositories(userName: string) {
  const [search, { data, loading, error, fetchMore }] = useLazyQuery(REPOSITORIES_QUERY)

  const handleFetchMore = useCallback(
    () =>
      fetchMore({
        variables: {
          cursor: data?.search?.pageInfo.endCursor ?? null,
          userName,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          return Object.assign({}, prev, {
            search: {
              ...prev.search,
              repositories: [
                ...prev.search!.repositories as Array<Repository>,
                ...fetchMoreResult.search!.repositories as Array<Repository>,
              ],
              pageInfo: fetchMoreResult.search!.pageInfo,
            },
          });
        }
      })
    , [fetchMore, data, userName]);

  useEffect(() => {
    search({
      variables: {
        query: `owner:${userName}`,
      },
    });
  }, [search, userName]);

  const handleSearch = useCallback(
    debounce((repoName?: string) => {
      search({
        variables: {
          query: `owner:${userName} ${repoName ? `${repoName} in:name` : ''}`,
        },
      });
    }, 500),
    [search, userName]
  );

  return {
    data: data?.search?.repositories as Array<Repository> ?? [],
    loading,
    error,
    fetchMore: handleFetchMore,
    hasMore: data?.search?.pageInfo.hasNextPage ?? false,
    search: handleSearch,
  };
}
