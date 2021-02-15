import styled from 'styled-components';

import { background1 } from '../../app/stylesContants';

export const SubcategoryTitle = styled.h4`
  background: ${background1};
  margin: 0;
  padding: 10px;
`;

export const SubcategoryTitleContainer = styled.div`
  background: ${background1};
  flex-grow: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 10px;

  h4 {
    margin: 0;
  }
`;
