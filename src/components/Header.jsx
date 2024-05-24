import React from 'react';
import styles from './Header.module.scss';
import HODU from '../assets/HODU.png';

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
                <button className={styles.downloadButton}>Download</button>
            </nav>
        </header>
    );
}

