import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from 'react-redux';
import axios from '../../axios-orders';

import Auxilary from '../../hoc/Auxilary/Auxilary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';

const BurgerBuilder = props => {
    const [purchasing, setPurchasing] = useState(false);

    const dispatch = useDispatch();

    const ings = useSelector(state => state.burgerBuilder.ingredients);
    const price = useSelector(state => state.burgerBuilder.totalPrice);
    const error = useSelector(state => state.burgerBuilder.error);
    const isAuthenticated = useSelector(state => state.auth.token !== null);

    const onIngredientAdded = (ingredient) => dispatch(actions.addIngredient(ingredient));
    const onRemoveIngredient = (ingredient) => dispatch(actions.removeIngredient(ingredient));
    const onInitIngredients = useCallback(() => dispatch(actions.initIngredients()), [dispatch]);
    const onInitPurchase = () => dispatch(actions.purchaseInit());
    const onSetRedirectPath = (path) => dispatch(actions.setAuthRedirectPath(path));

    useEffect(() => {
        onInitIngredients();
    }, [onInitIngredients]);

    const updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);

        return sum > 0;
    }

    const purchaseHandler = () => {
        if (isAuthenticated) {
            setPurchasing(true);
        } else {
            onSetRedirectPath('/checkout');
            props.history.push('/auth');
        }        
    }

    const purchaseCanceledHandler = () => {
        setPurchasing(false);
    }

    const purchaseContinueHandler = () => {
        onInitPurchase();
        props.history.push('/checkout');
    }

    const disabledInfo = {
        ...ings
    };
    for (let key in disabledInfo) {
        disabledInfo[key] = 0 >= disabledInfo[key];
    }

    let orderSummary = null;     
    let burger = error ? <p>Can't load ingredients</p> : <Spinner />;
    
    if (ings) {
        burger = (
            <Auxilary>
                <Burger ingredients={ings} />
                <BuildControls
                    isAuthenticated={isAuthenticated}
                    ingredientAdded={onIngredientAdded}
                    ingredientRemoved={onRemoveIngredient}
                    disabled={disabledInfo}
                    purchasable={updatePurchaseState(ings)}
                    ordered={purchaseHandler}
                    price={price} />
            </Auxilary>
        );

        orderSummary = <OrderSummary 
            ingredients={ings}
            price={price}
            purchaseCanceled={purchaseCanceledHandler}
            purchaseContinue={purchaseContinueHandler} />;   
    }

    return (
        <Auxilary>
            <Modal show={purchasing} modalClosed={purchaseCanceledHandler}>
                {orderSummary}
            </Modal>
            { burger }
        </Auxilary>
    );
}

export default (withErrorHandler(BurgerBuilder, axios));