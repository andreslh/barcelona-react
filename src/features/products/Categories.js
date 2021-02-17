import React, { useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { useHistory } from 'react-router-dom';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';

import ProductsContext from './ProductsContext';
import { Subcategories } from './Subcategories';
import { CategoryTitle } from '../../components/Products/CategoryTitle';
import { ADD_SUBCATEGORY, EDIT_CATEGORY } from '../../app/routes';

export function Categories() {
  const history = useHistory();
  const {
    categories,
    setCategoryToDelete,
    handleDeleteCategoryModal,
  } = useContext(ProductsContext);

  const handleAddSubcategory = (categoryId) => {
    history.push(ADD_SUBCATEGORY.replace(':categoryId', categoryId));
  };

  const handleEditCategory = (categoryId) => {
    history.push(EDIT_CATEGORY.replace(':id', categoryId));
  };

  const categoriesList = [];
  categories.forEach((category, catIndex) => {
    categoriesList.push(
      <Accordion
        data-testid="category"
        key={catIndex}
        defaultExpanded
        elevation={0}
      >
        <CategoryTitle>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${category.id}-content`}
            id={`panel${category.id}-header`}
          >
            <Grid container justify="space-between">
              <h3>{category.name}</h3>
              <Box
                classes={{
                  root: 'flex-important justify-content-end align-items-center',
                }}
              >
                <Button
                  color="default"
                  onClick={() => handleEditCategory(category.id)}
                >
                  Editar
                </Button>
                <Button
                  color="default"
                  onClick={() => {
                    setCategoryToDelete(category.id);
                    handleDeleteCategoryModal();
                  }}
                >
                  Eliminar
                </Button>
                <Button
                  data-testid="add-subcategory-btn"
                  color="default"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddSubcategory(category.id);
                  }}
                >
                  Agregar subcategoria
                </Button>
              </Box>
            </Grid>
          </AccordionSummary>
        </CategoryTitle>
        <AccordionDetails>
          <Grid container spacing={4}>
            <Subcategories category={category} />
          </Grid>
        </AccordionDetails>
      </Accordion>
    );
  });

  return categoriesList;
}
