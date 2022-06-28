import React from 'react'
import { connect } from 'react-redux'
import Layout from '../../components/layout'
import { finishOrden } from '../../features/shoppingCart/shoppingCartSlice'

function Confirm({ shoppingCart, handleFinishOrder }) {

    const handleClick = () => {
        handleFinishOrder();
    }

    return (
        <Layout hiddenSearch={true}>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h1>Confirmar compra</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Producto</th>
                                    <th>Precio</th>
                                </tr>
                            </thead>
                            <tbody>
                                {shoppingCart.items.map((product) => {
                                    // please delete this line
                                    var key = Math.random();
                                    return (
                                        <tr key={key}>
                                            <td>{product.name}</td>
                                            <td>{product.price}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <button className="btn btn-primary" onClick={handleClick}>Confirmar</button>
                    </div>
                </div>
            </div>
        </Layout>
    )
}


const mapStateToProps = state => {
    return {
        shoppingCart: state.shoppingCart
    }
}

const mapDispatchToProps = dispatch => {
    return {
        handleFinishOrder: () => dispatch(finishOrden())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Confirm)