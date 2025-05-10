import { useEffect, useState } from 'react';
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

  return (
    <>
      <Header toggleMode={toggleMode} darkMode={darkMode} />
      <Home darkMode={darkMode} />
      <Educations />
      <Skills />
      <Experiences />
      <Projects />
      <Footer />
    </>
  )
}

export default App;