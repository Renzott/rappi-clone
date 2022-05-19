import React, { useEffect } from 'react';
import styles from './home.module.scss';
import { connect } from "react-redux"
import { fetchUser } from '../../features/user/userService';
import { pullUser } from '../../features/user/userSlice';
import Navbar from '../../components/navbar';


/*global google*/
function Home({ user, pullUser }) {

  const handleLoginGoogle = response => {
    console.log(response)
  }

  const listSuggestions = [
    {
      id: 1,
      name: 'Pizza',
    },
    {
      id: 2,
      name: 'Hamburguesa',
    },
    {
      id: 3,
      name: 'Ensalada',
    },
    {
      id: 4,
      name: 'Pasta',
    },
    {
      id: 5,
      name: 'Sushi',
    },
    {
      id: 6,
      name: 'Tacos',
    },
  ]

  useEffect(() => {
    google.accounts.id.initialize({
      client_id: '249300424095-u9umemjm34vud1bd8v7ctckgqjh4qvvj.apps.googleusercontent.com',
      auto_select: true,
      context: 'signin',
      cancel_on_tap_outside: true,
      callback: handleLoginGoogle,
    })
  }, []);

  // landing page center search box
  return (
    <div>
      <Navbar />
      <div className={styles.home}>
        <div className={styles.landing}>
          <div className={styles.landingContent}>
            <h1>Rappi Clon</h1>
            <img src="https://www.foodiesfeed.com/wp-content/uploads/2021/05/avocado-tree.jpg" alt="Rappi" />
          </div>
          <div className={styles.searchContent}>
            <div className={styles.searchBox}>
              <input type="text" placeholder="Buscar productos" />
              <button className={styles.searchButton}>
                <i className="fa-solid fa-search"></i>
              </button>
              <ul className={styles.suggestions}>
                {listSuggestions.map(({id,name}) => {
                  return (
                    <li key={id}>{name}</li>
                  )
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    pullUser: () => dispatch(pullUser())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);