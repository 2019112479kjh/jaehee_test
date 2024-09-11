import React from 'react';
import styles from './Button.module.scss';
import PropTypes from 'prop-types';
import { MdKeyboardArrowUp } from "react-icons/md";

const ButtonDefault = ({ text, name, buttonHandler }) => {
    return (
      <button name={name} onClick={buttonHandler} className={styles.default}>
        {text}
      </button>
    );
};

ButtonDefault.propTypes = {
    text: PropTypes.string,
    name: PropTypes.string,
    buttonHandler: PropTypes.func,
};

const ButtonTop = () => {
    return (
      <div className={styles.buttonTop}>
        <button
          name="topBtn"
          className={styles.top}
          onClick={() =>
            window.scrollTo({
              behavior: 'smooth',
              top: 0,
            })
          }
        >
          <MdKeyboardArrowUp />
        </button>
      </div>
    );
};

export {
    ButtonDefault,
    ButtonTop,
  };
  

