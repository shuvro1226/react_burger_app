import React from 'react';

import styles from './Input.module.css';

const input = (props) => {
    let inputElement = null;
    const inputClasses = [styles.InputElement];
    let validationError = null; 

    if (props.invalid && props.shouldValidate && props.isTouched) {
        inputClasses.push(styles.Invalid);
        validationError = <p>Please insert a valid {props.element}</p>;
    }               

    switch(props.elementType) {
        case ( 'input' ):
            inputElement = <input className={inputClasses.join(' ')} {...props.elementConfig} value={props.value} onChange={props.changed}/>
            break;
        case ( 'textarea' ):
            inputElement = <textarea className={inputClasses.join(' ')} {...props.elementConfig} value={props.value} onChange={props.changed}></textarea>
            break;
        case ( 'select' ):
            inputElement = <select className={inputClasses.join(' ')} value={props.value} onChange={props.changed}>
                {props.elementConfig.options.map(option => (
                    <option key={option.value} value={option.value}>{option.displayValue}</option>
                ))}
            </select>
            break;
        default:
            inputElement = <input className={inputClasses.join(' ')} {...props.elementConfig} value={props.value} onChange={props.changed}/>
    }

    return (
        <div className={styles.Input}>
            <label className={styles.Label}>{props.label}</label>
            {inputElement}
            {validationError}
        </div>
    );
}

export default input;