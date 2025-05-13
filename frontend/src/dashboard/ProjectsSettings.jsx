import { useState, forwardRef, useRef, useEffect } from 'react';
import '../styles/project.css';
import { useCreateProjectMutation } from '../features/portfolioApi';

const Projects = forwardRef((props, ref) => {
    const [list, setList] = useState([
        {
            title: 'Trafikskola app, Fullstack',
            createdDate: '9 maj 2025',
            content: 'Jag utvecklade applikationen med (MERN-stack). Applikationen innehåller ett administrativt dashboard där ägaren kan skapa, uppdatera och ta bort innehåll.',
            techStack: ['MongoDB - database', 'Express - backend framework', 'React.js - frontend framework', 'Node.js - servermiljö för JavaScript', 'Redux och RTK Query - datahämtning', 'Vonage + tar emot sms från appen', 'CSS3 & HTML5'],
            appLink: '',
            isProfessional: true
        },
        {
            title: 'E-handelsapplikation, Fullstack',
            createdDate: '9 maj 2025',
            content: 'Jag utvecklade appen som ett hobbyprojekt. Applikationen är byggd för att beställa elektronikprodukter online och innehåller ett administrativt dashboard där man kan skapa, uppdatera och radera produkter.',
            techStack: ['MongoDB - database', 'Express - backend framework', 'React.js - frontend framework', 'Node.js - servermiljö för JavaScript', 'Redux och RTK Query - datahämtning', 'Resend - tar emot meddelanden från kontaktformulär', 'CSS3 & HTML5'],
            appLink: '',
            isProfessional: false
        },
        {
            title: 'Scrum-tavla, Frontend',
            createdDate: '9 maj 2025',
            content: 'Jag utvecklade denna frontend-applikation under min utbildning. Applikationen fungerar enligt Scrum-principen, där användaren kan lägga till uppgifter och flytta dem mellan olika kolumner. All data sparas i webbläsarens localStorage.',
            techStack: ['React.js - frontend framework', 'Redux  - state management', 'CSS3 & HTML5', 'localStorage - spara data'],
            appLink: '',
            isProfessional: false
        },
        {
            title: 'Social media app, Frontend',
            createdDate: '9 maj 2025',
            content: 'Jag utvecklade denna frontend-applikation med ren JavaScript. Applikationen fungerar som en sociala medier-liknande tjänst där användare kan hitta personer från hela världen baserat på sina sökfilter – likt en dejtingapp. Sökfunktionen är redan förberedd för att kunna kopplas till ett backend, om jag i framtiden väljer att bygga ut den till en fullstack-applikation.',
            techStack: ['Vanilla JavaScript', 'CSS3 & HTML5'],
            appLink: '',
            isProfessional: false
        },
        {
            title: 'Quire app, Frontend',
            createdDate: '9 maj 2025',
            content: 'Jag utvecklade denna Quire-liknande frontend-applikation med ren JavaScript under min utbildning. Användaren kan lägga till anteckningar, redigera dem och all data sparas lokalt i webbläsarens localStorage.',
            techStack: ['Vanilla JavaScript', 'CSS3 & HTML5', 'localStorage - spara data'],
            appLink: '',
            isProfessional: false
        },
        {
            title: 'Gruvan, Fullstack',
            createdDate: '9 maj 2025',
            content: 'Jag utvecklade denna fullstack-applikation för Järvenskolorna i Katrineholm, där jag arbetade. Syftet var att underlätta för eleverna att beställa från skolans kafeteria via sina mobiltelefoner eller direkt från en skärm i kafeterian. Beställningarna tas emot av personalen i realtid via Socket.io.',
            techStack: ['MongoDB - spara föremål', 'Express - backend framework', 'Vanilla JavaScript', 'Node.js - servermiljö för JavaScript', 'Socket.js - Tar emot order', 'CSS3 & HTML5'],
            appLink: '',
            isProfessional: true
        },
    ]);
    const [draggedIndex, setDraggedIndex] = useState(null);
    const [project, setProject] = useState({
        id: '',
        title: '',
        createdDate: '',
        content: '',
        techStack: [],
        appLink: '',
        isProfessional: false,
    });
    const [createProject] = useCreateProjectMutation();
    const [tech, setTech] = useState('');
    const [form, setForm] = useState(false);
    const formRef = useRef(null);
    const techRef = useRef(null);
    const [addedTech, setAddedTech] = useState('');
    const [existedTech, setExistedTech] = useState('');
    const [deletedTech, setDeletedTech] = useState('');

    useEffect(() => {
        if(formRef.current) {
            formRef.current.style.maxHeight = '0px';
            if(form) {
                formRef.current.style.maxHeight = `${formRef.current.scrollHeight}px`;
                setTimeout(() => {
                    formRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 300);
            } else {
                formRef.current.style.maxHeight = '0px';
            }
        }
    }, [form, project]);

    const handleDragStart = (index) => {
        setDraggedIndex(index);
    }

    const handleDragOver = (event, index) => {
        event.preventDefault();
        if (draggedIndex === null || draggedIndex === index) return;
        const newList = [...list];
        const draggedItem = newList[draggedIndex];
        newList.splice(draggedIndex, 1);
        newList.splice(index, 0, draggedItem);
        setDraggedIndex(index);
        setList(newList);
    }

    const handleDrop = () => {
        setDraggedIndex(null);
    }

    const prepareProject = (e) => {
        setProject(prev => ({
            ...prev, [e.target.name]: e.target.value
        }));
    }

    const triggerTwice = (set, val) => {
        set(val);
        setTimeout(() => {
            set('');
            setTimeout(() => {
                set(val);
                setTimeout(() => {
                    set('');
                }, 200);
            }, 200);
        }, 200);
    }

    const prepareProjectList = (e) => {
        const trimmedTech = e.trim();
        if(!trimmedTech) return;
        const isExisted = project.techStack.some(tech => tech === trimmedTech);
        if(isExisted) {
            triggerTwice(setExistedTech, trimmedTech)
            return;
        }
        setProject(prev => ({
            ...prev, techStack: [...prev.techStack, trimmedTech]
        }));
        setTech('');
        setAddedTech(trimmedTech);
        setTimeout(() => {
            setAddedTech('');
        });
        techRef.current?.focus();
    }

    const handleDeleteTech = (tech) => {
        if(!tech) return;
        setDeletedTech(tech);
        setTimeout(() => {
            setDeletedTech('');
            setProject(prev => ({
                ...prev, techStack: prev.techStack.filter(t => t !== tech)
            }));
        }, 200);
    }

    const handleCreateProject = async (e) => {
        e.preventDefault();
        await createProject(project).unwrap();
    }

    const clearFields = () => {
        setProject({
            id: '',
            title: '',
            createdDate: '',
            content: '',
            techStack: [],
            appLink: '',
            isProfessional: false,
        });
        setTech('');
    }

    return (
        <section ref={ref} className="projectSection">
            <h1 className="sectionTitle"><i className="fa-brands fa-node-js"></i>Projekt</h1>
            <p><span>Här är några webbappar som jag utvecklat på fritiden, under skoltiden eller i yrkeslivet – de finns tillgängliga på GitHub.<br />Projekt med<i className="fa-solid fa-briefcase"></i>ikonen är yrkesprojekt som jag har utvecklat i arbetssammanhang.</span></p>
            <div className="projectMainWrapper">
                {/* Project */}
                {list.map((project, index) => project.title && 
                <div
                    key={index}
                    className="project flexColumn"
                    draggable
                    onDragStart={() => handleDragStart(index)}
                    onDragOver={e => handleDragOver(e, index)}
                    onDrop={handleDrop}
                >
                    {project.isProfessional &&
                    <i className="fa-solid fa-briefcase projectLabel"></i>}
                    <div className='flexColumn projectUpperPart'>
                        <div>
                            <h3><span>{project.title}</span></h3>
                            <h1><i className="fa-brands fa-github"></i></h1>
                        </div>
                        <p>{project.content}</p>
                        <ul className='projectTechStack flexColumn'>
                            <h5><span>Teknikstack som användes i denna applikation</span></h5>
                            {project.techStack.map(tech =>
                                <li key={tech}>{tech}</li>
                            )}
                        </ul>
                    </div>
                    <div className='projectLowerPart'>
                        <h6>Skapad: {project.createdDate}</h6>
                        <button>Visa på GitHub<i className="fa-solid fa-arrow-right"></i></button>
                    </div>
                </div>)}
                <h1 className={`showFormButton ${form ? 'showFormButtonOn' : ''}`} onClick={() => {setForm(!form); clearFields()}}>+</h1>
                <form ref={formRef} onSubmit={handleCreateProject}>
                    <div className='formTextInput'>
                        <h5>Title *</h5>
                        <input type="text" placeholder='Title *' title='Title' name='title' value={project.title || ''} onChange={prepareProject} />
                    </div>
                    <div className='formTextInput'>
                        <h5>Created date</h5>
                        <input type="date" placeholder='Created date' title='Created date' name='createdDate' value={project.createdDate || ''} onChange={prepareProject} />
                    </div>
                    <div className='formTextInput'>
                        <h5>Content *</h5>
                        <input type="text" placeholder='Content *' title='Content' name='content' value={project.content || ''} onChange={prepareProject} />
                    </div>
                    <div className='formTextInput'>
                        <h5>App link</h5>
                        <input type="text" placeholder='App link' title='App link' name='appLink' value={project.appLink || ''} onChange={prepareProject} />
                    </div>
                    {project.techStack.length > 0 &&
                    <ul>
                        {project.techStack.map(techStack =>
                            <li
                                key={techStack}
                                className={`
                                    ${techStack === existedTech ? 'projectThisTech' : ''}
                                    ${techStack === addedTech ? 'projectAddedTech' : ''}
                                    ${techStack === deletedTech ? 'projectDeletedTech' : ''}
                                `}
                            >
                                {techStack} <span onClick={() => handleDeleteTech(techStack)}>🗑️</span>
                            </li>
                        )}
                    </ul>}
                    <div className='formTextInput'>
                        <h5>Tech stack</h5>
                        <div style={{ display: 'flex', gap: '15px' }}>
                            <input
                                ref={techRef}
                                type="text"
                                placeholder='Tech stack'
                                title='Tech stack'
                                name='techStack'
                                value={tech || ''}
                                onChange={e => setTech(e.target.value)} style={{ width: '100%' }}
                                onKeyDown={e => e.key === 'Enter' && prepareProjectList}
                            />
                            {tech.trim() &&
                            <button style={{ width: '20%' }} type='button' onClick={() => prepareProjectList(tech)}>Add</button>}
                        </div>
                    </div>
                    <label>
                        <input type="checkbox" checked={project.isProfessional}
                        onChange={() => setProject(prev => ({
                            ...prev, isProfessional: !prev.isProfessional
                        }))} /> Professional project
                    </label>
                    <div style={{ display: 'flex', gap: '15px' }}>
                        <button style={{ width: '100%' }} type='submit'>Save</button>
                        {(project.title || project.content || project.createdDate || project.title || project.title ||  project.techStack.length > 0 || project.appLink || project.isProfessional) &&
                        <button style={{ width: '20%' }} type='button' onClick={() => clearFields()}>Clear</button>}
                    </div>
                </form>
            </div>
            
        </section>
    )
});

export default Projects;