import React, { useContext, useState , useEffect} from "react";
import { BasketContext } from "./BasketContext";
import BillingPage from "./BillingPage";
import { Navigate, useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart = [], removeFromCart } = useContext(BasketContext); // Ensuring cart is always an array
  const [showBillingPage ,setShowBillingPage]=useState(false)
  const[loading,setLoading]=useState(true)
  const navigate=useNavigate()

  useEffect(() => {
    if(cart){
      setLoading(false);
    }
  }, [cart]);

  const truncateText = (text, maxLength) => {
    return text?.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  const handleBuyClick = (product) => { 
    setShowBillingPage(true); // Show BillingPage
    navigate("/billing")
  };

  const closeBillingPage = () => {
    setShowBillingPage(false);
  };


  if(loading){
    return <p>Loading Cart...</p>
  }


  return (
    <div className="cart">
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cart.map((product) => (
          <div key={product.id} className="cart-div" style={{ width: "200px", margin: "5px", padding: "5px",}}>
            <img
              src={product.images?.[0] || "placeholder.jpg"} // Prevents crash if images is undefined
              alt={product.title}
              style={{ width: "100%", height: "auto" }}
            />
            <h3>{product.title}</h3>
            <p>{truncateText(product.description, 60)}</p>
            <h4>${product.price}</h4>
            <button className="cart-buy" onClick={handleBuyClick}>
              Buy
            </button>
            <button className="cart-remove" onClick={() => removeFromCart(product.id)}>Remove from Cart</button>
          </div>
        ))
      )}
      {showBillingPage && <BillingPage onClose={closeBillingPage} />}
    </div>
  );
};

export default Cart;
