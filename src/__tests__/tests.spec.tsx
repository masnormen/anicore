import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '../pages/index';

describe('Home', () => {
  it('renders the site title', () => {
    render(<Home />);
    const heading = screen.getByRole('heading', {
      name: /Anicore/i,
    });

    expect(heading).toBeInTheDocument();
  });
});
