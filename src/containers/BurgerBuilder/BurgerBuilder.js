import React, { Component } from "react";

import Auxilary from '../../hoc/Auxilary';
import Burger from '../../components/Burger/Burger';

class BurgerBuilder extends Component {

    render() {
        return (
            <Auxilary>
                <Burger />
                <div>Build Controls</div>
            </Auxilary>
        );
    }
}

export default BurgerBuilder;