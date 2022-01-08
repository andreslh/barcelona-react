const updateProductQuantity = (id, action, quantity, addedProducts, isHalf) => {
  const newAddedProducts = [...addedProducts];
  const newAddedOrSubstractedQuantity = isHalf ? 0.5 : 1;
  const productIndex = newAddedProducts.findIndex(
    (product) => product.id === id
  );
  let newQuantity = newAddedProducts[productIndex].quantity;
  if (action !== null) {
    const currentQuantity = newAddedProducts[productIndex].quantity;
    newQuantity = action ? currentQuantity + newAddedOrSubstractedQuantity : currentQuantity - newAddedOrSubstractedQuantity;
  } else {
    newQuantity = quantity;
  }

  newAddedProducts[productIndex].quantity = newQuantity > 0 ? newQuantity : 1;

  return [...newAddedProducts];
};

export default updateProductQuantity;
