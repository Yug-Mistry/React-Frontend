// ProductCard.js (Component)

import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
     return (
          <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col border border-gray-200">
               <Link to={`/products/${product._id}`} className="flex-shrink-0">
                    <img
                         src={product.image}
                         alt={product.title}
                         className="w-full h-48 object-cover object-center"
                    />
               </Link>
               <div
                    className="flex flex-col justify-between flex-grow p-4 border-gray-200 bg-white">
                    <div>
                         <h2 className="text-lg font-semibold text-gray-900 mb-2">
                              {product.title}
                         </h2>
                         <p className="text-gray-700">${product.price}</p>
                         <p className="text-gray-700">{product.color}</p>
                    </div>
                    <Link
                         to={`/products/${product._id}`}
                         className="mt-3 bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded-sm text-sm text-center">
                         View Details
                    </Link>
               </div>
          </div>
     );
};

export default ProductCard;
