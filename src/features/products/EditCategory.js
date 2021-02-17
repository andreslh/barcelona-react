import React, { useEffect, useMemo, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { useSnackbar } from 'material-ui-snackbar-provider';

import CategoryForm from './CategoryForm';
import { resetProducts } from './productsSlice';
import { PRODUCTS } from '../../app/routes';
import CategoriesService from '../../services/categories';

export default function EditCategory() {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const snackbar = useSnackbar();

  const [name, setName] = useState('');

  useEffect(() => {
    CategoriesService.getById(id).then((response) => {
      setName(response.category.name);
    });
  }, [id]);

  const disabled = useMemo(() => !name, [name]);

  const handleSubmit = () => {
    CategoriesService.update({ id, name }).then(() => {
      dispatch(resetProducts());
      snackbar.showMessage('Categoria actualizada');
      history.push(PRODUCTS);
    });
  };

  return (
    <Grid
      container
      justify="center"
      component={Paper}
      classes={{ root: 'flex-direction-column' }}
    >
      <Grid item mt={3}>
        <Box p={3}>
          <Grid container justify="space-between">
            <h3>Editar categoria: {name}</h3>
            <Button
              color="default"
              onClick={() => {
                history.push(PRODUCTS);
              }}
            >
              Volver
            </Button>
          </Grid>
        </Box>
        <Box m={2}>
          <CategoryForm
            name={name}
            onNameChange={(e) => setName(e.currentTarget.value)}
            onSubmit={handleSubmit}
            submitText={'Editar'}
            disabled={disabled}
          />
        </Box>
      </Grid>
    </Grid>
  );
}
