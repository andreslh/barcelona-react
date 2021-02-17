import React, { useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';

import ProductsContext from './ProductsContext';
import { Subcategories } from './Subcategories';
import { CategoryTitle } from '../../components/Products/CategoryTitle';

export function Categories() {
  const { categories, handleAddSubcategory } = useContext(ProductsContext);

  const categoriesList = [];
  categories.forEach((category, catIndex) => {
    categoriesList.push(
      <Accordion
        data-testid='category'
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
            <Grid container justify='space-between'>
              <h3>{category.name}</h3>
              <Button
                data-testid='add-subcategory-btn'
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
