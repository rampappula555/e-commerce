import CartListItem from "../CartListItem";
import CartContext from "../../context/CartContext";
import CartSummary from "../CartSummary";
import { useContext } from "react";
import "./index.css";

const CartListView = () => {
  const value = useContext(CartContext);
  // const [updatedArray, setUpdatedArray] = useState([]);
  const { updatedArray, increaseCartItem, decreaseCartItem, onClickDelete } =
    value;

  // useEffect(() => {
  //   let temp = [];
  //   let sortedArray = [];
  //   cartList.map((eachItem) => {
  //     if (temp.includes(eachItem.id)) {
  //       for (let i in sortedArray) {
  //         if (sortedArray[i].id === eachItem.id) {
  //           sortedArray.splice(i, 1, {
  //             ...eachItem,
  //             quantity: sortedArray[i].quantity + eachItem.quantity,
  //           });
  //         }
  //       }
  //     } else {
  //       sortedArray.push(eachItem);
  //       temp.push(eachItem.id);
  //     }
  //     return null;
  //   });
  //   setUpdatedArray(sortedArray);
  // }, [cartList]);

  const onClickDecrease = (id) => {
    const decresedResult = updatedArray.map((eachItem) => {
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
    const increasedResult = updatedArray.map((eachItem) => {
      if (eachItem.id === id) {
        return { ...eachItem, quantity: eachItem.quantity + 1 };
      }
      return eachItem;
    });
    increaseCartItem(increasedResult);
  };
  const cartLength = updatedArray.length;

  const totalPrice = updatedArray.map(
    (eachItem) => eachItem.quantity * eachItem.price
  );
  const flag = totalPrice.reduce((prev, acc) => prev + acc, 0);
  const onClickDeleteItem = (id) => {
    const filteredRes = updatedArray.filter((eachItem) => eachItem.id !== id);
    onClickDelete(filteredRes);
  };
  return (
    <div>
      {updatedArray.map((eachItem) => (
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
