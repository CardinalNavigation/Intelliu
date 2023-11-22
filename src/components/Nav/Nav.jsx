import React, { useState } from "react";
import { Link } from "react-router-dom";
import LogOutButton from "../LogOutButton/LogOutButton";
import "./Nav.css";
import { useSelector } from "react-redux";

function Nav() {
  const user = useSelector((store) => store.user);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  return (
    <>
      <div className="flex items-center justify-around  ">
        <div className="intelliuLogo pl-4 pt-2">
          <Link to="/dashboard">
            {/* <h2 className="text-white text-2xl">IntelliU</h2> */}
            <img
              src="/images/IntelliUD.png"
              alt="Intelliu Logo"
              className="w-[200px]"
            />
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          {!user.id ? (
            <>
              <Link
                className="px-4 py-2 rounded hover:text-green-600"
                to="/about"
              >
                About
              </Link>
              <Link
                className="px-4 py-2 rounded hover:text-green-600"
                to="/login"
              >
                Login
              </Link>
            </>
          ) : (
            <>
              {user.role === "intelliu" && (
                <>
                  <Link
                    className="font-sans px-4 py-2 rounded hover:text-green-600"
                    to="/adminstandards"
                  >
                    Admin Standards
                  </Link>
                  <Link
                    className="font-sans px-4 py-2 rounded hover:text-green-600"
                    to="/registration"
                  >
                    Register New User
                  </Link>

                  <div className="dropdown group inline-block relative">
                    <button
                      className="font-sans px-4 py-2 rounded hover:text-green-600"
                      onClick={toggleDropdown}
                    >
                      More
                    </button>
                    {isDropdownOpen && (
                      <div className="dropdownList absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                          <Link
                            to="/newitem"
                            className="text-sans block px-4 py-2 text-sm hover:bg-gray-100"
                            onClick={closeDropdown}
                          >
                            New Item
                          </Link>
                          <Link
                            to="/faq"
                            className="text-sans block px-4 py-2 text-sm hover:bg-gray-100"
                            onClick={closeDropdown}
                          >
                            FAQ
                          </Link>
                          <Link
                            to="/about"
                            className="text-sans block px-4 py-2 text-sm hover:bg-gray-100"
                            onClick={closeDropdown}
                          >
                            About
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}
              {user.role !== "intelliu" && (
                <>
                  <Link
                    className="px-4 font-sans py-2 rounded hover:text-green-600"
                    to="/newitem"
                  >
                    New Item
                  </Link>
                  <Link
                    className="px-4 font-sans py-2 rounded hover:text-green-600"
                    to="/faq"
                  >
                    FAQ
                  </Link>
                  <Link
                    className="font-sans px-4 py-2 rounded hover:text-green-600"
                    to="/about"
                  >
                    About
                  </Link>
                </>
              )}

              <LogOutButton className="font-sans px-4 py-2 rounded hover:text-green-600" />
            </>
          )}
        </div>
      </div>
    </>
  );
}
//merge #40 TODO
export default Nav;
