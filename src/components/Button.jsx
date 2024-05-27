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

/**
 * 페이지 최상단으로 올리는 TOP 버튼입니다. 클래스명을 사용해 위치를 직접 잡아야 합니다.
 * @className .buttonTop
 */
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
  

