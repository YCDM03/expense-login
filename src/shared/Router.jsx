import { BrowserRouter, Route, Routes } from "react-router-dom";
import Edit from "../pages/Edit";
import Home from "../pages/Home";
import { Provider } from "react-redux";
import store from "../redux/config/store";

const Router = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/edit/:id" element={<Edit />} />
        </Routes>
      </Provider>
    </BrowserRouter>
  );
};

export default Router;
