const convertToProductsList = (categories) =>
  categories.reduce((acc, category) => {
    return [
      ...acc,
      ...category.Subcategories.reduce((subcatAcc, subcategory) => {
        return [
          ...subcatAcc,
          ...subcategory.Products.map((product) => ({
            id: product.id,
            checked: false,
            quantity: 1,
          })),
        ];
      }, []),
    ];
  }, []);

export default convertToProductsList;
