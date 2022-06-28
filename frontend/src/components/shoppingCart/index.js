
import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { clearShoppingCart, clickSidebar } from '../../features/shoppingCart/shoppingCartSlice';
import styles from './shoppingCart.module.scss'


function ShoppingCart({ shoppingCart, handleClickShoppingCart, clearShoppingCart }) {

  const [totalPrice, setTotalPrice] = useState(0);

  const backgroundRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    calculatePrice();
  }, [shoppingCart.items]);

  const handleOusideClick = (e) => {
    if (backgroundRef.current != e.target) {
      return;
    }
    handleClickShoppingCart(!shoppingCart.isShoppingCartOpen);
  }

  const handleClearShoppingCart = () => {
    clearShoppingCart();
  }

  const handleConfirm = () => {
    handleClickShoppingCart(!shoppingCart.isShoppingCartOpen);
    navigate('/confirm');
  }

  const calculatePrice = () => {
    var totalPrice = shoppingCart.items.reduce((acc, item) => acc + item.price, 0);
    setTotalPrice(totalPrice.toFixed(2));
  }


  return (
    <div>
      {shoppingCart.isShoppingCartOpen && (
        <div className={styles.container}>
          <div className={styles.background} onClick={handleOusideClick} ref={backgroundRef}>
            <div className={styles.sidebar}>
              {shoppingCart.items.map(item => {
                return (
                  <div key={Math.random()} className={styles.sidebarItems}>
                    <p>{item.name}</p>
                  </div>
                )
              })}
              <br />
              <div key={Math.random()} className={styles.sidebarItems}>
                <p> Total: {totalPrice}</p>
              </div>

              <br />
              <div className={styles.sidebarButtons}>
                <button onClick={handleClearShoppingCart} className={styles.button}>Limpiar Carrito</button>
                <button onClick={handleConfirm} className={styles.button}>Confirmar Compra</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    shoppingCart: state.shoppingCart
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleClickShoppingCart: (query) => dispatch(clickSidebar(query)),
    clearShoppingCart: () => dispatch(clearShoppingCart())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCart)