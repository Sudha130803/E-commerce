import React, { useState, useContext } from "react";
import { BasketContext } from "./BasketContext";
import { QRCodeCanvas } from "qrcode.react";
import { useNavigate } from "react-router-dom";
import "./Store.css";

const BillingPage = () => {
  const { cart } = useContext(BasketContext);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const navigate = useNavigate();
  const GST_PERCENTAGE = 0.18;

  const [formData, setFormData] = useState({
    fullName: {
      firstName: "",
    },
    email: "",
    phone: "",
    address: "",
    zipCode: "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    email: "",
    phone: "",
    address: "",
    zipCode: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "firstName") {
      setFormData((prevState) => ({
        ...prevState,
        fullName: {
          ...prevState.fullName,
          firstName: value,
        },
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }

    // Clear error message when input changes
    setErrors((prevState) => ({
      ...prevState,
      [name]: "",
    }));
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    // Name Validation
    const nameRegex = /^[a-zA-Z\s]*$/;
    if (!formData.fullName.firstName.trim()) {
      newErrors.firstName = "First name is required";
      isValid = false;
    } else if (!nameRegex.test(formData.fullName.firstName)) {
      newErrors.firstName = "First name must contain only alphabets";
      isValid = false;
    }

    // Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format";
      isValid = false;
    }

    // Phone Validation
    const phoneRegex = /^[0-9]{10}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
      isValid = false;
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Invalid phone number format (10 digits)";
      isValid = false;
    }

    // Address Validation
    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
      isValid = false;
    }

    // Zip Code Validation
    const zipRegex = /^[0-9]{5,6}$/;
    if (!formData.zipCode.trim()) {
      newErrors.zipCode = "ZIP code is required";
      isValid = false;
    } else if (!zipRegex.test(formData.zipCode)) {
      newErrors.zipCode = "Invalid ZIP code format (5 or 6 digits)";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const getTotalPrice = () => cart.reduce((total, item) => total + item.price, 0);
  const gstAmount = getTotalPrice() * GST_PERCENTAGE;
  const total = gstAmount + getTotalPrice();

  if (!cart) {
    return <p>Loading cart...</p>;
  }

  const handleCashOnDelivery = () => {
    setPaymentMethod("cash");
    setOrderPlaced(true);
  };

  const handleOnlinePayment = () => {
    setPaymentMethod("online");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (validateForm()) {
      console.log("Form submitted:", formData);
      setFormSubmitted(true);
      alert("Details saved! Now, you can proceed with payment.");
    }
  };

  const onClose=()=>{

    navigate("/")
  }

  return (
    <div className="billing">
      <h2>Billing Page</h2>
      <form className="buy-now" onSubmit={handleSubmit}>
        <label htmlFor="firstName">Name</label>
        <input
          type="text"
          className="firstname"
          name="firstName"
          placeholder="Enter your name"
          value={formData.fullName.firstName}
          onChange={handleChange}
        />
        {errors.firstName && <span className="error">{errors.firstName}</span>}

        <label htmlFor="email">Email Address</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your Email Address"
        />
        {errors.email && <span className="error">{errors.email}</span>}

        <label htmlFor="phone">Phone Number</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Enter your mobile number"
        />
        {errors.phone && <span className="error">{errors.phone}</span>}

        <label htmlFor="address">Shipping Address</label>
        <input
          type="text"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Enter your address"
        />
        {errors.address && <span className="error">{errors.address}</span>}

        <label htmlFor="zipCode">ZIP Code</label>
        <input
          type="text"
          id="zipCode"
          name="zipCode"
          value={formData.zipCode}
          onChange={handleChange}
          placeholder="Enter ZIP Code"
        />
        {errors.zipCode && <span className="error">{errors.zipCode}</span>}

        <button type="submit" className="submitbtn">Submit</button>
      </form>

      <div className="closebtn">
        {cart.length === 0 ? (
          <p>Your cart is empty. Please add items before billing.</p>
        ) : (
          <div className="qrcode">
            <p>GST (18%): ${gstAmount.toFixed(2)}</p>
            <h3>Total: ${total.toFixed(2)}</h3>

            {formSubmitted && (
              !paymentMethod ? (
                <div>
                  <button onClick={handleCashOnDelivery}>Cash on Delivery</button>
                  <button onClick={handleOnlinePayment}>Online Payment</button>
                </div>
              ) : paymentMethod === "cash" && orderPlaced ? (
                <p>Your order has been placed! Thank you.</p>
              ) : paymentMethod === "online" ? (
                <div>
                  <p>Scan the QR code to pay:</p>
                  <QRCodeCanvas value={`Payment for $${total}`} size={128} />
                  <p>Total: ${total}</p>
                </div>
              ) : null
            )}
          </div>
        )}
        <button className="closing" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default BillingPage;
