import { useState, forwardRef } from 'react';
import '../styles/skills.css';
import { motion } from 'framer-motion';
import SkillsSettingsFrontend from './SkillsSettingsFrontend';
import SkillsSettingsBackend from './SkillsSettingsBackend';

const Skills = forwardRef((props, ref) => {
    const [otherList, setOtherList] = useState([
        { title: 'Redux Toolkit', description: '(Modern Redux med mindre boilerplate, RTK Query för datahämtning)' },
        { title: 'Git', description: '(Versionshantering, branching, merging, rebase)' },
        { title: 'Postman', description: '(Testning och dokumentation av API:er)' },
        { title: 'Agilt arbetssätt', description: '(Scrum, sprintplanering, Jira)' },
        { title: 'CI/CD', description: '(Kontinuerlig integration och leverans med GitHub Actions, Jenkins)' },
        { title: 'REST API-design', description: '(CRUD-operationer, autentisering och auktorisering)' },
        { title: 'Versionshantering med Git', description: '(Samarbete och hantering av feature branches)' },
    ]);
    const [softList, setSoftList] = useState([
        { title: 'Svenska & Engelska', description: 'Mycket goda kommunikativa färdigheter i både tal och skrift' },
        { title: 'Samarbete & problemlösning', description: 'Trivs att arbeta både självständigt och i team, med stark problemlösningsförmåga' },
        { title: 'Anpassningsförmåga', description: 'Snabblärd och lätt att ta till sig nya teknologier' },
    ]);
    const [draggedIndex, setDraggedIndex] = useState(null);



    const handleDragStart = (index) => {
        setDraggedIndex(index);
    }

    const handleDragOver = (event, index, list, set) => {
        event.preventDefault();
        if (draggedIndex === null || draggedIndex === index) return;
        const newList = [...list];
        const draggedItem = newList[draggedIndex];
        newList.splice(draggedIndex, 1);
        newList.splice(index, 0, draggedItem);
        setDraggedIndex(index);
        set(newList);
    }

    const handleDrop = () => {
        setDraggedIndex(null);
    }

    return (
        <section ref={ref} className='skillSection'>
            <motion.h1
                className='sectionTitle'
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true, amount: 0.4 }}
            ><i className="fa-solid fa-user-gear"></i>Kunskaper</motion.h1>
            <div className='skillsMainWrapper'>
                {/* Frontend */}
                <div className="skillsContainer">
                    <h3 className='skillMainTitle'>Frontend-utveckling</h3>
                    <SkillsSettingsFrontend />
                </div>
                {/* Backend */}
                <div className="skillsContainer">
                    <h3 className='skillMainTitle'>Backend-utveckling</h3>
                    <SkillsSettingsBackend />
                </div>
                {/* Other skills */}
                <div className="skillsContainer">
                    <h3 className='skillMainTitle'>Andra kunskaper</h3>
                    {otherList.map((otherSkill, index) => 
                    <motion.div
                        key={index}
                        className="skill dottedElement"
                        initial={{ opacity: 0, scale: 1.4 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true, amount: 0.3 }}
                        draggable
                        onDragStart={() => handleDragStart(index)}
                        onDragOver={e => handleDragOver(e, index, otherList, setOtherList)}
                        onDrop={handleDrop}
                    >
                        <p><span>{otherSkill.title}: </span>{otherSkill.description}</p>
                    </motion.div>
                    )}
                </div>
                {/* Soft skills */}
                <div className="skillsContainer">
                    <h3 className='skillMainTitle'>Mjuka kunskaper</h3>
                    {softList.map((softSkill, index) => 
                    <motion.div
                        key={index}
                        className="skill dottedElement"
                        initial={{ opacity: 0, scale: 0.6 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true, amount: 0.3 }}
                        draggable
                        onDragStart={() => handleDragStart(index)}
                        onDragOver={e => handleDragOver(e, index, softList, setSoftList)}
                        onDrop={handleDrop}
                    >
                        <p><span>{softSkill.title}: </span>{softSkill.description}</p>
                    </motion.div>
                    )}
                </div>
            </div>
        </section>
    )
});

export default Skills;