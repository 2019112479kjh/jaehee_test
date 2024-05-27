import React from 'react';
import styles from './Footer.module.scss';
import HODU from '../assets/HODU.png';
import footerIcon1 from '../assets/footerIcon1.png';
import footerIcon2 from '../assets/footerIcon2.png';
import footerIcon3 from '../assets/footerIcon3.png';
import footerIcon4 from '../assets/footerIcon4.png';

export default function Footer() {
    return (
        <footer>
            <img src={HODU} alt='HODU'className={styles.hodu}/>
            <nav className={styles.menu}>
                <ul>
                    <li><img src={footerIcon1} alt='footerIcon1'/></li>
                    <li><img src={footerIcon2} alt='footerIcon2'/></li>
                    <li><img src={footerIcon3} alt='footerIcon3'/></li>
                    <li><img src={footerIcon4} alt='footerIcon4'/></li>
                </ul>
            </nav>
        </footer>
    );
}

