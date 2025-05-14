import { useState, forwardRef, useRef, useEffect } from 'react';
import '../styles/project.css';
import {
    useCreateProjectMutation,
    useReadProjectsQuery,
    useUpdateProjectMutation,
    useDeleteProjectMutation,
    useUpdateProjectListMutation,
} from '../features/portfolioApi';
import ProjectSettingsForm from './ProjectSettingsForm';
import ProjectsSettingsProject from './ProjectsSettingsProject';

const Projects = forwardRef((props, ref) => {
    const [list, setList] = useState([]);
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
    const { data: projects, isLoading } = useReadProjectsQuery();
    const [updateProject] = useUpdateProjectMutation();
    const [deleteProject] = useDeleteProjectMutation();
    const [updateProjectList] = useUpdateProjectListMutation();
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
                setTimeout(() => {
                    formRef.current.style.maxHeight = `${formRef.current.scrollHeight}px`;
                }, 10);
                formRef.current.scrollIntoView({ block: 'center' });
            } else {
                formRef.current.style.maxHeight = '0px';
            }
        }
    }, [form, project]);

    useEffect(() => {
        if(Array.isArray(projects) && !isLoading) {
            const transformed = projects.map(project => ({
                id: project._id,
                title: project.title,
                createdDate: project.createdDate,
                content: project.content,
                techStack: project.techStack,
                appLink: project.appLink,
                isProfessional: project.isProfessional,
            }));
            setList(transformed);
        }
    }, [projects, isLoading]);

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

    const handleDrop = async () => {
        setDraggedIndex(null);
        await updateProjectList(list).unwrap();
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
        if(!e) return;
        const { id, title, content } = project;
        if(!title && !content) return;
        try {
            id ?
            await updateProject(project).unwrap() :
            await createProject(project).unwrap()
            clearFields();
        } catch (err) {
            alert('Error creating project');
            console.error('Error creating project:', err);
        }
    }

    const handlePrepareUpdate = (project) => {
        setProject({
            id: project.id,
            title: project.title,
            createdDate: project.createdDate,
            content: project.content,
            techStack: project.techStack,
            appLink: project.appLink,
            isProfessional: project.isProfessional,
        });
        setForm(true);
    }

    const handleDeleteProject = async (id) => {
        if(!id) return;
        const isConfirmed = confirm('Confirm deleting project?');
        if(!isConfirmed) return;
        try {
            await deleteProject(id).unwrap();
        } catch (err) {
            alert('Error deleting project');
            console.error('Error deleting project:', err);
        }
    }

    const clearFields = () => {
        setProject({
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
                {isLoading && <p>Loading...</p>}
                {/* Project */}
                {list.map((project, index) => project.title && 
                <ProjectsSettingsProject
                    key={index}
                    index={index}
                    handleDragStart={handleDragStart}
                    handleDragOver={handleDragOver}
                    handleDrop={handleDrop}
                    project={project}
                    handlePrepareUpdate={handlePrepareUpdate}
                    handleDeleteProject={handleDeleteProject}
                />)}
            </div>
            <h1 className={`showFormButton ${form ? 'showFormButtonOn' : ''}`} onClick={() => {setForm(!form); clearFields()}}>+</h1>
            <ProjectSettingsForm
                formRef={formRef}
                handleCreateProject={handleCreateProject}
                project={project}
                prepareProject={prepareProject}
                prepareProjectList={prepareProjectList}
                setProject={setProject}
                clearFields={clearFields}
                techRef={techRef}
                tech={tech}
                setTech={setTech}
                existedTech={existedTech}
                addedTech={addedTech}
                deletedTech={deletedTech}
                handleDeleteTech={handleDeleteTech}
                handlePrepareUpdate={handlePrepareUpdate}
            />
        </section>
    )
});

export default Projects;