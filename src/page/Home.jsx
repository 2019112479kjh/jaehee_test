import React from 'react';
import styles from './Home.module.scss';
import Generator from '../components/Generator';

export default function Home() {
    return (
        <section className={styles.banner}>
            <h1>Lorem Ipsum is simply dummy text of the printing and</h1>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown</p>
            <div className={styles.model}>
                <Generator />
            </div>
        </section>
    );
}

