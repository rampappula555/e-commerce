import "./index.css";
import { useState } from "react";
const ProductsHeader = (props) => {
  const { activeOptionId, changePrice, onSearchInput } = props;
  const [userInputSearch, setUserInputSearch] = useState("");
  const onChangeUserInputSearch = (event) =>
    setUserInputSearch(event.target.value);
  const onKeyDownSearch = (event) => {
    if (event.key === "Enter") {
      onSearchInput(userInputSearch);
    }
  };
  const onChangePrice = (event) => changePrice(event.target.value);
  return (
    <div className="products-header-container">
      <div className="input-heading-container">
        <input
          type="search"
          value={userInputSearch}
          onChange={onChangeUserInputSearch}
          onKeyDown={onKeyDownSearch}
        />
        <h1 className="allproducts-heading">All Products</h1>
      </div>
      <div className="sortby-container">
        <p>Sortby</p>
        <p className="price-text">Price</p>
        <select onChange={onChangePrice} value={activeOptionId}>
          <option value="PRICE_HIGH">(High-Low)</option>
          <option value="PRICE_LOW">(Low-High)</option>
        </select>
      </div>
    </div>
  );
};
export default ProductsHeader;
