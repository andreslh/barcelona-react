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
import SubcategoriesService from '../../services/subcategories';

export default function EditSubcategory() {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const snackbar = useSnackbar();

  const [name, setName] = useState('');
  const [categoryId, setCategoryId] = useState('');

  useEffect(() => {
    SubcategoriesService.getById(id).then((response) => {
      setName(response.subcategory.name);
      setCategoryId(response.subcategory.categoryId);
    });
  }, [id]);

  const disabled = useMemo(() => !name, [name]);

  const handleSubmit = () => {
    SubcategoriesService.update({ id, name, categoryId }).then(() => {
      dispatch(resetProducts());
      snackbar.showMessage('Subcategoria actualizada');
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
            <h3>Editar subcategoria: {name}</h3>
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
