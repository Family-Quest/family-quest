import { render, screen } from '@testing-library/react-native';

import { Login } from './Login';

describe('App component', () => {
  describe('Render method', () => {
    it('should render the default text', () => {
      render(<Login />);

      const text = screen.queryByText(/Open up App\//);
      expect(text).toBeVisible();
    });
  });
});
