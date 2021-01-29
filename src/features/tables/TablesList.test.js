import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';

import TablesList from './TablesList';
import tables from './mocks/tables.json';

const mockStore = configureStore();
const store = mockStore({
  tables: {
    data: tables,
  },
});
describe('TablesList', () => {
  it('it shows the right amount of tables', async () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <TablesList />
        </Provider>
      </MemoryRouter>
    );

    expect(screen.getAllByTestId('table').length).toBe(3);
    expect(screen.getByText('Andres')).toBeInTheDocument();
    expect(screen.getByText('Facundo')).toBeInTheDocument();
    expect(screen.getByText('Eduardo')).toBeInTheDocument();
  });
});
