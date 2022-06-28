import React, { useEffect, useState } from 'react';
import SearchBox from '../searchBox';
import styles from './navbar.module.scss';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { clickSidebar } from '../../features/shoppingCart/shoppingCartSlice';

/*global google*/
function Navbar({ shoppingCart, handleClickShoppingCart, hiddenSearch, userState }) {

  const navigate = useNavigate();


  const handleHomeClick = () => {
    navigate('/');
  };

  const handleShoppingClick = () => {
    handleClickShoppingCart(!shoppingCart.isShoppingCartOpen);
  }

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo} onClick={handleHomeClick}>
        <p>Deliveru</p>
      </div>
      {!hiddenSearch && <SearchBox />}
      <div className={styles.menu}>
        <div className={styles.menuShopping} onClick={() => handleShoppingClick()}>
          <i className="fa-solid fa-cart-shopping"></i>
          <p>{shoppingCart.items.length}</p>
        </div>
        {userState.isLogged ? <button className={styles.divCircle}>
          <img src={userState.user.imgPhoto} alt="profile" className={styles.divCircle}/>
        </button>: 
        <button className={styles.menuButton}>
          <i className="fa-solid fa-right-to-bracket">
          </i>
          Ingreso
        </button>}
      </div>
    </nav>
  );
}

const mapStateToProps = (state) => {
  return {
    shoppingCart: state.shoppingCart,
    userState: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleClickShoppingCart: (query) => dispatch(clickSidebar(query))

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);