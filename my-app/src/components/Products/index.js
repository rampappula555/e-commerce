import "./index.css";
import { MdArrowUpward } from "react-icons/md";
import Header from "../Header";
import PrimeDealsSection from "../PrimeDealsSection";
import AllProductsSection from "../AllProductsSection";
import { AiOutlineArrowDown } from "react-icons/ai";
import { useState } from "react";
const Products = () => {
  const [isScroll, setIsScroll] = useState(false);
  const onClickTopButton = () => {
    if (isScroll) {
      window.scrollTo(0, 0);
    } else if (isScroll === false) {
      window.scrollTo(0, document.body.scrollHeight);
    }
  };

  window.addEventListener("scroll", () => {
    if (window.scrollY >= 500) {
      setIsScroll(true);
    } else {
      setIsScroll(false);
    }
  });
  return (
    <div>
      <Header />
      <PrimeDealsSection />
      <AllProductsSection />

      <div className="go-to-top-button">
        <button className="top-button" onClick={onClickTopButton}>
          {isScroll ? (
            <MdArrowUpward className="top-button-image" />
          ) : (
            <AiOutlineArrowDown className="top-button-image" />
          )}
        </button>
      </div>
    </div>
  );
};
export default Products;
