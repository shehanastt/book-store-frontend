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

function App() {
  // const userData = JSON.parse(localStorage.getItem('user'));

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/list-books" element={<ListBooks/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/seller/dashboard" element={<SellerDashboard/>}/>
        <Route path="/buyer/dashboard" element={<BuyerDashboard/>}/>
        <Route path="/add/book" element={<AddBook/>}/>
        <Route path="/books/view/:id" element={<ViewBook/>}/>
        <Route path="/books/edit/:id" element={<EditBook/>}/>
        {/* <Route path={`/user/profile/${userData._id}`} element={<ViewProfile/>}/> */}
        <Route path="/user/profile" element={<ViewProfile/>}/>
        <Route path="/user/profile/edit" element={<EditProfile/>}/>
      </Routes>
    </div>
  );
}

export default App;