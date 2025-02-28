import React, { useContext } from "react";
import { WishlistContext } from "./WishlistContext";
import { BasketContext } from "./BasketContext";

const WishlistPage = () => {
  const { wishlist, removeFromWishlist } = useContext(WishlistContext);
  const {addToCart} =useContext(BasketContext)

  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  const handleCartClick=(product)=>{
    
    addToCart(product)
    
    console.log(product)
  }

  return (
    <div className="wishlist">
      <h2>Wishlist</h2>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {wishlist.length === 0 ? (
          <p>Your wishlist is empty.</p>
        ) : (
          wishlist.map((product) => (
            <div className="wishlist-container"
            >
              <img
                src={product.images[0]}
                alt={product.title}
                style={{ width: "100%", height: "auto" }}
              />
              <h3>{product.title}</h3>
              <p>{truncateText(product.description, 60)}</p> 
              <h4>${product.price}</h4>
              <button className="basket" onClick={() => handleCartClick(product)} type="submit" >
                      Add to Cart
                    </button>
              <button
                className="remove"
                onClick={() => removeFromWishlist(product.id)}
                style={{ marginLeft: "10px" }}
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default WishlistPage;