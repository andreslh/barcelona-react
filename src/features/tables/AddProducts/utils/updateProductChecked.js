const updateProductChecked = (id, addedProducts) => {
  const newAddedProducts = [...addedProducts];
  const productIndex = newAddedProducts.findIndex(
    (product) => product.id === id
  );
  newAddedProducts[productIndex].checked = !newAddedProducts[productIndex]
    .checked;

  return [...newAddedProducts];
};

export default updateProductChecked;
