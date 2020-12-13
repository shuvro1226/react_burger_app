import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false
};

const INGERDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

const addIngredient = (state, action) => {
    const addedIngredient = {
        [action.ingredientName]: state.ingredients[action.ingredientName] + 1
    };
    const addedIngredients = updateObject(state.ingredients, addedIngredient);
    const updatedStateAfterAdd = {
        ingredients: addedIngredients,
        totalPrice: state.totalPrice + INGERDIENT_PRICES[action.ingredientName]
    }
    return updateObject(state, updatedStateAfterAdd);
}

const removeIngredient = (state, action) => {
    const removedIngredient = {
        [action.ingredientName]: state.ingredients[action.ingredientName] - 1
    };
    const removedIngredients = updateObject(state.ingredients, removedIngredient);
    const updatedStateAfterRemove = {
        ingredients: removedIngredients,
        totalPrice: state.totalPrice - INGERDIENT_PRICES[action.ingredientName]
    }
    return updateObject(state, updatedStateAfterRemove);
}

const setIngredients = (state, action) => {
    return updateObject(state, {
        ingredients: {
            salad: action.ingredients.salad,
            bacon: action.ingredients.bacon,
            cheese: action.ingredients.cheese,
            meat: action.ingredients.meat
        },
        totalPrice: 4,
        error: false
    });
}

const fetchIngredientsFailed = (state, action) => {
    return updateObject(state, {                
        error: true
    });
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT: return addIngredient(state, action);            
        case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action);            
        case actionTypes.SET_INGREDIENTS: return setIngredients(state, action);            
        case actionTypes.FETCH_INGREDIENTS_FAILED: return fetchIngredientsFailed(state, action);            
        default: return state;
    }
};

export default reducer;