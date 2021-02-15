import React, { useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import AddProductsContext from './AddProductsContext';
import { Subcategories } from './Subcategories';
import { CategoryTitle } from '../../../components/Products/CategoryTitle';

export function Categories() {
  const { categories } = useContext(AddProductsContext);

  const categoriesList = [];
  categories.forEach((category, catIndex) => {
    categoriesList.push(
      <Accordion
        data-testid="category"
        key={catIndex}
        defaultExpanded={catIndex === 0}
        elevation={0}
      >
        <CategoryTitle>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${category.id}-content`}
            id={`panel${category.id}-header`}
          >
            <h3>{category.name}</h3>
          </AccordionSummary>
        </CategoryTitle>
        <AccordionDetails>
          <Grid container>
            <Subcategories category={category} />
          </Grid>
        </AccordionDetails>
      </Accordion>
    );
  });

  return categoriesList;
}
