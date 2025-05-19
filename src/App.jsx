import MenuBar from "./components/layout/MenuBar";
import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./components/pages/Home";
import Register from "./components/pages/auth/Register";
import Login from "./components/pages/auth/Login";
import UpdateProduct from "./components/pages/admin/product/UpdateProduct";
import Shop from "./components/pages/Shop";
import ProductDetail from "./components/pages/ProductDetail";
import Cart from "./components/pages/Cart";
import PageNotFound from "./components/page_not_found/PageNotFound";
import { ToastContainer } from "react-toastify";
import HomeAdmin from "./components/pages/admin/HomeAdmin";
import ManageAdmin from "./components/pages/admin/ManageAdmin";
import CreateCategory from "./components/pages/admin/category/CreateCategory";
import CreateProduct from "./components/pages/admin/product/CreateProduct";
import AllProducts from "./components/pages/admin/product/AllProducts";
import ManageOrder from "./components/pages/admin/ManageOrder";
import CheckOut from "./components/pages/CheckOut";
import Dashboard from "./components/pages/user/Dashboard";
import Profile from "./components/pages/user/Profile";
import Wishlist from "./components/pages/user/Wishlist";
import MyOrder from "./components/pages/user/MyOrder";
import Settings from "./components/pages/user/Settings";
import ContactUs from "./components/pages/ContactUs";
import UserRoute from "./components/routes/UserRoute";
import AdminRoute from "./components/routes/AdminRoute";
import RootLayoutUser from "./components/layout/RootLayoutUser";
import { currentUser } from "./components/functions/auth";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import Loading from "./components/card/Loading";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      currentUser(token)
        .then((res) => {
          dispatch({
            type: "LOGIN",
            payload: {
              token,
              username: res.data.username,
              role: res.data.role,
            },
          });
          setIsInitialLoad(false);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error("Error verifying token:", err);
          if (err.response?.status === 401 || err.response?.status === 404) {
            localStorage.removeItem("token");
            dispatch({ type: "LOGOUT", payload: null });
            navigate("/login");
          } else {
            dispatch({
              type: "LOGIN",
              payload: {
                token,
                username: user?.username || null,
                role: user?.role || null,
              },
            });
          }
          setIsInitialLoad(false);
          setIsLoading(false);
        });
    } else {
      localStorage.removeItem("token");
      dispatch({ type: "LOGOUT", payload: null });
      setIsInitialLoad(false);
      setIsLoading(false);
    }
  }, [dispatch, isInitialLoad]);

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center"><Loading /></div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <ToastContainer
        theme="colored"
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        className="mt-12 sm:mt-16 w-[90%] sm:w-auto mx-auto sm:mx-4"
        toastClassName="text-sm sm:text-base p-2 sm:p-3"
      />
      <MenuBar />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <Routes>
          <Route index element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="/product-detail/:id" element={<ProductDetail />} />
          <Route
            path="/admin/index"
            element={
              <AdminRoute>
                <HomeAdmin />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/manage-admin"
            element={
              <AdminRoute>
                <ManageAdmin />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/create-category"
            element={
              <AdminRoute>
                <CreateCategory />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/create-product"
            element={
              <AdminRoute>
                <CreateProduct />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/update-product/:id"
            element={
              <AdminRoute>
                <UpdateProduct />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/all-product"
            element={
              <AdminRoute>
                <AllProducts />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/manage-order"
            element={
              <AdminRoute>
                <ManageOrder />
              </AdminRoute>
            }
          />
          <Route
            path="/user/index"
            element={
              <UserRoute>
                <RootLayoutUser>
                  <Profile />
                </RootLayoutUser>
              </UserRoute>
            }
          />
          <Route
            path="/user/dashboard"
            element={
              <UserRoute>
                <RootLayoutUser>
                  <Dashboard />
                </RootLayoutUser>
              </UserRoute>
            }
          />
          <Route
            path="/user/wishlist"
            element={
              <UserRoute>
                <RootLayoutUser>
                  <Wishlist />
                </RootLayoutUser>
              </UserRoute>
            }
          />
          <Route
            path="/user/my-order"
            element={
              <UserRoute>
                <RootLayoutUser>
                  <MyOrder />
                </RootLayoutUser>
              </UserRoute>
            }
          />
          <Route
            path="/user/settings"
            element={
              <UserRoute>
                <RootLayoutUser>
                  <Settings />
                </RootLayoutUser>
              </UserRoute>
            }
          />
          <Route
            path="/checkout"
            element={
              <UserRoute>
                <CheckOut />
              </UserRoute>
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;