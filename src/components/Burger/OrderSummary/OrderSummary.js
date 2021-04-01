import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';
import classes from '../OrderSummary/OrderSummary.css';

const checkoutButton = {
    "font-weight": "bold",
    "text-decoration": "none"
}
class OrderSummary extends Component {
    // This could be a functional component, doesn't have to be a class
    componentWillUpdate() {
        console.log('[OrderSummary] WillUpdate');
    }

    render () {
        console.log(this.props)
        const ingredientSummary = Object.keys( this.props.ingredients )
            .map( igKey => {
                return (
                    <li key={igKey}>
                        <span style={{ textTransform: 'capitalize' }}>{igKey}</span>: {this.props.ingredients[igKey].quantity}
                    </li> );
            } );
        return (
            <Aux>
                <h3>Your Order</h3>
                <p>A delicious burger with the following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price: {this.props.totalPrice.toFixed( 2 )}</strong></p>
                <p>Continue to Checkout?</p>
                <Button btnType="Danger" clicked={this.props.purchaseCancelled}>CANCEL</Button>
                <Link to="/checkout" className={classes.Success} style={checkoutButton} clicked={this.props.purchaseContinued}>CONTINUE</Link>
            </Aux>
        );
    }
}
const mapStateToProps = (state) => (
    {
        "ingredients": state.ingredients,
        "totalPrice": state.totalPrice,
    }
)

export default connect(mapStateToProps)(OrderSummary);