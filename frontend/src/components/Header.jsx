import { useState, useRef, useEffect } from 'react';
import '../styles/header.css';
import { motion } from 'framer-motion';

const Header = (props) => {
    const [nav, setNav] = useState(false);
    const navRef = useRef(null);
    const lastScrollYRef = useRef(window.scrollY);
    const [showHeader, setShowHeader] = useState(true);

    useEffect(() => {
        if(nav) {
            if(navRef.current){
                navRef.current.style.height = navRef.current.scrollHeight + 'px';
            }
        } else if(navRef.current) {
            navRef.current.style.height = '0px';
        }
        if(window.innerWidth >= 1024) {
            setNav(true);
        }
    }, [nav]);

    useEffect(() => {
        const handleScroll = () => {
            setShowHeader(window.scrollY < lastScrollYRef.current);
            lastScrollYRef.current = window.scrollY;
        }

        const handleResize = () => {
            if(window.innerWidth >= 1024) {
                setNav(true);
            } else {
                setNav(false);
            }
        }
        handleResize();

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('scroll', handleScroll);
        }
    }, []);

    return (
        <header className={!showHeader ? 'hideHeader' : ''}>
            <div className="headerPart1">
                <h2><span>Mustafa</span> Altaie</h2>
                <div className='toggleModeWrapper flexMiddle'>
                    <p>Light</p>
                    <div className='toggleModeButton' onClick={props.toggleMode}>
                        <div className={props.darkMode ? 'darkToggleThumb' : 'lightToggleThumb'}></div>
                    </div>
                    <p>Dark</p>
                </div>
                <div className="navToggle" onClick={() => setNav(!nav)}>
                    <div style={{ transform: `translate(${nav ? '0%, 800%' : '0%, 0%'}) rotate(${nav ? '45deg' : '0deg'})` }}></div>
                    <div style={{ opacity: nav ? 0 : 1 }}></div>
                    <div style={{ transform: `translate(${nav ? '0%, -800%' : '0%, 0%'}) rotate(${nav ? '-45deg' : '0deg'})` }}></div>
                </div>
            </div>
            <nav ref={navRef}>
                <motion.ul
                    initial={{ opacity: 0, x: 100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                    viewport={{ once: true, amount: 0 }}
                >
                    <li onClick={() => {props.scrollToHome(); setNav(false)}}>Home</li>
                    <li onClick={() => {props.scrollToEducations(); setNav(false) }}>Educations</li>
                    <li onClick={() => {props.scrollToSkills(); setNav(false) }}>Skills</li>
                    <li onClick={() => {props.scrollToExperiences(); setNav(false) }}>Experience</li>
                    <li onClick={() => {props.scrollToProjects(); setNav(false) }}>Projects</li>
                    <li onClick={() => {props.scrollToContact(); setNav(false) }}>Contact</li>
                </motion.ul>
            </nav>
        </header>
    )
}

export default Header;