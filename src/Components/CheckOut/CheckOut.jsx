import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createOrder } from "../../Actions/Order";
import { useNavigate } from "react-router-dom";

// Reusable Input Component
const TextInput = ({ id, label, type, name, value, onChange, error }) => (
  <div className="mb-4">
    <label htmlFor={id} className="block text-sm font-medium">
      {label}
    </label>
    <input
      type={type}
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50 text-black"
      required
    />
    {error && <p className="text-red-500 text-sm">{error}</p>}
  </div>
);

const CheckOut = () => {
  const [form, setForm] = useState({
    email: "",
    address: "",
    contact: "",
  });
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const validate = () => {
    const errors = {};
    if (!form.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      errors.email = "Email is invalid";
    }
    if (!form.address) {
      errors.address = "Address is required";
    }
    if (!form.contact) {
      errors.contact = "Contact is required";
    } else if (!/^\d{10}$/.test(form.contact)) {
      errors.contact = "Contact is invalid";
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      dispatch(
        createOrder({ ...form, cartTotal: calculateTotalPrice() }, navigate)
      );
    }
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };
  const totalAmount = calculateTotalPrice();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-red-600 mb-4">
            Your cart is empty
          </h1>
          <button
            onClick={() => navigate("/shop")}
            className="px-6 py-3 bg-teal-500 text-white font-bold rounded-md hover:bg-teal-600 transition duration-300"
          >
            Go to Shop
          </button>
        </div>
      </div>
    );
  }

  return (
       <div className="min-h-screen flex items-center justify-center bg-teal-50">
            <div className="w-full max-w-4xl mx-auto p-4">
                 <h1 className="text-4xl font-extrabold mb-8 text-center text-teal-600">
                      Address And Payment
                 </h1>
                 <div className="flex flex-col lg:flex-row justify-between gap-8">
                      <div className="bg-teal-700 text-white shadow-md rounded-lg p-8 w-full lg:w-1/2">
                           <h2 className="text-2xl font-bold mb-6 text-center">
                                Add Shipping Address
                           </h2>
                           <form onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 gap-6">
                                     <TextInput
                                          id="email"
                                          label="Enter Your Email"
                                          type="email"
                                          name="email"
                                          value={form.email}
                                          onChange={handleChange}
                                          error={errors.email}
                                     />
                                     <TextInput
                                          id="address"
                                          label="Enter Your Address"
                                          type="text"
                                          name="address"
                                          value={form.address}
                                          onChange={handleChange}
                                          error={errors.address}
                                     />
                                     <TextInput
                                          id="contact"
                                          label="Enter Your Contact"
                                          type="text"
                                          name="contact"
                                          value={form.contact}
                                          onChange={handleChange}
                                          error={errors.contact}
                                     />
                                </div>
                                <button
                                     type="submit"
                                     className="w-full mt-6 px-6 py-3 bg-teal-600 text-white font-bold rounded-md hover:bg-teal-700 transition duration-300">
                                     Submit
                                </button>
                           </form>
                      </div>
                      <div className="bg-teal-700 text-white shadow-md rounded-lg p-8 w-full lg:w-1/2 mt-4 lg:mt-0 overflow-y-auto">
                           <h2 className="text-2xl font-bold mb-4">
                                Products Ordered:
                           </h2>
                           {cartItems.map((item, index) => (
                                <div
                                     key={index}
                                     className="flex justify-between items-center mb-2 border-b border-white">
                                     <div>{item.title}</div>
                                     <div className="text-teal-300">
                                          ₹
                                          {(item.price * item.quantity).toFixed(
                                               2
                                          )}
                                     </div>
                                </div>
                           ))}
                      </div>
                 </div>
                 <div className="bg-teal-700 text-white shadow-md rounded-lg p-8 w-full mt-4 text-center">
                      <h2 className="text-2xl font-bold">Total Amount:</h2>
                      <p className="text-4xl mt-2 mb-4">
                           ${totalAmount.toFixed(2)}
                      </p>
                      <h2 className="text-2xl font-bold">Payment Method:</h2>
                      <p className="text-2xl mt-2">Pay On Delivery</p>
                 </div>
            </div>
       </div>
  );
};

export default CheckOut;
