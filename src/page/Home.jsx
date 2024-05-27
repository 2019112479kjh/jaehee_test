import React from 'react';
import styles from './Home.module.scss';
import Generator from '../components/Generator';
import { ButtonDefault } from '../components/Button';
import cat from '../assets/cat.png';
import { useEffect, useRef, useState } from 'react';
import { catImg } from '../api/catImg';

export default function Home() {
    const elementRef = useRef([]);
    const [imageList, setImageList] = useState([]);
    const [pageInfo, setPageInfo] = useState(1);

    const handleScroll = ([entry]) => {
        if (entry.isIntersecting) entry.target.classList.add(`${styles.active}`);
        else entry.target.classList.remove(`${styles.active}`);
    };

    useEffect(() => {
        const observer = new IntersectionObserver(handleScroll, {
        threshold: 0.25,
        });

        elementRef.current.forEach((el) => {
        observer.observe(el);
        });

        return () => observer?.disconnect();
    }, []);

    useEffect(() => {

        if(pageInfo>0) {
            catImg({setImageList: setImageList, pageInfo: pageInfo, setPageInfo: setPageInfo})
        }
        
    }, [pageInfo]);

    return (
        <>
            <section className={styles.banner}>
                <h1 className={styles.title}>Lorem Ipsum is simply dummy text of the printing and</h1>
                <p className={styles.titleDescription}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown</p>
                <div className={styles.buttonBox}>
                    <ButtonDefault text="Download" />
                </div>
                <div className={styles.model}>
                    <Generator />
                </div>
            </section>

            <section className={styles.description} ref={(el) => (elementRef.current[0] = el)}>
                <h1 className={styles.title}>Lorem Ipsum is simply dummy text of the printing and</h1>
                <p className={styles.titleDescription}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown</p>
                <img src={cat} alt='cat'className={`${styles.cat} ${styles.leftUp}`} />
            </section>

            <article className={styles.ImgShowBox}>
                <h1 className={styles.title}>dummy text of the printing and dummy</h1>
                <p className={styles.titleDescription}>Lorem Ipsum is simply <span>dummy</span> text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown</p>
                <div className={styles.imgBox}>
                    {imageList.length!==0 &&imageList.map((image, index) => (
                        <img src={image.path} alt={image.name} key={index} />
                    ))}
                </div>
                <div className={styles.buttonBox}>
                    <h2>Continue exploring HODU</h2>
                    <ButtonDefault text="Show more" buttonHandler={() => setPageInfo(pageInfo+1)}/>
                </div>
            </article>
        </>
    );
}

