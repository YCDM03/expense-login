import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Edit from "../pages/Edit";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Resister from "../pages/Register";
import Layout from "../components/layout/Layout";

import { Provider, useSelector } from "react-redux";
import store from "../redux/config/store";

const Router = () => {
  const PrivateRoute = ({ element: Element, ...rest }) => {
    const loginStatus = useSelector((state) => state.login);
    return loginStatus ? <Element {...rest} /> : <Navigate to="/login" />;
  };

  const PublicRoute = ({ element: Element, ...rest }) => {
    const loginStatus = useSelector((state) => state.login);
    return !loginStatus ? <Element {...rest} /> : <Navigate to="/" />;
  };

  return (
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<PrivateRoute element={Home} />} />
            <Route path="/edit/:id" element={<PrivateRoute element={Edit} />} />
            <Route path="/login" element={<PublicRoute element={Login} />} />
            <Route
              path="/register"
              element={<PublicRoute element={Resister} />}
            />
          </Route>
        </Routes>
      </Provider>
    </BrowserRouter>
  );
};

export default Router;
