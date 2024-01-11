import { render } from '@testing-library/react';
import Repository from '../components/Repository';

describe('Repository', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <Repository name="test" description="test" url="test" />
    );
    expect(container).toMatchSnapshot();
  });
});
