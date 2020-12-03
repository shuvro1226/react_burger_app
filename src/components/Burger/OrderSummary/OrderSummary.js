import React from 'react';

import Auxilary from '../../../hoc/Auxilary'
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    const ingrdientSummary = Object.keys(props.ingredients)
        .map(igKey => {
            return <li key={igKey}>
                <span style={{ textTransform: 'capitalize' }}>
                    {igKey}: {props.ingredients[igKey]}
                </span>
            </li>
        });

    return (
        <Auxilary>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingrdients:</p>
            <ul>
                {ingrdientSummary}
            </ul>
            <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
            <p>Continue to checkout?</p>
            <Button clicked={props.purchaseCanceled} btnType="Danger">CANCEL</Button>
            <Button clicked={props.purchaseContinue} btnType="Success">CONTINUE</Button>
        </Auxilary>
    );
};

export default orderSummary;