import { useState, forwardRef } from 'react';
import '../styles/skills.css';
import { motion } from 'framer-motion';
import { useReadFrontendSkillsQuery, useReadBackendSkillsQuery } from '../features/portfolioApi';

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
    const { data: frontendSkills, isFrontendLoading } = useReadFrontendSkillsQuery();
    const { data: backendSkills, isBackendLoading } = useReadBackendSkillsQuery();

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
                    {isFrontendLoading && <p>Loading...</p>}
                    {frontendSkills?.map((frontendSkill, index) =>
                    <motion.div
                        key={index}
                        className="skill dottedElement"
                        initial={{ opacity: 0, x: -100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true, amount: 0.3 }}
                    >
                        <p><span style={{ color: '#a70' }}>{frontendSkill.title}: </span>{frontendSkill.description}</p>
                    </motion.div>
                    )}
                </div>
                {/* Backend */}
                <div className="skillsContainer">
                    <h3 className='skillMainTitle'>Backend-utveckling</h3>
                    {backendSkills?.map((backendSkill, index) =>
                    <motion.div
                        key={index}
                        className="skill dottedElement"
                        initial={{ opacity: 0, x: 100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true, amount: 0.3 }}
                    >
                        <p><span style={{ color: '#a70' }}>{backendSkill.title}: </span>{backendSkill.description}</p>
                    </motion.div>
                    )}
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
                    >
                        <p><span style={{ color: '#a70' }}>{otherSkill.title}: </span>{otherSkill.description}</p>
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
                    >
                        <p><span style={{ color: '#a70' }}>{softSkill.title}: </span>{softSkill.description}</p>
                    </motion.div>
                    )}
                </div>
            </div>
        </section>
    )
});

export default Skills;