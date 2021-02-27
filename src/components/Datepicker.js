import React from 'react';
import { KeyboardDatePicker } from '@material-ui/pickers';

const Datepicker = ({ label, value, onChange }) => (
  <KeyboardDatePicker
    disableToolbar
    variant='inline'
    format='dd-MM-yyyy'
    margin='normal'
    id='date-picker-start'
    label={label}
    value={value}
    onChange={onChange}
    KeyboardButtonProps={{
      'aria-label': 'change date',
    }}
  />
);

export default Datepicker;
