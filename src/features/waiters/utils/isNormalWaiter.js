import { TABLE_TYPES } from '../../../app/constants';

export const isNormalWaiter = (id) =>
  id !== TABLE_TYPES.delivery && id !== TABLE_TYPES.takeAway;
