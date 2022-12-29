import "./index.css";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { LineWave } from "react-loader-spinner";
import ProductCard from "../ProductCard";
import LazyLoad from "react-lazyload";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const apiStatusConsts = {
  initial: "INITIAL",
  progress: "PROGRESS",
  success: "SUCCESS",
  failure: "FAILURE",
};
const PrimeDealsSection = () => {
  const [apiStatus, setApiStatus] = useState(apiStatusConsts.initial);
  const [primeDeals, setPrimeDeals] = useState([]);
  var settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
  };
  useEffect(() => {
    const getPrimeDeals = async () => {
      setApiStatus(apiStatusConsts.progress);
      const jwtToken = Cookies.get("jwt_token");
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      };
      const response = await fetch("https://apis.ccbp.in/prime-deals", options);
      const data = await response.json();
      if (response.ok) {
        const updatedData = data.prime_deals.map((eachProduct) => ({
          id: eachProduct.id,
          title: eachProduct.title,
          imageUrl: eachProduct.image_url,

          brand: eachProduct.brand,
          price: eachProduct.price,
          rating: eachProduct.rating,
        }));
        setPrimeDeals(updatedData);
        setApiStatus(apiStatusConsts.success);
      } else if (response.status === 401) {
        setApiStatus(apiStatusConsts.failure);
      }
    };
    getPrimeDeals();
  }, []);
  const getProgressView = () => (
    <div className="loader-container">
      <div>
        <LineWave type="ThreeDots" color="#0b69ff" height="200" width="250" />
      </div>
    </div>
  );

  const getSuccessView = () => (
    <div className="primedeals-section-success-view-container">
      <h1>Exclusive Prime Deals</h1>
      <div className="primedeals-container">
        {primeDeals.map((eachProduct) => (
          <ProductCard eachProduct={eachProduct} key={eachProduct.id} />
        ))}
      </div>
    </div>
  );
  const getFailureView = () => (
    <div className="prime-deals-image-container">
      <Slider {...settings}>
        <div>
          <LazyLoad>
            <img
              loading="lazy"
              src="https://assets.ccbp.in/frontend/react-js/exclusive-deals-banner-img.png"
              className="prime-deals-image"
              alt="img"
            />
          </LazyLoad>
        </div>
        <div>
          <LazyLoad>
            <img
              loading="lazy"
              src="https://assets.ccbp.in/frontend/react-js/exclusive-deals-banner-img.png"
              className="prime-deals-image"
              alt="img"
            />
          </LazyLoad>
        </div>
        <div>
          <LazyLoad>
            <img
              loading="lazy"
              src="https://assets.ccbp.in/frontend/react-js/exclusive-deals-banner-img.png"
              className="prime-deals-image"
              alt="img"
            />
          </LazyLoad>
        </div>
        <div>
          <LazyLoad>
            <img
              loading="lazy"
              src="https://assets.ccbp.in/frontend/react-js/exclusive-deals-banner-img.png"
              className="prime-deals-image"
              alt="img"
            />
          </LazyLoad>
        </div>
        <div>
          <LazyLoad>
            <img
              loading="lazy"
              src="https://assets.ccbp.in/frontend/react-js/exclusive-deals-banner-img.png"
              className="prime-deals-image"
              alt="img"
            />
          </LazyLoad>
        </div>
        <div>
          <LazyLoad>
            <img
              loading="lazy"
              src="https://assets.ccbp.in/frontend/react-js/exclusive-deals-banner-img.png"
              className="prime-deals-image"
              alt="img"
            />
          </LazyLoad>
        </div>
      </Slider>
    </div>
  );
  switch (apiStatus) {
    case apiStatusConsts.progress:
      return getProgressView();
    case apiStatusConsts.success:
      return getSuccessView();
    case apiStatusConsts.failure:
      return getFailureView();
    default:
      return null;
  }
};
export default PrimeDealsSection;
