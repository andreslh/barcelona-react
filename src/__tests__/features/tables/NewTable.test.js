import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import store from '../../../app/store';
import NewTable from '../../../features/tables/NewTable';
import createApiMock from '../../../__mocks__/createApiMock';
import { mockAddTable } from '../../../__mocks__/tables';
import { mockWaiters } from '../../../__mocks__/waiters';

const mockHistoryPush = jest.fn();
const mockHistoryGoBack = jest.fn();
const mockShowMessage = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
    goBack: mockHistoryGoBack,
  }),
}));

jest.mock('material-ui-snackbar-provider', () => ({
  ...jest.requireActual('material-ui-snackbar-provider'),
  useSnackbar: () => ({
    showMessage: mockShowMessage,
  }),
}));

describe('NewTable', () => {
  let mock;

  beforeEach(() => {
    mock = createApiMock();
    mockAddTable(mock);
    mockWaiters(mock);

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
    const waitersList = screen.getByTestId('waiters-list');
    fireEvent.change(waitersList, { target: { value: '1' } });
    expect(screen.getByTestId('submit-table-btn')).toBeEnabled();

    fireEvent.change(nameInput, { target: { value: '' } });
    expect(screen.getByTestId('submit-table-btn')).not.toBeEnabled();
  });

  it('prevents submit with empty waiter', () => {
    const nameInput = screen.getByTestId('table-name');
    fireEvent.change(nameInput, { target: { value: 'A' } });
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
    const waitersList = screen.getByTestId('waiters-list');
    fireEvent.change(waitersList, { target: { value: '1' } });
    const button = screen.getByTestId('submit-table-btn');
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockHistoryPush).toHaveBeenCalledWith('/agregar-productos');
    });

    expect(mock.history.post.length).toBe(1);
    expect(mock.history.post[0].data).toBe('{"name":"Andres","waiterId":"1"}');
  });
});
