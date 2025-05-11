import Header from '../components/Header';
import HomeSettings from './HomeSettings';
import EducationsSettings from './EducationsSettings';
import SkillsSettings from './SkillsSettings';
import ExperiencesSettings from './ExperiencesSettings';
import ProjectsSettings from './ProjectsSettings';
import FooterSettings from './FooterSettings';
import { useEffect, useRef, useState } from 'react';

const Dashboard = () => {
    const [darkMode, setDarkMode] = useState(true);
    const homeRef = useRef(null);
    const educationRef = useRef(null);
    const skillRef = useRef(null);
    const experienceRef = useRef(null);
    const projectRef = useRef(null);
    const contactRef = useRef(null);

    useEffect(() => {
        toggleMode();
    }, []);

    const toggleMode = () => {
        setDarkMode(!darkMode);
        const bodyClassList = document.body.classList;
        if(darkMode) {
        bodyClassList.add('darkMode');
        bodyClassList.remove('lightMode');
        } else {
        bodyClassList.remove('darkMode');
        bodyClassList.add('lightMode');
        }
    }

    const scrollToHome = () => homeRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    const scrollToEducations = () => educationRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    const scrollToSkills = () => skillRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    const scrollToExperiences = () => experienceRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    const scrollToProjects = () => projectRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    const scrollToContact = () => contactRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });


    return (
        <>
            <Header
                toggleMode={toggleMode}
                darkMode={darkMode}
                scrollToHome={scrollToHome}
                scrollToEducations={scrollToEducations}
                scrollToSkills={scrollToSkills}
                scrollToExperiences={scrollToExperiences}
                scrollToProjects={scrollToProjects}
                scrollToContact={scrollToContact}
            />
            <HomeSettings darkMode={darkMode} ref={homeRef} />
            <EducationsSettings ref={educationRef} />
            <SkillsSettings ref={skillRef} />
            <ExperiencesSettings ref={experienceRef} />
            <ProjectsSettings ref={projectRef} />
            <FooterSettings ref={contactRef} />
        </>
    )
}

export default Dashboard;