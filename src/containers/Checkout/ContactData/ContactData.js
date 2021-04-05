import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import BurgerBuilder from '../../BurgerBuilder/BurgerBuilder'
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { stopPurchasing, initIngredients } from '../../store/actions';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false,
        // salad: BurgerBuilder.salad,
        // bacon: BurgerBuilder.bacon,
        // cheese: BurgerBuilder.cheese,
        // meat: BurgerBuilder.meat
    }

    componentWillMount () {
        const query = new URLSearchParams( this.props.location.search );
        const ingredients = {};
        let price = 0;
        for ( let param of query.entries() ) {
            // ['salad', '1']
            if (param[0] === 'price') {
                price = param[1];
            } else {
                ingredients[param[0]] = +param[1];
            }
        }
        this.setState( { ingredients: ingredients, totalPrice: price } );
    }
    orderHandler = ( event ) => {
        event.preventDefault();
        this.setState( { loading: true } );
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Max Schwarzmüller',
                address: {
                    street: 'Teststreet 1',
                    zipCode: '41351',
                    country: 'Germany'
                },
                email: 'test@test.com'
            },
            creditCard: {
                number: '0000 0000 0000 0000',
                expiry: '07/29',
                CVC: '420'
            },
            deliveryMethod: 'fastest'
        }
        axios.get('/place_order?ingredients=' + order.ingredients.bacon.quantity.toString() + "/" + order.ingredients.cheese.quantity.toString() + "/" + order.ingredients.meat.quantity.toString() + "/" + order.ingredients.salad.quantity.toString() + "/" + order.ingredients.ketchup.quantity.toString() + "/" + order.ingredients.mustard.quantity.toString() + "/" + order.ingredients.chicken.quantity.toString())
        this.props.dispatch(stopPurchasing())
        alert("Thank you! Your order was successful! Hit OK to return to the Burger Builder!")
        this.props.history.push("/")
        this.props.dispatch(initIngredients())
    }

    render () {
        console.log(this.props.ingredients.bacon)
        let form = (
            <form>
                <input className={classes.Input} type="text" name="name" placeholder="Your Name" />
                <input className={classes.Input} type="email" name="email" placeholder="Your Mail" />
                <input className={classes.Input} type="text" name="street" placeholder="Street" />
                <input className={classes.Input} type="text" name="postal" placeholder="Postal Code" />
            </form>
        );
        let form2 = (
            <form>
                <input className={classes.Input} type="text" name="ccnumber" placeholder="Credit Card Number" />
                <input className={classes.Input} type="text" name="expiry" placeholder="Expiry Month/Year: Example: (07/29)" />
                <input className={classes.Input} type="text" name="cvc" placeholder="CVC" />
            </form>
        )
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
                <break></break>
                <h4>Enter your Credit Card info.</h4>
                {form2}
                <break></break>
                <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
            </div>
        );
    }
}

const mapStateToProps = (state) => (
    {
        "ingredients": state.ingredients,
    }
)
export default connect(mapStateToProps)(ContactData);