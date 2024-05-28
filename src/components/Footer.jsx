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
                    <li><a href="#"><img src={footerIcon1} alt='footerIcon1'/></a></li>
                    <li><a href="#"><img src={footerIcon2} alt='footerIcon2'/></a></li>
                    <li><a href="#"><img src={footerIcon3} alt='footerIcon3'/></a></li>
                    <li><a href="#"><img src={footerIcon4} alt='footerIcon4'/></a></li>
                </ul>
            </nav>
        </footer>
    );
}

