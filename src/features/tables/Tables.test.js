import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';

import store from '../../app/store';
import createApiMock from '../../app/createApiMock';
import { mockActiveTable, mockTables } from './mocks/tables';
import Tables from './Tables';
import { mockProducts } from '../products/mocks/products';
import { mockWaiters, mockWaitersWithTables } from './mocks/waiters';

describe('Tables', () => {
  let mock;

  beforeEach(() => {
    mock = createApiMock();
    mockTables(mock);
    mockWaiters(mock);
    mockWaitersWithTables(mock);
    mockProducts(mock);
    mockActiveTable(mock, 1);
    mockActiveTable(mock, 2);
  });

  it('it requests first table as active if no param is passed', async () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <Tables />
        </Provider>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(mock.history.get).toHaveLength(4);
      expect(mock.history.get[3].url).toContain('tables/1');
    });
  });

  it('it requests tables and active data', async () => {
    render(
      <MemoryRouter initialEntries={['mesas/2']}>
        <Route path="mesas/:active">
          <Provider store={store}>
            <Tables />
          </Provider>
        </Route>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(mock.history.get).toHaveLength(4);
    });

    expect(screen.getAllByTestId('table-item').length).toBe(3);
    expect(screen.getAllByTestId('product').length).toBe(3);
    expect(mock.history.get[2].url).toContain('tables/2');
  });
});
