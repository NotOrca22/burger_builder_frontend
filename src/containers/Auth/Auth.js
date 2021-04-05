import React, { Component } from 'react';
import { connect, dispatch } from 'react-redux';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';
import Axios from 'axios';
import { login } from '../store/actions'
import { Link, Redirect } from 'react-router-dom';
const checkoutButton = {
    "fontWeight": "bold",
    "textDecoration": "none"
}
class Auth extends Component {
    constructor(props) {
        super(props)
        this.state = {
            controls: {
                email: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'email',
                        placeholder: 'Mail Address'
                    },
                    value: '',
                    validation: {
                        required: true,
                        isEmail: true
                    },
                    valid: false,
                    touched: false
                },
                password: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'password',
                        placeholder: 'Password'
                    },
                    value: '',
                    validation: {
                        required: true,
                        minLength: 6
                    },
                    valid: false,
                    touched: false
                }
            },
            isSignup: false
        }
        this.submitHandler = this.submitHandler.bind(this)
    }

    checkValidity ( value, rules ) {
        let isValid = true;
        if ( !rules ) {
            return true;
        }

        if ( rules.required ) {
            isValid = value.trim() !== '' && isValid;
        }

        if ( rules.minLength ) {
            isValid = value.length >= rules.minLength && isValid
        }

        if ( rules.maxLength ) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if ( rules.isEmail ) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test( value ) && isValid
        }

        if ( rules.isNumeric ) {
            const pattern = /^\d+$/;
            isValid = pattern.test( value ) && isValid
        }

        return isValid;
    }

    inputChangedHandler = ( event, controlName ) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity( event.target.value, this.state.controls[controlName].validation ),
                touched: true
            }
        };
        this.setState( { controls: updatedControls } );
    }
    printResponse = (response) => {
        console.log(response)
    }
    submitHandler = ( event ) => {
        
        if (this.state.isSignup === true) {
            Axios.get("http://localhost:8082/signup?username=" + this.state.controls.email.value + "&password=" + this.state.controls.password.value)
            alert('Signed up! Your username is ' + this.state.controls.email.value + '!')
        } else {
            const url = "http://localhost:8082/signin?username=" + this.state.controls.email.value + "&password=" + this.state.controls.password.value
            Axios.get(url).then((response) => {
                if (response.status === 200) {
                console.log(response.data["Authorization"])
                console.log(response.headers)
                alert('signed in')
                this.props.dispatch(login(response.headers["Authorization"]))
                }
            })
            .catch(error => console.log(error))
            
        }
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {isSignup: !prevState.isSignup};
        });
    }

    render () {
        const formElementsArray = [];
        if (this.props.logged_in) {
            return (
                <h1>Welcome back!</h1>
            )
        } else {
        for ( let key in this.state.controls ) {
            formElementsArray.push( {
                id: key,
                config: this.state.controls[key]
            } );
        }

        const form = formElementsArray.map( formElement => (
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={( event ) => this.inputChangedHandler( event, formElement.id )} />
        ) );

        return (
            <div className={classes.Auth}>
                <form onSubmit={this.submitHandler}>
                 {form}
                 <Link to="/" className={classes.Success} style={checkoutButton} clicked={this.props.submitHandler}>
                 LOGIN
                 </Link>
                </form>
                <Button 
                    clicked={this.switchAuthModeHandler}
                    btnType="Danger">SWITCH TO {this.state.isSignup ? 'SIGNIN' : 'SIGNUP'}</Button>
            </div>
        );
    }}
}

const mapStateToProps = (state) => ({
    logged_in: state["logged_in"]
})
export default connect(mapStateToProps)(Auth);