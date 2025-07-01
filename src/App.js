import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import SellerDashboard from "./pages/SellerDashboard";
import BuyerDashboard from "./pages/BuyerDashboard";
import ListBooks from "./components/ListBooks";
import Home from "./pages/Home";
import AddBook from "./components/AddBooks";
import ViewBook from "./components/ViewBook";
import EditBook from "./components/EditBook";
import ViewProfile from "./pages/ViewProfile";
import EditProfile from "./pages/EditProfile";
import PublicRoute from "./components/PublicRoute";
import PrivateRoute from "./components/PrivateRoute";

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={
          <PublicRoute>
            <Home/>
          </PublicRoute>
        } />

        <Route path="/list-books" element={
          <PrivateRoute>
            <ListBooks/>
            </PrivateRoute>
          } />

        <Route path="/login" element={
          <PublicRoute>
            <Login/>
          </PublicRoute>
          } />

        <Route path="/register" element={
          <PublicRoute>
            <Register/>
          </PublicRoute>
          } />

        <Route path="/seller/dashboard" element={
          <PrivateRoute>
            <SellerDashboard/>
          </PrivateRoute>
          }/>

        <Route path="/buyer/dashboard" element={
          <PrivateRoute>
            <BuyerDashboard/>
          </PrivateRoute>
          }/>

        <Route path="/add/book" element={
          <PrivateRoute>
            <AddBook/>
          </PrivateRoute>
          }/>

        <Route path="/books/view/:id" element={
          <PrivateRoute>
            <ViewBook/>
          </PrivateRoute>
          }/>

        <Route path="/books/edit/:id" element={
          <PrivateRoute>
            <EditBook/>
          </PrivateRoute>
          }/>

        <Route path="/user/profile" element={
          <PrivateRoute>
            <ViewProfile/>
          </PrivateRoute>
          }/>

        <Route path="/user/profile/edit" element={
          <PrivateRoute>
            <EditProfile/>
          </PrivateRoute>
          }/>
      </Routes>
    </div>
  );
}

export default App;