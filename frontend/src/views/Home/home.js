import React, { useEffect } from 'react';
import styles from './home.module.scss';
import { connect } from "react-redux"
import { fetchUser } from '../../features/user/userService';
import { pullUser } from '../../features/user/userSlice';


/*global google*/
function Home({ user, pullUser }) {

  useEffect(() => {
    pullUser()
  }, []);

  return (
    <div className={styles.home}>
      <h1>Todo List</h1>
      <p>{JSON.stringify(user)}</p>
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

export default connect(mapStateToProps,mapDispatchToProps)(Home);