import React from 'react';

import styles from './Modal.module.css';
import Auxilary from '../../../hoc/Auxilary';
import Backdrop from '../Backdrop/Backdrop';

const modal = (props) => (
    <Auxilary>
        <Backdrop show={props.show} clicked={props.modalClosed} />
        <div className={styles.Modal}
            style={{ 
                transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                opacity: props.show? '1' : '0'
            }}>
            {props.children}
        </div>
    </Auxilary>
);

export default modal;