import { render, screen, fireEvent } from '@testing-library/react';
import UserSearch from '../components/UserSearch';
import { MockedProvider } from '@apollo/client/testing';
import { USERS_QUERY } from '../hooks/useUsers';
import { vi } from 'vitest';
const mocks = [
  {
    request: {
      query: USERS_QUERY,
      variables: {
        query: 'FrankIglesias',
      },
    },
    result: {
      data: {
        search: {
          nodes: [
            {
              id: 'MDQ6VXNlcjE3OTQ4Nzc5',
              login: 'FrankIglesias',
              avatarUrl:
                'https://avatars.githubusercontent.com/u/17948779?u=a1ff3c035135cac678f3f7e4462b217aa8b95a95&v=4',
              __typename: 'User',
            },
            {
              id: 'U_kgDOBno3qg',
              login: 'FrankIglesias-ank',
              avatarUrl:
                'https://avatars.githubusercontent.com/u/108672938?u=f37f8227062aff377147c3b284d8f6c76abb28e1&v=4',
              __typename: 'User',
            },
          ],
          __typename: 'SearchResultItemConnection',
        },
      },
    },
  },
];

describe('UserSearch', () => {
  it('renders the search input', () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <UserSearch onChange={() => {}} />
      </MockedProvider>,
    );
    const searchInput = screen.getByPlaceholderText('Github username');
    expect(searchInput);
  });

  it('updates the search query on input change', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <UserSearch onChange={() => {}} />
      </MockedProvider>,
    );
    const searchInput: HTMLInputElement =
      screen.getByPlaceholderText('Github username');
    fireEvent.change(searchInput, { target: { value: 'FrankIglesias' } });
    expect(searchInput.value).toBe('FrankIglesias');
    expect(await screen.findByText('Loading...'));
    expect(await screen.findByText('FrankIglesias'));
  });

  it('executes handleChange when a row is clicked', async () => {
    const handleChange = vi.fn();
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <UserSearch onChange={handleChange} />
      </MockedProvider>,
    );
    const searchInput = screen.getByPlaceholderText('Github username');
    fireEvent.change(searchInput, { target: { value: 'FrankIglesias' } });
    const row = await screen.findByText('FrankIglesias');
    fireEvent.click(row);
    expect(handleChange).toHaveBeenCalledWith('FrankIglesias');
  });
});
