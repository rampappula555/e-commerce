import "./index.css";
import { useEffect, useState } from "react";
import ProductCard from "../ProductCard";
import ProductsHeader from "../ProductsHeader";
import Cookies from "js-cookie";
import { LineWave } from "react-loader-spinner";
const apiStatusConsts = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  progress: "PROGRESS",
};
const AllProductsSection = () => {
  const [apiStatus, setApiStatus] = useState(apiStatusConsts.initial);
  const [activeOptionId, setActiveOptionId] = useState("PRICE_HIGH");
  const [userInput, setUserInput] = useState("");
  const [allProducts, setAllProducts] = useState([]);
  const changePrice = (id) => setActiveOptionId(id);

  useEffect(() => {
    const jwtToken = Cookies.get("jwt_token");
    setApiStatus(apiStatusConsts.progress);
    const getProducts = async () => {
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      };
      const response = await fetch(
        `https://apis.ccbp.in/products?sort_by=${activeOptionId}&title_search=${userInput}`,
        options
      );
      const data = await response.json();

      if (response.ok) {
        const updatedData = data.products.map((eachProduct) => ({
          id: eachProduct.id,
          brand: eachProduct.brand,
          title: eachProduct.title,
          imageUrl: eachProduct.image_url,
          price: eachProduct.price,
          rating: eachProduct.rating,
        }));
        setAllProducts(updatedData);
        setApiStatus(apiStatusConsts.success);
      } else {
        setApiStatus(apiStatusConsts.failure);
      }
    };
    getProducts();
  }, [activeOptionId, userInput]);

  const onSearchInput = (value) => setUserInput(value);
  const apiStatusProgressView = () => (
    <div className="allproducts-section-container">
      <ProductsHeader changePrice={changePrice} onSearchInput={onSearchInput} />
      <div className="loader-container">
        <LineWave type="ThreeDots" color="#0b69ff" height="200" width="250" />
      </div>
    </div>
  );

  const apiStatusSuccessView = () => {
    return (
      <div className="allproducts-section-container">
        <ProductsHeader
          changePrice={changePrice}
          onSearchInput={onSearchInput}
        />
        <div className="allproducts-section">
          {allProducts.length !== 0 ? (
            allProducts.map((eachProduct) => (
              <ProductCard eachProduct={eachProduct} key={eachProduct.id} />
            ))
          ) : (
            <div className="noproducts-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-no-products-view.png"
                className="noproducts-image"
                alt="img"
              />
            </div>
          )}
        </div>
      </div>
    );
  };

  const apiStatusFailureView = () => (
    <div className="allproducts-section-container">
      <ProductsHeader changePrice={changePrice} onSearchInput={onSearchInput} />
      <div className="failure-view-image-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png"
          className="failure-view-image"
          alt="img"
        />
      </div>
    </div>
  );
  switch (apiStatus) {
    case apiStatusConsts.progress:
      return apiStatusProgressView();
    case apiStatusConsts.success:
      return apiStatusSuccessView();
    case apiStatusConsts.failure:
      return apiStatusFailureView();
    default:
      return null;
  }
};
export default AllProductsSection;
