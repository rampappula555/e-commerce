import "./index.css";

const CartListItem = (props) => {
  const { onClickIncrease, onClickDecrease, onClickDeleteItem } = props;
  const { eachItem } = props;
  const { imageUrl, quantity, price, brand, title, id } = eachItem;
  const totalItemPrice = quantity * price;

  return (
    <div className="cartlist-item-main-container">
      <div className="cartlist-view-image-container">
        <img src={imageUrl} alt="img" className="cartlist-view-image" />
      </div>
      <div className="title-and-brand-text-container">
        <h3>{title}</h3>
        <p>{brand}</p>
      </div>
      <div className="cartlistitem-buttons-container">
        <button onClick={() => onClickDecrease(id)}>-</button>
        <p>{quantity}</p>
        <button onClick={() => onClickIncrease(id)}>+</button>
      </div>

      <div className="cartlistitem-price-container">
        <p>{price}</p>
      </div>
      <div className="delete-item-button-container">
        <button onClick={() => onClickDeleteItem(id)}>Delete Item</button>
      </div>
      <p>Total {totalItemPrice}</p>
    </div>
  );
};
export default CartListItem;
