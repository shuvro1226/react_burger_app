import React, { useState } from 'react';
import { connect } from 'react-redux';

import Auxilary from '../Auxilary/Auxilary';
import styles from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

const Layout = (props) => {
    const [sideDrawerVisible, setSideDrawerIsVisible] = useState(false);

    const sideDrawerClosed = () => {
        setSideDrawerIsVisible(false)
    }

    const sideDrawerToggleHandler = () => {
        setSideDrawerIsVisible(!sideDrawerVisible)
    }

    return (
        <Auxilary>
            <Toolbar isAuthenticated={props.isAuthenticated} drawerToggleClicked={sideDrawerToggleHandler} />
            <SideDrawer 
                isAuthenticated={props.isAuthenticated}
                open={sideDrawerVisible} 
                closed={sideDrawerClosed} />
            <main className={styles.Content}>
                {props.children}
            </main>
        </Auxilary>
    )
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout);