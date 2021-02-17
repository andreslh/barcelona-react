import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import createApiMock from '../../app/createApiMock';
import store from '../../app/store';
import { mockAddTable } from './mocks/tables';
import NewTable from './NewTable';

const mockHistoryPush = jest.fn();
const mockHistoryGoBack = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
    goBack: mockHistoryGoBack,
  }),
}));

describe('NewTable', () => {
  let mock;

  beforeEach(() => {
    mock = createApiMock();
    mockAddTable(mock);

    render(
      <MemoryRouter>
        <Provider store={store}>
          <NewTable />
        </Provider>
      </MemoryRouter>
    );
  });

  it('prevents submit with empty name', () => {
    const nameInput = screen.getByTestId('table-name');
    fireEvent.change(nameInput, { target: { value: 'A' } });
    expect(screen.getByTestId('submit-table-btn')).toBeEnabled();

    fireEvent.change(nameInput, { target: { value: '' } });
    expect(screen.getByTestId('submit-table-btn')).not.toBeEnabled();
  });

  it('goes back if cancel is pressed', () => {
    const button = screen.getByTestId('cancel-add-table');
    fireEvent.click(button);

    expect(mockHistoryGoBack).toHaveBeenCalled();
  });

  it('sends post request and redirects if it is succesful', async () => {
    const nameInput = screen.getByTestId('table-name');
    fireEvent.change(nameInput, { target: { value: 'Andres' } });
    const button = screen.getByTestId('submit-table-btn');
    fireEvent.click(button);

    await waitFor(() => {
      expect(mock.history.post.length).toBe(1);
    });

    expect(mock.history.post[0].data).toBe('{"name":"Andres"}');

    expect(mockHistoryPush).toHaveBeenCalledWith('/add-products');
  });
});
