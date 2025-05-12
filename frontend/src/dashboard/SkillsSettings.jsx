import { useState, forwardRef, useEffect, useRef } from 'react';
import '../styles/skills.css';
import { motion } from 'framer-motion';
import {
    useCreateFrontendSkillMutation,
    useReadFrontendSkillsQuery,
    useUpdateFrontendSkillsMutation,
    useDeleteFrontendSkillsMutation
} from '../features/portfolioApi';
import SkillsSettingsFrontend from './SkillsSettingsFrontend';

const Skills = forwardRef((props, ref) => {
    const [frontendList, setFrontendList] = useState([]);
    const [backendList, setBackendList] = useState([
        { title: 'Node.js', description: '(JavaScript-miljö för serversidan, utveckling av REST API)' },
        { title: 'Express.js', description: '(Webbramverk för att bygga RESTfulla API:er)' },
        { title: 'MongoDB', description: '(NoSQL-databas, hantering av datamodeller med Mongoose)' },
        { title: 'GraphQL', description: '(Frågespråk för API:er som möjliggör optimerad datahämtning)' },
        { title: 'PostgreSQL', description: '(Relationsdatabas, användning av pgAdmin)' },
    ]);
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
    const [createFrontendSkill] = useCreateFrontendSkillMutation();
    const { data: frontendSkills, isFrontendLoading } = useReadFrontendSkillsQuery();
    const [updateFrontendSkills] = useUpdateFrontendSkillsMutation();
    const [deleteFrontendSkills] = useDeleteFrontendSkillsMutation();

    useEffect(() => {
        if(Array.isArray(frontendSkills) && !isFrontendLoading) {
            const transformed = frontendSkills.map(skill => ({
                id: skill._id,
                title: skill.title,
                description: skill.description
            }));
            setFrontendList(transformed);
        }
    }, [frontendSkills, isFrontendLoading]);

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

    // Frontend
    const [frontendForm, setFrontendForm] = useState(false);
    const [frontendObj, setFrontendObj] = useState({
        id: '',
        title: '',
        description: ''
    });
    const frontendFormRef = useRef(null);

    const prepareFrontendObj = (e) => {
        setFrontendObj(prev => ({
            ...prev, [e.target.name]: e.target.value
        }));
    }

    const handleSaveFrontendSkill = async (e) => {
        e.preventDefault();
        const { id, title, description } = frontendObj;
        const isValid = title && description;
        if(!isValid) return;
        try {
            id ?
            await updateFrontendSkills(frontendObj).unwrap() :
            await createFrontendSkill(frontendObj).unwrap()
            clearFrontFields();
        } catch {
            alert('Error saving skill');
            console.error('error saving skills:', err);
        }
    }

    const prepareFrontendUpdate = (skill) => {
        setFrontendObj({
            id: skill.id,
            title: skill.title,
            description: skill.description
        });
        setFrontendForm(true);
        setTimeout(() => {
            frontendFormRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 10);
    }

    const handleDeleteFrontSkill = async (id) => {
        if(!id) return;
        const confirmDeleting = confirm('Confirm deleting skill?');
        if(!confirmDeleting) return;
        try {
            await deleteFrontendSkills(id).unwrap();
        } catch (err) {
            console.error('Error deleting skill:', err);
            alert('Error deleting skill');
        }
    }

    const clearFrontFields = () => {
        setFrontendObj({
            id: '',
            title: '',
            description: ''
        });
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
                    {isFrontendLoading && <p>Loading...</p>}
                    {frontendList.map((frontendSkill, index) => 
                    <SkillsSettingsFrontend
                        key={index}
                        frontendSkill={frontendSkill}
                        index={index}
                        handleDragStart={handleDragStart}
                        handleDragOver={handleDragOver}
                        handleDrop={handleDrop}
                        frontendList={frontendList}
                        setFrontendList={setFrontendList}
                        prepareFrontendUpdate={prepareFrontendUpdate}
                        handleDeleteFrontSkill={handleDeleteFrontSkill}
                    />
                    )}
                    <h1 className={`showFormButton ${frontendForm ? 'showFormButtonOn' : ''}`} onClick={() => {setFrontendForm(!frontendForm); clearFrontFields()}}>+</h1>
                    {frontendForm &&
                    <form ref={frontendFormRef} onSubmit={handleSaveFrontendSkill}>
                        <input type="text" placeholder='Title' title='Title' name='title' value={frontendObj.title || ''} onChange={prepareFrontendObj} />
                        <textarea name="description" placeholder='Description' title='Description' value={frontendObj.description || ''} onChange={prepareFrontendObj}></textarea>
                        <button type='submit'>{frontendObj.id ? 'Update' : 'Save'}</button>
                    </form>}
                </div>
                {/* Backend */}
                <div className="skillsContainer">
                    <h3 className='skillMainTitle'>Backend-utveckling</h3>
                    {backendList.map((backendSkill, index) => 
                    <motion.div
                        key={index}
                        className="skill dottedElement"
                        initial={{ opacity: 0, x: 100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true, amount: 0.3 }}
                        draggable
                        onDragStart={() => handleDragStart(index)}
                        onDragOver={e => handleDragOver(e, index, backendList, setBackendList)}
                        onDrop={handleDrop}
                    >
                        <p><span>{backendSkill.title}: </span>{backendSkill.description}</p>
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