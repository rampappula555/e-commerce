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
  const [updatedArray, setupdatedArray] = useState([]);
  useEffect(() => {
    let temp = [];
    let sortedArray = [];
    cartList.map((eachItem) => {
      if (temp.includes(eachItem.id)) {
        for (let i in sortedArray) {
          if (sortedArray[i].id === eachItem.id) {
            sortedArray.splice(i, 1, {
              ...eachItem,
              quantity: sortedArray[i].quantity + eachItem.quantity,
            });
          }
        }
      } else {
        sortedArray.push(eachItem);
        temp.push(eachItem.id);
      }
      return null;
    });
    setupdatedArray(sortedArray);
  }, [cartList]);

  const addtoCart = (product) =>
    setcartList((prevState) => [...prevState, product]);
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
          updatedArray,
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
