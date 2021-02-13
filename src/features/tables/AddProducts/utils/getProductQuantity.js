const getProductQuantity = (id, addedProducts) =>
  addedProducts.length
    ? addedProducts[addedProducts.findIndex((product) => product.id === id)]
        .quantity
    : 1;

export default getProductQuantity;
