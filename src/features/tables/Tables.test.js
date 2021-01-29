import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';

import store from '../../app/store';
import createApiMock from '../../app/createApiMock';
import { mockActiveTable, mockTables } from './mocks/tables';
import Tables from './Tables';

describe('Tables', () => {
  let mock;

  beforeEach(() => {
    mock = createApiMock();
    mockTables(mock);
    mockActiveTable(mock, 1);
    mockActiveTable(mock, 2);
  });

  it('it requests tables and active data', async () => {
    render(
      <MemoryRouter initialEntries={['tables/2']}>
        <Route path="tables/:active">
          <Provider store={store}>
            <Tables />
          </Provider>
        </Route>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(mock.history.get).toHaveLength(2);
    });

    expect(screen.getAllByTestId('table').length).toBe(3);
    expect(screen.getAllByTestId('product').length).toBe(3);
    expect(mock.history.get[1].url).toContain('/tables/2');
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
      expect(mock.history.get[1].url).toContain('/tables/1');
    });
  });
});
