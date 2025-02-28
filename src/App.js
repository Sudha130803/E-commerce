import { BrowserRouter, Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Header from "./Header";
import Store from "./Components/Store";
import Account from "./Components/Account";
import Wishlist from "./Components/Wishlist";
import Basket from "./Components/Basket";
import { WishlistProvider } from "./Components/WishlistContext";
import { BasketProvider } from "./Components/BasketContext";
import { useEffect, useState } from "react";
import BillingPage from "./Components/BillingPage";
import SignIn from "./Components/SignIn";
import SignUp from "./Components/SignUp";

function PrivateRoute({ children }) {
  const isAuthenticated = sessionStorage.getItem("signedIn") === "true"; // Use sessionStorage
  return isAuthenticated ? children : <Navigate to="/" />;
}

function App() {
  const [searchtext, setSearchText] = useState("");
  const [signedIn, setSignedIn] = useState(() => {
    return sessionStorage.getItem("signedIn") === "true";  // Use sessionStorage instead of localStorage
  });

  useEffect(() => {
    sessionStorage.setItem("signedIn", signedIn);
  }, [signedIn]);

  return (
    <WishlistProvider>
      <BasketProvider>
        <BrowserRouter>
          {!signedIn ? (
            <Routes>
              <Route path="/" element={<SignIn setSignedIn={setSignedIn} />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          ) : (
            <>
              <Header setSearchQuery={setSearchText} />
              <Routes>
                <Route path="/" element={<Store searchText={searchtext} />} />
                <Route path="/account" element={<PrivateRoute><Account /></PrivateRoute>} />
                <Route path="/wishlist" element={<PrivateRoute><Wishlist searchText={searchtext} /></PrivateRoute>} />
                <Route path="/basket" element={<PrivateRoute><Basket /></PrivateRoute>} />
                <Route path="/billing" element={<PrivateRoute><BillingPage /></PrivateRoute>} />
                <Route path="/logout" element={<SignOut setSignedIn={setSignedIn} />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </>
          )}
        </BrowserRouter>
      </BasketProvider>
    </WishlistProvider>
  );
}

const SignOut = ({ setSignedIn }) => {
  useEffect(() => {
    setSignedIn(false);
    sessionStorage.removeItem("signedIn"); // Remove sessionStorage instead of localStorage
  }, []);

  return <h2 className="message">Logging out...</h2>;
};

export default App;
