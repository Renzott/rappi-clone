import React, { useEffect } from 'react';
import styles from  './home.module.scss';
import { fetchUser } from '../../store/slices/user/index';
import { useDispatch, useSelector } from "react-redux"
function Home() {

  const { user } = useSelector(state => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <div className={styles.home}>
      <h1>Todo Lisasdts</h1>
      <p>{JSON.stringify(user)}</p>
    </div>
  );
}

export default Home;
