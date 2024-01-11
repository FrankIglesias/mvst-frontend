import { render, screen } from '@testing-library/react';
import RepositoryList from '../components/RepositoryList';
import { MockedProvider } from '@apollo/client/testing';
import { REPOSITORIES_QUERY } from '../hooks/useRepositories';
import { vi } from 'vitest';

const IntersectionObserverMock = vi.fn(() => ({
  disconnect: vi.fn(),
  observe: vi.fn(),
  takeRecords: vi.fn(),
  unobserve: vi.fn(),
}));

vi.stubGlobal('IntersectionObserver', IntersectionObserverMock);

const mocks = [
  {
    request: {
      query: REPOSITORIES_QUERY,
      variables: {
        query: 'owner:FrankIglesias',
      },
    },
    result: {
      data: {
        search: {
          repositories: [
            {
              name: 'tp-2016-2c-TheRevengeOfTheMinions',
              description: 'Trabajo Práctico Sistemas Operativos 2016 2C',
              url: 'https://github.com/FrankIglesias/tp-2016-2c-TheRevengeOfTheMinions',
              __typename: 'Repository',
            },
            {
              name: 'cima',
              description: 'Complemento de Inscripción Mobile Académico',
              url: 'https://github.com/FrankIglesias/cima',
              __typename: 'Repository',
            },
          ],
          pageInfo: {
            endCursor: 'Y3Vyc29yOjEw',
            hasNextPage: true,
            __typename: 'PageInfo',
          },
          __typename: 'SearchResultItemConnection',
        },
      },
    },
  },
  {
    request: {
      query: REPOSITORIES_QUERY,
      variables: {
        query: 'owner:Test',
      },
    },
    result: {
      data: {
        search: {
          repositories: [],
          pageInfo: {
            endCursor: null,
            hasNextPage: false,
            __typename: 'PageInfo',
          },
          __typename: 'SearchResultItemConnection',
        },
      },
    },
  },
];
describe('RepositoryList', () => {
  it('renders the list of repositories', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <RepositoryList user="FrankIglesias" />
      </MockedProvider>,
    );

    expect(await screen.getByText('Loading please wait...'));
    expect(await screen.findByText('tp-2016-2c-TheRevengeOfTheMinions'));
  });

  it('fetches repositories on prop change', async () => {
    const { rerender } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <RepositoryList user="FrankIglesias" />
      </MockedProvider>,
    );

    rerender(
      <MockedProvider mocks={mocks} addTypename={false}>
        <RepositoryList user="Test" />
      </MockedProvider>,
    );
    expect(await screen.findByText('No repositories found'));
  });
});
