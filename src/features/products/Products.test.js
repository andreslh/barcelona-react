import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import store from '../../app/store';
import createApiMock from '../../app/createApiMock';
import { mockProducts } from './mocks/products';
import Products from './Products';

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

describe('Products', () => {
  let mock;

  beforeEach(() => {
    mock = createApiMock();
    mockProducts(mock);

    render(
      <MemoryRouter>
        <Provider store={store}>
          <Products />
        </Provider>
      </MemoryRouter>
    );
  });

  it('it renders the right amount of categories, subcategories and products', () => {
    expect(screen.getAllByTestId('category').length).toBe(2);
    expect(screen.getAllByTestId('subcategory').length).toBe(4);
    expect(screen.getAllByTestId('product').length).toBe(8);
  });

  it('redirects to add a new subcategory', async () => {
    const addSubcategoryBtn = screen.getAllByTestId('add-subcategory-btn')[0];
    fireEvent.click(addSubcategoryBtn);

    await waitFor(() => {
      expect(mockHistoryPush).toHaveBeenCalled();
    });
  });
});
