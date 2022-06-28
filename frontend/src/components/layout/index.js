import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { pullUser } from '../../features/user/userSlice'
import Footer from '../footer'
import Navbar from '../navbar'
import ShoppingCart from '../shoppingCart'
import styles from './layout.module.scss'

/*global google*/

function Layout({ children, hiddenSearch, userState, pullUser }) {

    const handleLoginGoogle = response => {
        pullUser(response.credential);
    }

    useEffect(() => {

        if (!userState.isLogged) {
            google.accounts.id.initialize({
                client_id: '249300424095-u9umemjm34vud1bd8v7ctckgqjh4qvvj.apps.googleusercontent.com',
                auto_select: true,
                context: 'signin',
                cancel_on_tap_outside: true,
                callback: handleLoginGoogle,
            })
            google.accounts.id.prompt()
        } else {
            pullUser();
        }

    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.containerNavbar}>
                <Navbar hiddenSearch={hiddenSearch} />
            </div>

            <div className={styles.containerChildren}>
                <ShoppingCart />
                {children}
            </div>
            <div className={styles.containerFooter}>
                <Footer />
            </div>
        </div>
    )
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

export default connect(mapStateToProps, mapDispatchToProps)(Layout);