import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent } from '@testing-library/dom';

import AddProducts from '../../../../features/tables/AddProducts/AddProducts';
import createApiMock from '../../../../__mocks__/createApiMock';
import { mockAddProducts } from '../../../../__mocks__/tables';
import products from '../../../../__mocks__/products.json';
import activeTable from '../../../../__mocks__/activeTable.json';

const mockHistoryPush = jest.fn();
const mockShowMessage = jest.fn();

jest.mock('material-ui-snackbar-provider', () => ({
  ...jest.requireActual('material-ui-snackbar-provider'),
  useSnackbar: () => ({
    showMessage: mockShowMessage,
  }),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

const mockStore = configureStore();
const store = mockStore({
  tables: {
    active: activeTable.table,
  },
  products: {
    data: products.categories,
  },
});

const emptyStore = mockStore({
  tables: {
    active: {},
  },
  products: {
    data: [],
  },
});

describe('AddProducts', () => {
  let mock;

  beforeEach(() => {
    mock = createApiMock();
    mockAddProducts(mock);

    render(
      <MemoryRouter>
        <Provider store={store}>
          <AddProducts />
        </Provider>
      </MemoryRouter>
    );
  });

  it('it renders the right amount of categories, subcategories and products', () => {
    expect(screen.getAllByTestId('category').length).toBe(2);
    expect(screen.getAllByTestId('subcategory').length).toBe(4);
    expect(screen.getAllByTestId('product').length).toBe(8);
  });

  it('it handles product checking', () => {
    const checkbox = screen.getByLabelText('IPA');
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  it('it handles product unchecking', () => {
    const checkbox = screen.getByLabelText('IPA');
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
    fireEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });

  it('it enables and disables add button correctly with at least 1 product to add', () => {
    const checkbox = screen.getByLabelText('IPA');
    const button = screen.getByTestId('add-products-button');
    expect(button).toBeDisabled();
    fireEvent.click(checkbox);
    expect(button).toBeEnabled();
    fireEvent.click(checkbox);
    expect(button).toBeDisabled();
  });

  it('it handles product quantity addition', () => {
    expect(screen.queryByDisplayValue('2')).not.toBeInTheDocument();
    const addQuantityButton = screen.getByTestId('product-add-quantity-1');
    fireEvent.click(addQuantityButton);
    expect(screen.getByDisplayValue('2')).toBeInTheDocument();
  });

  it('it handles product quantity reduction', () => {
    const addQuantityButton = screen.getByTestId('product-add-quantity-1');
    fireEvent.click(addQuantityButton);
    expect(screen.getByDisplayValue('2')).toBeInTheDocument();
    const reduceQuantityButton = screen.getByTestId(
      'product-reduce-quantity-1'
    );
    fireEvent.click(reduceQuantityButton);
    expect(screen.queryByDisplayValue('2')).not.toBeInTheDocument();
  });

  it('it handles product quantity change by input', () => {
    const input = screen.getAllByDisplayValue('1')[0];
    fireEvent.change(input, { target: { value: '5' } });
    expect(screen.getByDisplayValue('5')).toBeInTheDocument();
  });

  it('it handles product quantity minimum', () => {
    const input = screen.getAllByDisplayValue('1')[0];
    fireEvent.change(input, { target: { value: '0' } });
    expect(screen.queryByDisplayValue('0')).not.toBeInTheDocument();
  });

  it('it submits the selected products to api and redirects', async () => {
    const checkbox = screen.getByLabelText('Muzzarella');
    fireEvent.click(checkbox);
    const input = screen.getAllByDisplayValue('1')[0];
    fireEvent.change(input, { target: { value: '5' } });

    const button = screen.getByTestId('add-products-button');
    fireEvent.click(button);

    await waitFor(() => {
      expect(mock.history.post).toHaveLength(1);
    });

    expect(mock.history.post[0].data).toBe('[{"id":1,"quantity":"5"}]');
    expect(mockHistoryPush).toHaveBeenCalledWith('/mesas/1');
  });
});

describe('AddProducts with empty store', () => {
  it('redirects to home if page was refreshed', () => {
    render(
      <MemoryRouter>
        <Provider store={emptyStore}>
          <AddProducts />
        </Provider>
      </MemoryRouter>
    );

    expect(mockHistoryPush).toHaveBeenCalledWith('/');
  });
});
