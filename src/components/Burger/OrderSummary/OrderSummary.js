import React from 'react';

import Auxilary from '../../../hoc/Auxilary'
// import styles from './Modal.module.css';

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
            <p>Continue to checkout?</p>
        </Auxilary>
    );
};

export default orderSummary;