import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategories } from '../../store/categorySlice';
import './Navbar.scss';

function Navbar() {
  const dispatch = useDispatch();
  /* 
  const data = useSelector((state) => state.category.data);
  console.log('data: ', data);
  */

  const { data: categories } = useSelector((state) => state.category);
  console.log('categories: ', categories);

  useEffect(() => {
    dispatch(fetchCategories());
    // dispatch(getCartTotal())
  }, []);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="container">
          <div className="navbar-top flex flex-between">
            <Link to="/" className="navbar-brand">
              <span className="text-regal-blue">Shopping</span>
              <span className="text-gold">Hub.</span>
            </Link>
            <form className="navbar-search flex">
              <input type="text" placeholder="Search here ..." />
              <button type="submit" className="navbar-search-btn">
                <i className="fas fa-search" />
              </button>
            </form>
            <div className="navbar-btns">
              <Link to="/cart" className="add-to-cart-btn flex">
                <span className="btn-ico">
                  <i className="fas fa-shopping-cart" />
                </span>
                <div className="btn-txt fw-5">
                  cart<span className="cart-count-value">0</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
        <div className="navbar-bottom bg-regal-blue">
          <div className="container flex flex-between">
            <ul
              className={`nav-links flex ${
                isSidebarOpen ? 'show-nav-links' : ''
              }`}>
              <button
                type="button"
                className="navbar-hide-btn text-white"
                onClick={() => {
                  setIsSidebarOpen(!isSidebarOpen);
                }}>
                <i className="fas fa-times" />
              </button>

              {categories.map((category) => {
                return (
                  <li key={category.id}>
                    <Link
                      to={`/category/${category.name.toLowerCase()}`}
                      className="nav-link text-white"
                      onClick={() => {
                        setIsSidebarOpen(false);
                      }}>
                      {category.name}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <button
              type="submit"
              className="navbar-show-btn text-gold"
              onClick={() => {
                setIsSidebarOpen(true);
              }}>
              <i className="fas fa-bars" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
