// APP dùng để chia Router
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthLayout from "./layout/auth";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import OwnerLayout from "./layout/owner";
import Dashboard from "./pages/dashboard";
import Manage from "./pages/manage";
import ErrorPage from "./components/ErrorPage";
import OrderList from "./pages/order/list";
import OrderDetail from "./pages/order/detail";
import CustomerList from "./pages/customer/list";
import CustomerDetail from "./pages/customer/detail";
import RestaurantList from "./pages/restaurant/list";
import RestaurantDetail from "./pages/restaurant/detail";
import RestaurantAdd from "./pages/restaurant/add";
import RestaurantEdit from "./pages/restaurant/edit";
import ProductList from "./pages/product/list";
import ProductDetail from "./pages/product/detail";
import ProductAdd from "./pages/product/add";
import ProductEdit from "./pages/product/edit";
import RemoveRecent from "./pages/remove";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<AuthLayout />}>
            <Route index element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          <Route path="*" element={<OwnerLayout />}>
            <Route index element={<ErrorPage />} />
          </Route>

          <Route path="/owner" element={<OwnerLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="manage" element={<Manage />} />
            <Route path="order">
              <Route index element={<ErrorPage />} />
              <Route path="list" element={<OrderList />} />
              <Route path="detail" element={<OrderDetail />} />
            </Route>
            <Route path="customer">
              <Route index element={<ErrorPage />} />
              <Route path="list" element={<CustomerList />} />
              <Route path="detail" element={<CustomerDetail />} />
            </Route>
            <Route path="restaurant">
              <Route index element={<ErrorPage />} />
              <Route path="list" element={<RestaurantList />} />
              <Route path="detail" element={<RestaurantDetail />} />
              <Route path="add" element={<RestaurantAdd />} />
              <Route path="edit" element={<RestaurantEdit />} />
            </Route>
            <Route path="product">
              <Route index element={<ErrorPage />} />
              <Route path="list" element={<ProductList />} />
              <Route path="detail">
                <Route index element={<ErrorPage />} />
                <Route path=":id" element={<ProductDetail />} />
              </Route>
              <Route path="add" element={<ProductAdd />} />
              <Route path="edit/:productId" element={<ProductEdit />} />
            </Route>
            <Route path="remove" element={<RemoveRecent/>} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
