import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import store from '../app/store';
import App from '../App';

test('renders correctly', () => {
  const { getByText } = render(
    <MemoryRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </MemoryRouter>
  );

  expect(getByText(/Barcelona/i)).toBeInTheDocument();
});
