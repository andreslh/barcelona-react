import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';

import TablesList from '../../../features/tables/TablesList';
import tables from '../../../__mocks__/tables.json';

const mockStore = configureStore();
const store = mockStore({
  tables: {
    data: tables.waiters,
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

    expect(screen.getAllByTestId('table-item').length).toBe(17);
    expect(screen.getByText('Delivery')).toBeInTheDocument();
    expect(screen.getByText('Para retirar')).toBeInTheDocument();
    expect(screen.getByText('Eduardo')).toBeInTheDocument();
  });
});
