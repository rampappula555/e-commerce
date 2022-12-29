import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
  const parsedCartList = JSON.parse(localStorage.getItem("cart_list"));
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
    localStorage.setItem("cart_list", JSON.stringify(cartList));
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
            <Route extact path="/login" element={<LoginForm />} />
            <Route element={<ProtectedRoutes />}>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/products" element={<Products />} />
              <Route exact path="/cart" element={<Cart />} />
              <Route
                exact
                path="/product/:id"
                element={<ProductItemDetails />}
              />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </CartContext.Provider>
    </NoInternetConnection>
  );
};
export default App;
