import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import Home from "./components/Home";
import Cart from "./components/Cart";
import Products from "./components/Products";
import NotFound from "./components/NotFound";
import ProtectedRoutes from "./components/ProtectedRoutes";
import ProductItemDetails from "./components/ProductItemDetails";
import CartContext from "./context/CartContext";
import NoInternetConnection from "./components/NoInternet";
const App = () => {
  const parsedCartList = JSON.parse(sessionStorage.getItem("cart_list"));
  const [cartList, setcartList] = useState(
    parsedCartList === null ? [] : parsedCartList
  );
  const addtoCart = (product) => {
    setcartList((prevState) => {
      const duplicateProductIndex = prevState.findIndex((eachProduct) => {
        if (eachProduct.id === product.id) {
          return true;
        } else {
          return false;
        }
      });
      if (duplicateProductIndex !== -1) {
        const duplicateProduct = prevState.slice(
          duplicateProductIndex,
          duplicateProductIndex + 1
        );
        prevState.splice(duplicateProductIndex, 1, {
          ...duplicateProduct[0],
          quantity: duplicateProduct[0].quantity + product.quantity,
        });
        return [...prevState];
      } else {
        return [...prevState, product];
      }
    });
  };
  const deletecartList = () => setcartList([]);
  const increaseCartItem = (product) => setcartList([...product]);
  const decreaseCartItem = (product) => setcartList([...product]);
  const onClickDelete = (product) => setcartList([...product]);
  useEffect(() => {
    sessionStorage.setItem("cart_list", JSON.stringify(cartList));
  }, [cartList]);

  return (
    <NoInternetConnection>
      <CartContext.Provider
        value={{
          cartList,

          addtoCart: addtoCart,
          deletecartList: deletecartList,
          decreaseCartItem: decreaseCartItem,
          increaseCartItem: increaseCartItem,
          onClickDelete: onClickDelete,
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route element={<ProtectedRoutes />}>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/product/:id" element={<ProductItemDetails />} />
            </Route>
            <Route path="/not-found" element={<NotFound />} />
            <Route
              path="*"
              element={<Navigate replace={true} to="/not-found" />}
            />
          </Routes>
        </BrowserRouter>
      </CartContext.Provider>
    </NoInternetConnection>
  );
};
export default App;
