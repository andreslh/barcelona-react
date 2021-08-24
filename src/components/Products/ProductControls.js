import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';

export const ProductControls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ProductQuantity = styled(TextField)`
  max-width: 75px;
`;

export const ProductButtons = styled.div`
  width: 90px;
  display: flex;
  justify-content: space-between;
`;

export const ProductButtonsHalf = styled.div`
  width: 50px;
  display: flex;
  justify-content: space-between;
`;
