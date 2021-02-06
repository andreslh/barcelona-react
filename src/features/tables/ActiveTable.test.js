import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import activeTable from './mocks/activeTable.json';
import ActiveTable from './ActiveTable';
import createApiMock from '../../app/createApiMock';
import {
  mockCompleteTable,
  mockDeleteTable,
  mockDeleteTableProduct,
} from './mocks/tables';

const mockShowMessage = jest.fn();
const mockOnDelete = jest.fn();
const mockOnComplete = jest.fn();

jest.mock('material-ui-snackbar-provider', () => ({
  ...jest.requireActual('material-ui-snackbar-provider'),
  useSnackbar: () => ({
    showMessage: mockShowMessage,
  }),
}));

const mockStore = configureStore();
const store = mockStore({
  tables: {
    active: activeTable.table,
  },
});

describe('ActiveTable', () => {
  let mock;

  beforeEach(() => {
    mock = createApiMock();
    mockDeleteTable(mock);
    mockCompleteTable(mock);
    mockDeleteTableProduct(mock);
  });

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

  describe('delete table modal', () => {
    beforeEach(() => {
      render(
        <Provider store={store}>
          <ActiveTable onDelete={mockOnDelete} onComplete={mockOnComplete} />
        </Provider>
      );
    });

    it('it shows modal on button click', () => {
      const button = screen.getByTestId('delete-table');
      fireEvent.click(button);
      expect(screen.getByText('Eliminar mesa')).toBeInTheDocument();
    });

    it('it closes modal on cancel button click', async () => {
      const button = screen.getByTestId('delete-table');
      fireEvent.click(button);
      expect(screen.getByText('Eliminar mesa')).toBeInTheDocument();
      const closeModalButton = screen.getByTestId('cancel-modal-button');
      fireEvent.click(closeModalButton);

      await waitFor(() => {
        expect(screen.queryByText('Eliminar mesa')).not.toBeInTheDocument();
      });
    });

    it('it sends delete request and fires onDelete props after', async () => {
      const button = screen.getByTestId('delete-table');
      fireEvent.click(button);
      expect(screen.getByText('Eliminar mesa')).toBeInTheDocument();
      const confirmModalButton = screen.getByTestId('confirm-modal-button');
      fireEvent.click(confirmModalButton);

      await waitFor(() => {
        expect(screen.queryByText('Eliminar mesa')).not.toBeInTheDocument();
      });

      expect(mockShowMessage).toHaveBeenCalledWith(
        'Mesa eliminada correctamente'
      );
      expect(mock.history.delete.length).toBe(1);
    });
  });

  describe('complete table modal', () => {
    const COMPLETE_TABLE_TEXT = '¿Estás seguro de cerrar la mesa?';

    beforeEach(() => {
      render(
        <Provider store={store}>
          <ActiveTable onDelete={mockOnDelete} onComplete={mockOnComplete} />
        </Provider>
      );
    });

    it('it shows modal on button click', () => {
      const button = screen.getByTestId('complete-table');
      fireEvent.click(button);
      expect(screen.getByText(COMPLETE_TABLE_TEXT)).toBeInTheDocument();
    });

    it('it closes modal on cancel button click', async () => {
      const button = screen.getByTestId('complete-table');
      fireEvent.click(button);
      expect(screen.getByText(COMPLETE_TABLE_TEXT)).toBeInTheDocument();
      const closeModalButton = screen.getByTestId('cancel-modal-button');
      fireEvent.click(closeModalButton);

      await waitFor(() => {
        expect(screen.queryByText(COMPLETE_TABLE_TEXT)).not.toBeInTheDocument();
      });
    });

    it('it sends complete request and fires onComplete props after', async () => {
      const button = screen.getByTestId('complete-table');
      fireEvent.click(button);
      expect(screen.getByText(COMPLETE_TABLE_TEXT)).toBeInTheDocument();
      const confirmModalButton = screen.getByTestId('confirm-modal-button');
      fireEvent.click(confirmModalButton);

      await waitFor(() => {
        expect(screen.queryByText(COMPLETE_TABLE_TEXT)).not.toBeInTheDocument();
      });

      expect(mockShowMessage).toHaveBeenCalledWith(
        'Mesa cerrada correctamente'
      );
      expect(mock.history.put.length).toBe(1);
    });
  });

  describe('delete product from table modal', () => {
    const DELETE_PRODUCT_TEXT = 'Eliminar producto';

    beforeEach(() => {
      render(
        <Provider store={store}>
          <ActiveTable onDelete={mockOnDelete} onComplete={mockOnComplete} />
        </Provider>
      );
    });

    it('it shows modal on button click', () => {
      const button = screen.getAllByTestId('delete-table-product')[2];
      fireEvent.click(button);
      expect(screen.getByText(DELETE_PRODUCT_TEXT)).toBeInTheDocument();
    });

    it('it closes modal on cancel button click', async () => {
      const button = screen.getAllByTestId('delete-table-product')[2];
      fireEvent.click(button);
      expect(screen.getByText(DELETE_PRODUCT_TEXT)).toBeInTheDocument();
      const closeModalButton = screen.getByTestId('cancel-modal-button');
      fireEvent.click(closeModalButton);

      await waitFor(() => {
        expect(screen.queryByText(DELETE_PRODUCT_TEXT)).not.toBeInTheDocument();
      });
    });

    it('it sends complete request and fires onComplete props after', async () => {
      const button = screen.getAllByTestId('delete-table-product')[2];
      fireEvent.click(button);
      expect(screen.getByText(DELETE_PRODUCT_TEXT)).toBeInTheDocument();
      const confirmModalButton = screen.getByTestId('confirm-modal-button');
      fireEvent.click(confirmModalButton);

      await waitFor(() => {
        expect(screen.queryByText(DELETE_PRODUCT_TEXT)).not.toBeInTheDocument();
      });

      expect(mockShowMessage).toHaveBeenCalledWith(
        'Producto eliminado correctamente'
      );
      expect(mock.history.delete.length).toBe(1);
    });
  });
});
