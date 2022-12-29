import { AiOutlineStar } from "react-icons/ai";
import { Link } from "react-router-dom";
import "./index.css";
import LazyLoad from "react-lazyload";
const ProductCard = (props) => {
  const { eachProduct } = props;
  const { title, imageUrl, price, brand, rating, id } = eachProduct;
  return (
    <div className="productcard-container">
      <Link className="products-link" to={`/product/${id}`}>
        <div>
          <LazyLoad>
            <img src={imageUrl} alt="img" className="eachproduct-image" />
          </LazyLoad>
        </div>
        <div className="product-text-details-container">
          <h1 className="product-title">{title}</h1>
        </div>
      </Link>
      <p>by {brand}</p>
      <div className="rating-container">
        <p>Rs {price}/-</p>
        <div className="star-container">
          <p className="rating">{rating}</p>
          <AiOutlineStar />
        </div>
      </div>
    </div>
  );
};
export default ProductCard;
