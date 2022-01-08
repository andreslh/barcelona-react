import tablesReducer, { selectActive, deleteTableProduct } from '../../../features/tables/tablesSlice';
import mockActiveTable from '../../../__mocks__/activeTable.json';

describe('tablesSlice', () => {
  it('deletes product and updates total', () => {
    const state = {
      tables: tablesReducer(
        { active: mockActiveTable.table },
        deleteTableProduct(14)
      ),
    };
    expect(selectActive(state).total).toBe(1010);
  });
});
