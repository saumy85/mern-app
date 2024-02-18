import "./App.css";
import Nav from "./component/Nav";
import Footer from "./component/Footer";
import SignUp from "./component/SignUp";
import PrivateComponent from "./component/PrivateCommponent";
import Login from "./component/Login";
import ProductList from "./component/ProductList";
import Addproduct from "./component/Addproduct";
import UpdateProduct from "./component/UpdateProduct";
import Profile from "./component/Profile";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />

        <Routes>
          <Route element={<PrivateComponent />}>
            <Route
              path="/"
              element={<ProductList/>}
            ></Route>
            <Route
              path="/add"
              element={<Addproduct/>}
            ></Route>
            <Route
              path="/update/:id"
              element={<UpdateProduct/>}
            ></Route>
            <Route path="/logout" element={<h1>Logout Component</h1>}></Route>
            <Route path="/profile" element={<Profile/>}></Route>
          </Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
