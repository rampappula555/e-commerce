import CartListItem from "../CartListItem";
import CartContext from "../../context/CartContext";
import CartSummary from "../CartSummary";
import { useContext } from "react";
import "./index.css";

const CartListView = () => {
  const value = useContext(CartContext);
  const { cartList, increaseCartItem, decreaseCartItem, onClickDelete } = value;

  const onClickDecrease = (id) => {
    const decresedResult = cartList.map((eachItem) => {
      if (eachItem.id === id) {
        if (eachItem.quantity > 1) {
          return { ...eachItem, quantity: eachItem.quantity - 1 };
        }
      }
      return eachItem;
    });

    decreaseCartItem(decresedResult);
  };

  const onClickIncrease = (id) => {
    const increasedResult = cartList.map((eachItem) => {
      if (eachItem.id === id) {
        return { ...eachItem, quantity: eachItem.quantity + 1 };
      }
      return eachItem;
    });
    increaseCartItem(increasedResult);
  };
  const cartLength = cartList.length;

  const totalPrice = cartList.map(
    (eachItem) => eachItem.quantity * eachItem.price
  );
  const flag = totalPrice.reduce((prev, acc) => prev + acc, 0);
  const onClickDeleteItem = (id) => {
    const filteredRes = cartList.filter((eachItem) => eachItem.id !== id);
    onClickDelete(filteredRes);
  };
  return (
    <div>
      {cartList.map((eachItem) => (
        <CartListItem
          eachItem={eachItem}
          key={eachItem.id}
          onClickIncrease={onClickIncrease}
          onClickDecrease={onClickDecrease}
          onClickDeleteItem={onClickDeleteItem}
        />
      ))}
      <div>
        <CartSummary cartLength={cartLength} flag={flag} />
      </div>
    </div>
  );
};
export default CartListView;
