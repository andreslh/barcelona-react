import axios from 'axios';
// eslint-disable-next-line import/no-extraneous-dependencies
import MockAdapter from 'axios-mock-adapter';

// eslint-disable-next-line import/no-anonymous-default-export
export default () => new MockAdapter(axios);
