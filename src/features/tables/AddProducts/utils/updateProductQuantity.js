const updateProductQuantity = (id, action, quantity, addedProducts) => {
  const newAddedProducts = [...addedProducts];
  const productIndex = newAddedProducts.findIndex(
    (product) => product.id === id
  );
  let newQuantity = newAddedProducts[productIndex].quantity;
  if (action !== null) {
    const currentQuantity = newAddedProducts[productIndex].quantity;
    newQuantity = action ? currentQuantity + 1 : currentQuantity - 1;
  } else {
    newQuantity = quantity;
  }

  newAddedProducts[productIndex].quantity = newQuantity > 0 ? newQuantity : 1;

  return [...newAddedProducts];
};

export default updateProductQuantity;
