import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../app/store';
import TablesList from './TablesList';

import createApiMock from '../../app/createApiMock';
import { mockTables } from './mocks/tables';

describe('TablesList', () => {
  let mock;

  beforeEach(() => {
    mock = createApiMock();
    mockTables(mock);
  });

  it('it shows the right amount of tables', async () => {
    render(
      <Provider store={store}>
        <TablesList />
      </Provider>
    );

    await waitFor(() => {
      expect(mock.history.get).toHaveLength(1);
      expect(screen.getAllByTestId('table').length).toBe(3);
    });
  });
});
