import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCart,
  removeFromCart,
  updateCartQuantity,
} from "../../Actions/Cart"; // Adjust path as per your project structure
import { useNavigate } from "react-router-dom";
import Loading from "../Loader/Loading";

const CartPage = () => {
  const dispatch = useDispatch();
  const { cartItems, loading, error } = useSelector((state) => state.cart);
  const { isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getCart());
    }
  }, [dispatch, isAuthenticated]);

  const calculateTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleQuantityChange = (productId, quantity) => {
    dispatch(updateCartQuantity(productId, quantity));
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
       <div className="py-8  min-h-screen">
            {" "}
            {/* Changed background color to gray-200 */}
            <div className="max-w-5xl mx-auto px-6">
                 <h1 className="text-4xl font-extrabold text-teal-600 mb-10">
                      {" "}
                      {/* Changed text color to teal-600 */}
                      Your Cart
                 </h1>
                 {loading ? (
                      <Loading />
                 ) : error ? (
                      <div className="text-center text-red-500">{error}</div>
                 ) : cartItems.length === 0 ? (
                      <div className="text-center text-gray-500">
                           No items in cart
                      </div>
                 ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                           {cartItems.map((item) => (
                                <div
                                     key={item.productId}
                                     className="bg-white shadow-lg rounded-lg overflow-hidden">
                                     <div className="flex items-center justify-between p-6 border-b border-gray-300">
                                          <div className="flex items-center">
                                               <img
                                                    src={item.image}
                                                    alt={item.title}
                                                    className="w-24 h-24 object-cover rounded-lg mr-6"
                                               />
                                               <div>
                                                    <h2 className="text-xl font-bold">
                                                         {item.title}
                                                    </h2>
                                                    <p className="text-sm text-gray-700">
                                                         Price: ₹{" "}
                                                         {item.price.toFixed(2)}
                                                    </p>
                                                    <div className="flex items-center mt-2">
                                                         <label
                                                              htmlFor={`quantity-${item.productId}`}
                                                              className="text-sm text-gray-700 mr-2">
                                                              Quantity:
                                                         </label>
                                                         <input
                                                              type="number"
                                                              id={`quantity-${item.productId}`}
                                                              value={
                                                                   item.quantity
                                                              }
                                                              onChange={(e) =>
                                                                   handleQuantityChange(
                                                                        item.productId,
                                                                        Number(
                                                                             e
                                                                                  .target
                                                                                  .value
                                                                        )
                                                                   )
                                                              }
                                                              className="border rounded-lg w-16 text-center"
                                                              min="1"
                                                         />
                                                    </div>
                                               </div>
                                          </div>
                                          <div className="text-right flex flex-col justify-between">
                                               <p className="text-lg font-semibold">
                                                    ₹{" "}
                                                    {(
                                                         item.price *
                                                         item.quantity
                                                    ).toFixed(2)}
                                               </p>
                                               <button
                                                    onClick={() =>
                                                         handleRemoveFromCart(
                                                              item.productId
                                                         )
                                                    }
                                                    className="mt-2 text-red-600 hover:text-red-800 transition duration-300">
                                                    Remove
                                               </button>
                                          </div>
                                     </div>
                                </div>
                           ))}
                      </div>
                 )}
                 {cartItems.length > 0 && (
                      <div className="mt-10 flex justify-end">
                           <div className="bg-white shadow-lg rounded-lg p-6 w-full md:w-96">
                                {" "}
                                {/* Added background color and rounded corners */}
                                <h2 className="text-2xl font-bold mb-4 text-green-600">
                                     {" "}
                                     {/* Changed text color to green-600 */}
                                     Total Price: ₹{" "}
                                     {calculateTotalPrice().toFixed(2)}
                                </h2>
                                <button
                                     onClick={handleCheckout}
                                     className="w-full bg-blue-500 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition duration-300">
                                     Proceed to Checkout
                                </button>
                           </div>
                      </div>
                 )}
            </div>
       </div>
  );
};

export default CartPage;