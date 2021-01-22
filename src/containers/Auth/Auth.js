import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as authActions from '../../store/actions/index';
import { connect } from 'react-redux';
import { updateObject, checkValidity } from '../../shared/utility';

const Auth = props => {
    const [controls, setConstrols] = useState({
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Your E-Mail Address'
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
                placeholder: 'Your Password'
            },
            value: '',
            validation: {
                required: true,
                minLength: 6
            },
            valid: false,
            touched: false
        }
    });

    const [isSignUp, setIsSignUp] = useState(true);

    const { onSetAuthRedirectPath, building, authRedirectPath } = props;

    useEffect(() => {
        if (!building && authRedirectPath !== '/') {
            onSetAuthRedirectPath();
        }
    }, [onSetAuthRedirectPath, building, authRedirectPath]);

    const inputChangedHandler = (event, controlName) => {
        const updatedControlElement = updateObject(controls[controlName], {
            value: event.target.value,
            valid: checkValidity(event.target.value, controls[controlName].validation),
            touched: true
        });
        const updatedControls = updateObject(controls, {
            [controlName]: updatedControlElement
        });

        setConstrols(updatedControls);
    }

    const submitHandler = (event) => {
        event.preventDefault();
        props.onAuth(controls.email.value, controls.password.value, isSignUp);
    }

    const switchAuthModeHandler = () => {
        setIsSignUp(!isSignUp);
    }

    const formElementsArray = [];
        
    for (let key in controls) {
        formElementsArray.push({
            id: key,
            config: controls[key]
        });
    }

    let form = formElementsArray.map(formElement => (
        <Input
            key={formElement.id}
            elementType={formElement.config.elementType} 
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            isTouched={formElement.config.touched}
            element={formElement.id}
            changed={(event) => inputChangedHandler(event, formElement.id)} />            
    ));       

    if (props.loading) {
        form = <Spinner />
    }

    let errorMessage = null;
    if (props.error) {
        errorMessage = (
            <p>{props.error.message}</p>
        )
    }

    let authRedirect = null;
    if (props.isAuthenticated) {
        authRedirect = <Redirect to={props.authRedirectPath} />
    }

    return (
        <div>
            {authRedirect}
            {errorMessage}
            <form onSubmit={submitHandler}>
                {form}
                <Button btnType="Success">Submit</Button>
            </form>
            <Button btnType="Danger" clicked={switchAuthModeHandler}>SwITCH TO {isSignUp ? 'SIGN IN' : 'SIGN UP'}</Button>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        building: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(authActions.auth(email, password, isSignup)),
        onSetAuthRedirectPath: () => dispatch(authActions.setAuthRedirectPath('/'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);