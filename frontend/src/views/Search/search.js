import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import Footer from '../../components/footer';
import Layout from '../../components/layout';
import Navbar from '../../components/navbar';
import { findProducts } from '../../features/products/productsSlice';
import { addItem } from '../../features/shoppingCart/shoppingCartSlice';
import Dashboard from './dashboard';
import styles from './search.module.scss';


const data = [
    {
        id: 1,
        name: 'Pizza',
        image: "https://picsum.photos/700/500?random=1",
        price: 10
    },
    {
        id: 2,
        name: 'Hamburguesa',
        image: "https://picsum.photos/700/500?random=2",
        price: 50
    },
    {
        id: 3,
        name: 'Ensalada',
        image: "https://picsum.photos/700/500?random=3",
        price: 20
    },
    {
        id: 4,
        name: 'Pasta',
        image: "https://picsum.photos/700/500?random=4",
        price: 30
    },
    {
        id: 5,
        name: 'Sushi',
        image: "https://picsum.photos/700/500?random=5",
        price: 30
    },
    {
        id: 6,
        name: 'Tacos',
        image: "https://picsum.photos/700/500?random=6",
        price: 40
    }

]

function Search({ productState, addItem, handleFindProducts }) {
    const [searchParams] = useSearchParams();

    const handleAddItem = (item) => {
        addItem(item);
        console.log(item);
    }

    useEffect(() => {
        var name = searchParams.get('q');
        var category = productState.categoryFind;

        handleFindProducts({ name, category });

    }, [searchParams, productState.categoryFind]);

    return (
        <div>
            <Layout>
                <div className={styles.container}>
                    <div className={styles.dashboard}>
                        <Dashboard />
                    </div>
                    <div className={styles.infoContainer}>
                        {productState.products.map(({ id, name, imageUrl, price }) => {
                            return (
                                <div className={styles.item} key={id}>
                                    <div className={styles.imageContainer}>
                                        <img src={imageUrl[0]} alt={name} />
                                        <div className={styles.addCartContainer} onClick={() => handleAddItem({ id, name, imageUrl, price })}>
                                            <i className="fa-solid fa-plus"></i>
                                        </div>
                                    </div>
                                    <div className={styles.info}>
                                        <div className={styles.title}>
                                            {name}
                                        </div>
                                        <div className={styles.description}>
                                            lorem
                                        </div>
                                        <div className={styles.price}>
                                            {price}
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </Layout>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        shoppingCart: state.shoppingCart,
        productState: state.products
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addItem: (item) => dispatch(addItem(item)),
        handleFindProducts: (query) => dispatch(findProducts(query))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);