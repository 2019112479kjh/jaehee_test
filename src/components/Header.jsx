import React from 'react';
import styles from './Header.module.scss';
import HODU from '../assets/HODU.png';
import { ButtonDefault } from './Button';

export default function Header() {
    return (
        <header>
            <img src={HODU} alt='HODU'className={styles.hodu}/>
            <nav className={styles.menu}>
                <ul>
                    <li><a href="#home"><img /></a></li>
                    <li><a href="#home">Home</a></li>
                    <li><a href="#about">About</a></li>
                    <li><a href="#support">Support</a></li>
                </ul>
                <ButtonDefault text="Download"/>
            </nav>
        </header>
    );
}

