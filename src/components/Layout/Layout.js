import React from 'react';

import Auxilary from '../../hoc/Auxilary';
import styles from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';

const Layout = (props) => (
    <Auxilary>
        <Toolbar />
        <main className={styles.Content}>
            {props.children}
        </main>
    </Auxilary>
);

export default Layout;