import React from 'react';

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
    const subcategories = [];
    category.Subcategories.forEach((subcategory) => {
      const productsElements = [];
      subcategory.Products.forEach((product) => {
        productsElements.push(
          <TableRow data-testid='product' key={product.id}>
            <TableCell align='left'>{product.name}</TableCell>
            <TableCell>${product.price}</TableCell>
            <TableCell align='right'>
              <Button
                color='default'
                onClick={() => {
                  handleEditProduct(product.id);
                }}
              >
                Editar
              </Button>
              <Button
                color='default'
                onClick={() => {
                  setProductToDelete(product.id);
                  handleDeleteProductModal();
                }}
              >
                Eliminar
              </Button>
            </TableCell>
          </TableRow>
        );
      });

      subcategories.push(
        <Grid
          data-testid='subcategory'
          item
          xs={12}
          md={6}
          key={subcategory.id}
        >
          <Grid container justify='space-between'>
            <h4>{subcategory.name}</h4>
            <Button
              color='default'
              onClick={() => handleEditSubcategory(subcategory.id)}
            >
              Editar
            </Button>
            <Button
              color='default'
              onClick={() => {
                setSubcategoryToDelete(subcategory.id);
                handleDeleteSubcategoryModal();
              }}
            >
              Eliminar
            </Button>
            <Button
              color='default'
              onClick={() => handleAddProduct(subcategory.id)}
            >
              Agregar producto
            </Button>
          </Grid>
          <Table aria-label='active tables'>
            <TableBody>{productsElements}</TableBody>
          </Table>
        </Grid>
      );
    });

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
            {subcategories}
          </Grid>
        </AccordionDetails>
      </Accordion>
    );
  });
}
