import "./index.css";
import Header from "../Header";
import CartListView from "../CartListView";
import CartContext from "../../context/CartContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
const Cart = () => {
  const value = useContext(CartContext);
  const { deletecartList, cartList } = value;

  return (
    <div className="cart-main-container">
      <Header />
      {cartList.length > 0 ? (
        <div>
          <div className="remove-all-button-container">
            <h1>My cart</h1>
            <button
              onClick={() => deletecartList()}
              className="remove-all-button"
            >
              Remove All
            </button>
          </div>
          <CartListView />
        </div>
      ) : (
        <div className="no-cart-item-container">
          <div>
            <img
              src="https://cdni.iconscout.com/illustration/premium/thumb/confusing-woman-due-to-empty-cart-4558760-3780056.png"
              alt="img"
              className="no-cart-item-image"
            />
          </div>
          <Link to="/products" className="shopnow-button">
            Continue Shopping
          </Link>
        </div>
      )}
    </div>
  );
};
export default Cart;
