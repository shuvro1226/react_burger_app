import React, { Component } from "react";

import Auxilary from '../../hoc/Auxilary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 1,
            bacon: 1,
            cheese: 2,
            meat: 2
        }
    }

    render() {
        return (
            <Auxilary>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls />
            </Auxilary>
        );
    }
}

export default BurgerBuilder;