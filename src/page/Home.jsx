import React from 'react';
import styles from './Home.module.scss';
import Generator from '../components/Generator';
import { ButtonDefault, ButtonTop } from '../components/Button';
import cat from '../assets/cat.png';
import cat2 from '../assets/cat2.png';
import footerCat from '../assets/footerCat.png';
import { useEffect, useRef, useState } from 'react';
import { catImg } from '../api/catImg';
import { SlEnvolopeLetter } from "react-icons/sl";

const { kakao } = window;

export default function Home() {
    const elementRef = useRef([]);
    const [imageList, setImageList] = useState([]);
    const [pageInfo, setPageInfo] = useState(1);
    const [modal, setModal] = useState(false);
    const inputRef = useRef();

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
        const mapContainer = document.getElementById('map'); 
        if (mapContainer) {
            const mapOption = {
                center: new kakao.maps.LatLng(33.421332, 126.6719281), 
                level: 3 
            };

            new kakao.maps.Map(mapContainer, mapOption);
        } else {
            console.error('Map container element not found');
        }
    }, []);

    useEffect(() => {
        if(modal) document.body.style.overflow = 'hidden';
        else if(!modal) document.body.style.overflow = 'visible';
        console.log(modal)
    }, [modal]);

    useEffect(() => {

        if(pageInfo>0) {
            catImg({setImageList: setImageList, pageInfo: pageInfo, setPageInfo: setPageInfo})
        }
        
    }, [pageInfo]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!inputRef.current.value.trim()) {
            alert("Please enter your email address.");
            return;
        }
        setModal(true);
    };

    return (
        <>
            {modal &&  <><div className={styles.backdrop} onClick={() => setModal(false)}></div><Modal setModal={setModal} /></>}
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

            <article className={styles.kakao}>
                <h1 className={styles.title}>Where you’ll be</h1>
                <p className={styles.titleDescription}>330, Cheomdan-ro, Jeju-si, Jeju-do, Republic of Korea</p>
                <div className={styles.map} id="map"></div>
            </article>

            <section className={styles.footer}>
                <h1 className={styles.title}>이메일 입력</h1>
                <img className={styles.banner} src={footerCat} alt='footer cat'/>
                <div className={styles.emailForm}>
                    <div className={styles.emailBox}>
                        <h2>Subscribe to our Blog post</h2>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text </p>
                    </div>
                    <form className={styles.inputWrapper} onSubmit={(e) => handleSubmit(e)}>
                        <div>
                            <SlEnvolopeLetter />
                            <label>Enter your e-mail address</label>
                            <input type="text" placeholder="Enter your e-mail address" className={styles.input} ref={inputRef}/>
                        </div>
                        <ButtonDefault text="Subscribe" type="submit" buttonHandler={(e) => handleSubmit(e)}/>
                    </form>
                </div>
            </section>

            <ButtonTop />
        </>
    );
}

export function Modal({setModal}) {
    
    return (
        <section className={styles.modalContainer}>
            <img src={cat2} alt='modal' className={styles.carIcon}/>
            <h1 className={styles.modalTitle}>Thank you!</h1>
            <p className={styles.modalDescription}>Lorem Ipsum is simply dummy text of the printing industry.</p>
            <ButtonDefault text="OK! I Love HODU" buttonHandler={(e) => { e.preventDefault(); setModal(false); }}/>
        </section>
    ); 
}
