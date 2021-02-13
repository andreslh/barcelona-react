import React from 'react';
import Grid from '@material-ui/core/Grid';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';

import { Subcategories } from './Subcategories';

export function Categories({
  categories,
  handleEditProduct,
  setProductToDelete,
  handleDeleteProductModal,
  handleEditSubcategory,
  setSubcategoryToDelete,
  handleDeleteSubcategoryModal,
  handleAddProduct,
  handleAddSubcategory,
}) {
  const categoriesList = [];
  categories.forEach((category, catIndex) => {
    categoriesList.push(
      <Accordion data-testid='category' key={catIndex} defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`panel${category.id}-content`}
          id={`panel${category.id}-header`}
        >
          <Grid container justify='space-between'>
            <h3>{category.name}</h3>
            <Button
              color='default'
              onClick={(e) => {
                e.stopPropagation();
                handleAddSubcategory(category.id);
              }}
            >
              Agregar subcategoria
            </Button>
          </Grid>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={4}>
            <Subcategories
              category={category}
              handleEditProduct={handleEditProduct}
              setProductToDelete={setProductToDelete}
              handleDeleteProductModal={handleDeleteProductModal}
              handleEditSubcategory={handleEditSubcategory}
              setSubcategoryToDelete={setSubcategoryToDelete}
              handleDeleteSubcategoryModal={handleDeleteSubcategoryModal}
              handleAddProduct={handleAddProduct}
            />
          </Grid>
        </AccordionDetails>
      </Accordion>
    );
  });

  return categoriesList;
}
