import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Header.css";
import { Link } from "react-router-dom";
import { FaBasketShopping } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

function Header({setSearchQuery}) {
    const [categories, setCategories] = useState([]);
    const [selected, setSelected] = useState("");
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    // const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [input, setInput] = useState("");

    const getAll = () => {
        axios.get("https://dummyjson.com/products/categories")
            .then((res) => {
                console.log(res.data);
                setCategories(res.data);
                setLoading(false);
            })
            .catch((e) => {
                setError(e);
                setLoading(false);
            });
        axios.get('https://dummyjson.com/products')
            .then((res) => {
                const validProducts = res.data.products.filter(product =>
                    product.category !== "bundle"
                );
                setProducts(validProducts);
                setFilteredProducts(validProducts);
            })
            .catch((e) => setError("failed to load products"));
    };

    useEffect(() => {
        getAll();
    }, []);

    const handleSearchChanges = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
        console.log(query)
        console.log(selected)

        // Filter based on both search query and selected category
        const filtered = products.filter((product) => {
            const title = typeof product.title === "string" ? product.title.toLowerCase() : "";
            const categoryMatch = selected === "" || product.category.toLowerCase() === selected.toLowerCase();
            return title.includes(query) && categoryMatch;
        });

        setFilteredProducts(filtered);
    };

    const navigate=useNavigate()
    const handleLogOut=()=>{
        navigate("/SignIn")
    }

    // const handleCategoryChange = (event) => {
    //     const category = event.target.value;
    //     setSelected(category);

    //     // Filter based on both search query and selected category
    //     const filtered = products.filter((product) => {
    //         const title = typeof product.title === "string" ? product.title.toLowerCase() : "";
    //         const categoryMatch = category === "" || product.category.toLowerCase() === category.toLowerCase();
    //         return title.includes(searchQuery.toLowerCase()) && categoryMatch;
    //     });
    //     setFilteredProducts(filtered);
    // };

    return (
        <div className="Main-header">
            <div className="header">
                <div id="logo">
                    <h1>Logo</h1>
                </div>
                <form className="searchbutton" action="search_result.html" method="get">
                    <input type="search" name="query" className="search-box" placeholder="Search..." onChange={handleSearchChanges} />
                </form>
                <ul>
                    <li>
                        <Link to={"/"}>Store</Link>
                    </li>
                    <li>
                        <Link to={"/Account"}>Account</Link>
                    </li>
                    <li>
                        <Link to={"/Wishlist"}>Wish List</Link>
                    </li>
                    <li>
                        <Link to={"/Basket"}>Basket<FaBasketShopping /></Link>
                    </li>
                    <li>
                        <button><Link to="/logout" className="logout" onClick={handleLogOut} >LogOut</Link></button>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Header;