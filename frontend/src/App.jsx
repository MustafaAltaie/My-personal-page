import { useEffect, useRef, useState } from 'react';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Educations from './components/Educations';
import Skills from './components/Skills';
import Experiences from './components/Experiences';
import Projects from './components/Projects';
import Footer from './components/Footer';

function App() {
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
    <main>
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
      <Home darkMode={darkMode} ref={homeRef} />
      <Educations ref={educationRef} />
      <Skills ref={skillRef} />
      <Experiences ref={experienceRef} />
      <Projects ref={projectRef} />
      <Footer ref={contactRef} />
    </main>
  )
}

export default App;