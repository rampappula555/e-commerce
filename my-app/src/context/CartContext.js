import React from "react";
const CartContext = React.createContext({
  cartList: [],
  addtoCart: () => {},
  deletecartList: () => {},
  increaseCartItem: () => {},
  decreaseCartItem: () => {},
  onClickDelete: () => {},
});
export default CartContext;
