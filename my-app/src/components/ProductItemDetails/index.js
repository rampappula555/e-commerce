import "./index.css";
import CartContext from "../../context/CartContext";
import Header from "../Header";
import { AiOutlineStar } from "react-icons/ai";
import { LineWave } from "react-loader-spinner";
import "./index.css";
import { useEffect, useState, useContext } from "react";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const apiStatusConsts = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  progress: "PROGRESS",
};
const ProductItemDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const value = useContext(CartContext);
  const { addtoCart } = value;
  const [apiStatus, setApiStatus] = useState(apiStatusConsts.initial);
  const [quantity, setQuantity] = useState(1);
  const [eachProductdetails, setEachProductDetails] = useState({});
  const [isClickedAddToCart, setisClickedAddToCart] = useState(false);
  useEffect(() => {
    setApiStatus(apiStatusConsts.progress);
    const getProductDetails = async () => {
      const jwtToken = Cookies.get("jwt_token");
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      };

      const response = await fetch(
        `https://apis.ccbp.in/products/${id}`,
        options
      );
      const data = await response.json();

      if (response.ok) {
        const updatedData = {
          id: data.id,
          availability: data.availability,
          brand: data.brand,
          description: data.description,
          imageUrl: data.image_url,
          price: data.price,
          rating: data.rating,
          style: data.style,
          totalReviews: data.total_reviews,
          title: data.title,
        };

        setEachProductDetails(updatedData);
        setApiStatus(apiStatusConsts.success);
      }
    };
    getProductDetails();
  }, [id]);

  const getProgressView = () => {
    return (
      <div className="each-product-loader-container ">
        <div>
          <LineWave type="ThreeDots" color="#0b69ff" height="200" width="250" />
        </div>
      </div>
    );
  };

  const onClickDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevState) => prevState - 1);
    }
  };
  const onClickAddToCart = () => {
    setisClickedAddToCart(true);
    if (isClickedAddToCart === false) {
      addtoCart({ ...eachProductdetails, quantity });
    }

    if (isClickedAddToCart) {
      navigate("/cart");
    }
  };
  const onClickIncreaseQuantity = () =>
    setQuantity((prevState) => prevState + 1);
  const getSuccessView = () => {
    const {
      availability,
      brand,
      description,
      imageUrl,
      price,
      rating,
      totalReviews,
      title,
    } = eachProductdetails;
    return (
      <div>
        <Header />
        <div className="eachproduct-details-container">
          <div className="eachproduct-details-image-container">
            <img
              src={imageUrl}
              alt="img"
              className="eachproduct-details-image"
            />
          </div>
          <div className="eachproduct-details-text-container">
            <h1>{title}</h1>
            <p>Rs {price}/-</p>
            <div className="rating-container-productitem-details">
              <p className="rating-product-item-details">{rating}</p>
              <AiOutlineStar />
            </div>
            <p>{totalReviews} Reviews</p>
            <p>{description}</p>
            <p>Availability: {availability}</p>
            <p>Brand: {brand}</p>
            <div className="line"></div>
            {isClickedAddToCart ? (
              <div className="added-to-cart-text">
                <p>ADDED TO CART</p>
              </div>
            ) : (
              <div className="eachproduct-buttons-container">
                <button onClick={onClickDecreaseQuantity}>-</button>
                <p>{quantity}</p>
                <button onClick={onClickIncreaseQuantity}>+</button>
              </div>
            )}
            <button onClick={onClickAddToCart} className="add-to-cart-button">
              {isClickedAddToCart ? "GO TO CART" : "ADD TO CART"}
            </button>
          </div>
        </div>
      </div>
    );
  };
  switch (apiStatus) {
    case apiStatusConsts.progress:
      return getProgressView();
    case apiStatusConsts.success:
      return getSuccessView();
    default:
      return null;
  }
};
export default ProductItemDetails;
