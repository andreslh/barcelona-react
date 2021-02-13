const getProductChecked = (id, addedProducts) =>
  addedProducts.length &&
  addedProducts[addedProducts.findIndex((product) => product.id === id)].checked
    ? true
    : false;

export default getProductChecked;
