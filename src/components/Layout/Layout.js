import React from 'react';

import Auxilary from '../../hoc/Auxilary';
import styles from './Layout.module.css';

const Layout = (props) => (
    <Auxilary>
        <div>
            Toolbar, sideDrawer, Backdrop
        </div>
        <main className={styles.Content}>
            {props.children}
        </main>
    </Auxilary>
);

export default Layout;