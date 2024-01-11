import { render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import App from '../App';

describe('App', () => {
  it('renders ok', () => {
    render(
      <MockedProvider>
        <App />
      </MockedProvider>,
    );
  });
});
