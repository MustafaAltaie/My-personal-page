import { useState, useRef, useEffect } from 'react';
import '../styles/header.css';

const Header = ({ toggleMode, darkMode }) => {
    const [nav, setNav] = useState(false);
    const navRef = useRef(null);
    const [navOption, setNavOption] = useState('Home');

    useEffect(() => {
        if(nav) {
            if(navRef.current){
                navRef.current.style.height = navRef.current.scrollHeight + 'px';
            }
        } else if(navRef.current) {
            navRef.current.style.height = '0px';
        }
    }, [nav]);

    useEffect(() => {
        const handleResize = () => {
            if(window.innerWidth >= 1024) {
                setNav(false);
            }
        }

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <header>
            <div className="headerPart1">
                <p>LOGO NAME</p>
                <div className='toggleModeWrapper flexMiddle'>
                    <p>Light</p>
                    <div className='toggleModeButton' onClick={toggleMode}>
                        <div className={darkMode ? 'darkToggleThumb' : 'lightToggleThumb'}></div>
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
                <ul>
                    <li onClick={() => setNavOption('Home')} className={navOption === 'Home' ? 'actionNavOption' : ''}>Home</li>
                    <li onClick={() => setNavOption('Educations')} className={navOption === 'Educations' ? 'actionNavOption' : ''}>Educations</li>
                    <li onClick={() => setNavOption('Skills')} className={navOption === 'Skills' ? 'actionNavOption' : ''}>Skills</li>
                    <li onClick={() => setNavOption('Experience')} className={navOption === 'Experience' ? 'actionNavOption' : ''}>Experience</li>
                    <li onClick={() => setNavOption('Projects')} className={navOption === 'Projects' ? 'actionNavOption' : ''}>Projects</li>
                    <li onClick={() => setNavOption('Contact')} className={navOption === 'Contact' ? 'actionNavOption' : ''}>Contact</li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;