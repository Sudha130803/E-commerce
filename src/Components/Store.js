import React, { useEffect, useState } from "react";
import Product from "./Product";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import "./Store.css";

const Store = ({ searchText }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("");

  const productsPerPage = 8;

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.products));

    fetch("https://dummyjson.com/products/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    setCurrentPage(1);
    console.log(event.target.value)
  };


  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
    const matchesSearch = searchText ? product.title.toLowerCase().includes(searchText.toLowerCase()) : true;
    return matchesCategory && matchesSearch;
  });

  const lastIndex = currentPage * productsPerPage;
  const firstIndex = lastIndex - productsPerPage;
  const currentProducts = filteredProducts.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <div className="home-container">
      <select className="Dropdown" onChange={handleCategoryChange} value={selectedCategory}>
        <option value="">Select Categories</option>
        {categories.map((category, index) => (
          <option key={index} value={category.slug}>
            {category.name}
          </option>
        ))}
      </select>

      <div className="product-grid">
        {currentProducts.length > 0 ? (
          currentProducts.map((product) => <Product key={product.id} product={product} />)
        ) : (
          <p>No products found.</p>
        )}
      </div>

      {filteredProducts.length > productsPerPage && (
        <div className="paginate">
          <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
            <FaArrowAltCircleLeft />
          </button>

          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              className={currentPage === index + 1 ? "active" : ""}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}

          <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>
            <FaArrowAltCircleRight />
          </button>
        </div>
      )}
    </div>
  );
};

export default Store;
