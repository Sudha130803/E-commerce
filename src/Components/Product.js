import React, { useState, useEffect, useContext } from "react";
import { FcLike } from "react-icons/fc";
import { AiTwotoneHeart } from "react-icons/ai";
import { WishlistContext } from "./WishlistContext";

const ProductCard= ({ product }) => {
  const { wishlist, addToWishlist, removeFromWishlist } = useContext(WishlistContext);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    setLiked(wishlist.some((item) => item.id === product.id));
  }, [wishlist, product.id]);


  const handleLikeClick = () => {
    if (liked) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
    setLiked(!liked);
  };

  return (
    <div className="product-card">
      <div className="wishlist-icon" onClick={handleLikeClick}>
        {liked ? <FcLike size={24} /> : <AiTwotoneHeart size={24} />}
      </div>

      <img src={product.thumbnail} alt={product.title} />
      <h3>{product.title}</h3>
      <p>{product.description.slice(0, 50)}...</p>
      <h3 className="price">${product.price}</h3>

      <div className="star-rating">
        {[...Array(5)].map((_, i) => (
          <span
            key={i}
            className={
              product.rating >= i + 1
                ? "star full"
                : product.rating >= i + 0.5
                ? "star half"
                : "star empty"
            }
          >
            ★
          </span>
        ))}
      </div>
    </div>
  );
};

export default ProductCard;
