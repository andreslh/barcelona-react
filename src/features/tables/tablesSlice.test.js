import tablesReducer, { selectActive, deleteTableProduct } from './tablesSlice';
import mockActiveTable from './mocks/activeTable.json';

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
