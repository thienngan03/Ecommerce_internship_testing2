import './Navbar.css';
import logo from '../Assets/logo.png'; // Adjust the path as necessary
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faHome, faShoppingCart,  faShoppingBag,faUser, faGear, faShoppingBasket, faBagShopping, faHouse, faHouseChimney, faStore  } from '@fortawesome/free-solid-svg-icons';
import { faHome, faShoppingCart,  faShoppingBag,faUser, faGear, faStore  } from '@fortawesome/free-solid-svg-icons';
// import  { useEffect, useState } from 'react';
import  { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../Hooks/useAuth.tsx';
// import { getCartsByBuyerId } from '../../Api/buyerAPI.jsx';


const Navbar = () => {
  const [menu, setMenu] = useState(null);
  const { isAuthenticated, logout,user} = useAuth();
    // const { isAuthenticated, logout,user, buyerId } = useAuth();
  // const [cartCount, setCartCount] = useState(0);

  const handleLogout = () => {
    logout();
  };
// useEffect(() => {
//     const fetchCartCount = () => {
//       if (user && user.role === 'buyer') {
//         const carts = getCartsByBuyerId(buyerId);
//         if (carts && carts.products) {
//           setCartCount(carts.products.length);
//         }
//         else {
//           setCartCount(0);
//         }
//       }
//     };
//     fetchCartCount();
//   }, [user, buyerId]);

  return (
    <nav className="navbar">
        <div className="navbar-brand">
          <img src={logo} alt="Logo" className="navbar-logo" />
          <h1>E-Shop</h1>
        </div>
        <ul className={`navbar-menu`}>
          <li onClick={()=>{setMenu("home")}}><Link to ='/home'><FontAwesomeIcon icon={faHome} /></Link>{menu==="home"?<hr/>:<></>}</li>
          <li onClick={()=>{setMenu('shop')}}><Link to = '/shop'><FontAwesomeIcon icon={faShoppingBag} /></Link>{menu==="shop"?<hr/>:<></>}</li>
          <li onClick={()=>{setMenu('setting')}}><Link to = '/setting'><FontAwesomeIcon icon={faGear} /></Link>{menu==="setting"?<hr/>:<></>}</li>
          {user && user.role === 'buyer' && (
            <li onClick={()=>{setMenu('account')}}><Link to = '/buyer/account'><FontAwesomeIcon icon={faUser} /></Link>{menu==="account"?<hr/>:<></>}</li>
        )}

        </ul>
        <div className="navbar-actions">
          {isAuthenticated && (
            <button onClick={handleLogout} className="navbar-button">Logout</button>
          )}
          {!isAuthenticated && (
            <>
              <button onClick={()=>{setMenu("login")}} className="navbar-button" ><Link style={{textDecoration: 'none'}} to = '/login'>Login</Link></button>
              <button onClick={()=>{setMenu("signup")}} className="navbar-button"><Link style={{textDecoration: 'none'}} to = '/signup'>Sign Up</Link></button>
            </>
          )}
        </div>
        <div className="navbar-cart">
        {user && user.role === 'buyer' && (
          <Link to="/buyer/cart" className="cart-icon">
            <FontAwesomeIcon icon={faShoppingCart} />
            {/* <div className="cart-count">{cartCount}</div> */}
          </Link>
        )}
        { user && user.role === 'seller' && (
          // <Link to="/seller/category" className="cart-icon">
          // <Link to="/seller/createProduct" className="cart-icon">
          // <Link to="/seller/product" className="cart-icon">
          <Link to="/seller/order" className="cart-icon">
            <FontAwesomeIcon icon={faStore} />
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
