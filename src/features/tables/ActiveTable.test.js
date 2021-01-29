import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import activeTable from './mocks/activeTable.json';
import ActiveTable from './ActiveTable';

const mockStore = configureStore();
const store = mockStore({
  tables: {
    active: activeTable,
  },
});

describe('ActiveTable', () => {
  it('it shows the right amount and name of products', async () => {
    render(
      <Provider store={store}>
        <ActiveTable />
      </Provider>
    );

    expect(screen.getAllByTestId('product').length).toBe(3);
    expect(screen.getByText('IPA')).toBeInTheDocument();
    expect(screen.getByText('Pizza')).toBeInTheDocument();
    expect(screen.getByText('Burguer')).toBeInTheDocument();
  });
});
