import { useState, forwardRef } from 'react';
import '../styles/skills.css';
import { motion } from 'framer-motion';
import SkillsSettingsFrontend from './SkillsSettingsFrontend';
import SkillsSettingsBackend from './SkillsSettingsBackend';
import SkillsSettingsOther from './SkillsSettingsOther';
import SkillsSettingsSoft from './SkillsSettingsSoft';

const Skills = forwardRef((props, ref) => {
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
                    <SkillsSettingsOther />
                </div>
                {/* Soft skills */}
                <div className="skillsContainer">
                    <h3 className='skillMainTitle'>Mjuka kunskaper</h3>
                    <SkillsSettingsSoft />
                </div>
            </div>
        </section>
    )
});

export default Skills;