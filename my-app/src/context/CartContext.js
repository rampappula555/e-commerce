import React from "react";
const CartContext = React.createContext({
  cartList: [],
  updatedArray: [],
  addtoCart: () => {},
  deletecartList: () => {},
  increaseCartItem: () => {},
  decreaseCartItem: () => {},
  onClickDelete: () => {},
});
export default CartContext;
