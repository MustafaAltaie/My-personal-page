import { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Educations from './components/Educations';

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
      <Educations darkMode={darkMode} />
    </>
  )
}

export default App;