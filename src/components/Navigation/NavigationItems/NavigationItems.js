import React from 'react';

import styles from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
    <ul className={styles.NavigationItems}>
        <NavigationItem link="/" exact closed={props.closed}>Burger Builder</NavigationItem>
        { props.isAuthenticated ? <NavigationItem link="/orders" closed={props.closed}>Orders</NavigationItem> : null }
        { !props.isAuthenticated 
            ? <NavigationItem link="/auth" closed={props.closed}>Authernticate</NavigationItem> 
            : <NavigationItem link="/logout" closed={props.closed}>Logout</NavigationItem> }
    </ul>
);

export default navigationItems;