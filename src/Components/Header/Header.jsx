import React from "react";
import { Link } from "react-router-dom";
import { Avatar } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../Actions/User";

const Header = () => {
     const { isAuthenticated, user } = useSelector((state) => state.user);
     const dispatch = useDispatch();

     const handleLogout = () => {
          dispatch(logoutUser());
     };

     return (
          <header className="bg-teal-800 text-white py-4">
               {" "}
               {/* Changed background color to teal-600 */}
               <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                    <Link to="/" className="flex items-center space-x-4">
                         <h1 className="text-2xl font-bold">Y MART</h1>{" "}
                         {/* Main title */}
                    </Link>
                    <nav className="hidden md:flex space-x-4 self-center">
                         <Link to="/" className="hover:text-gray-100 mt-3">
                              <img
                                   src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXNob3BwaW5nLWNhcnQiPjxjaXJjbGUgY3g9IjgiIGN5PSIyMSIgcj0iMSIvPjxjaXJjbGUgY3g9IjE5IiBjeT0iMjEiIHI9IjEiLz48cGF0aCBkPSJNMi4wNSAyLjA1aDJsMi42NiAxMi40MmEyIDIgMCAwIDAgMiAxLjU4aDkuNzhhMiAyIDAgMCAwIDEuOTUtMS41N2wxLjY1LTcuNDNINS4xMiIvPjwvc3ZnPg=="
                                   alt="shop"
                              />
                         </Link>{" "}
                         {/* Link color on hover */}
                         <Link to="/cart" className="hover:text-gray-100 mt-3">
                              <img
                                   src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXNob3BwaW5nLWJhc2tldCI+PHBhdGggZD0ibTE1IDExLTEgOSIvPjxwYXRoIGQ9Im0xOSAxMS00LTciLz48cGF0aCBkPSJNMiAxMWgyMCIvPjxwYXRoIGQ9Im0zLjUgMTEgMS42IDcuNGEyIDIgMCAwIDAgMiAxLjZoOS44YTIgMiAwIDAgMCAyLTEuNmwxLjctNy40Ii8+PHBhdGggZD0iTTQuNSAxNS41aDE1Ii8+PHBhdGggZD0ibTUgMTEgNC03Ii8+PHBhdGggZD0ibTkgMTEgMSA5Ii8+PC9zdmc+"
                                   alt="cart"
                              />
                         </Link>
                         <Link
                              to="/orders"
                              className="hover:text-gray-100 mt-3">
                              <img
                                   src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNyZWRpdC1jYXJkIj48cmVjdCB3aWR0aD0iMjAiIGhlaWdodD0iMTQiIHg9IjIiIHk9IjUiIHJ4PSIyIi8+PGxpbmUgeDE9IjIiIHgyPSIyMiIgeTE9IjEwIiB5Mj0iMTAiLz48L3N2Zz4="
                                   alt="Order"
                              />
                         </Link>
                         {isAuthenticated ? (
                              <>
                                   <button
                                        onClick={handleLogout}
                                        className="hover:text-gray-100">
                                        <Avatar src="/broken-image.jpg" />
                                        {/* <span className="hover:text-gray-300">{user.username}</span> */}
                                   </button>
                              </>
                         ) : (
                              <Link
                                   to="/login"
                                   className="hover:text-gray-100 mt-3">
                                   <img
                                        src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWxvZy1pbiI+PHBhdGggZD0iTTE1IDNoNGEyIDIgMCAwIDEgMiAydjE0YTIgMiAwIDAgMS0yIDJoLTQiLz48cG9seWxpbmUgcG9pbnRzPSIxMCAxNyAxNSAxMiAxMCA3Ii8+PGxpbmUgeDE9IjE1IiB4Mj0iMyIgeTE9IjEyIiB5Mj0iMTIiLz48L3N2Zz4="
                                        alt="Login"
                                   />
                              </Link>
                         )}
                    </nav>
               </div>
          </header>
     );
};

export default Header;
