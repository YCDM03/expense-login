import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Edit from "../pages/Edit";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Resister from "../pages/Register";
import Layout from "../components/layout/Layout";
import MyPage from "../pages/MyPage";

import { useSelector } from "react-redux";

const Router = () => {
  const PrivateRoute = ({ element }) => {
    const loginStatus = useSelector((state) => state.user.loginStatus);
    return loginStatus ? element : <Navigate to="/login" />;
  };

  const PublicRoute = ({ element }) => {
    const loginStatus = useSelector((state) => state.user.loginStatus);
    return !loginStatus ? element : <Navigate to="/" />;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<PrivateRoute element={<Home />} />} />
          <Route
            path="/mypage"
            element={<PrivateRoute element={<MyPage />} />}
          />
          <Route
            path="/edit/:id"
            element={<PrivateRoute element={<Edit />} />}
          />
          <Route path="/login" element={<PublicRoute element={<Login />} />} />
          <Route
            path="/register"
            element={<PublicRoute element={<Resister />} />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
