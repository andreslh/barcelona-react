import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../app/store';
import TablesList from './TablesList';

jest.mock(
  './sampleTables.json',
  () => [
    {
      id: 1,
      name: 'Andres',
    },
    {
      id: 2,
      name: 'Andres',
    },
    {
      id: 3,
      name: 'Andres',
    },
  ],
  { virtual: true }
);

describe('TablesList', () => {
  it('it shows the right amount of tables', () => {
    const { getAllByTestId } = render(
      <Provider store={store}>
        <TablesList />
      </Provider>
    );

    expect(getAllByTestId(/table/i).length).toBe(3);
  });
});
