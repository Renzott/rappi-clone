import React, { useEffect } from 'react';
import styles from './home.module.scss';
import { connect } from "react-redux"
import { fetchUser } from '../../features/user/userService';
import { pullUser } from '../../features/user/userSlice';
import Navbar from '../../components/navbar';
import SearchBox from '../../components/searchBox';
import Footer from '../../components/footer';
import Layout from '../../components/layout';
import carritoPng from '../../images/carritoDibujo.png';


/*global google*/
function Home({ userState, pullUser }) {

  return (
    <Layout hiddenSearch={true}>
      <div className={styles.container}>
        <div className={styles.landing}>
          <div className={styles.landingContent}>
            {!userState.user.name ? <h1>Deliveru</h1> : <h1>Bienvenido {userState.user.name}</h1>}
            <img src="https://www.foodiesfeed.com/wp-content/uploads/2021/05/avocado-tree.jpg" alt="Rappi" />
          </div>
          <div className={styles.searchContent}>
            <SearchBox />
          </div>
        </div>
      </div>
      <div className={styles.details}>
        <h1>Encuentre todo lo que quiera en nuestra lista de Productos</h1>
        <img src={carritoPng}></img>
      </div>
    </Layout>
  );
}

const mapStateToProps = state => {
  return {
    userState: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    pullUser: (data) => dispatch(pullUser(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);