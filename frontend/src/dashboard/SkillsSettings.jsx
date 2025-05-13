import { forwardRef } from 'react';
import '../styles/skills.css';
import SkillsSettingsFrontend from './SkillsSettingsFrontend';
import SkillsSettingsBackend from './SkillsSettingsBackend';
import SkillsSettingsOther from './SkillsSettingsOther';
import SkillsSettingsSoft from './SkillsSettingsSoft';

const Skills = forwardRef((props, ref) => {
    return (
        <section ref={ref} className='skillSection'>
            <h1 className='sectionTitle'><i className="fa-solid fa-user-gear"></i>Kunskaper</h1>
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