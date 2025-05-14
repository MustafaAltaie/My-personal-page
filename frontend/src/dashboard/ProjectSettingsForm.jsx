import { useState, useEffect } from "react";

const ProjectSettingsForm = (props) => {
    const [techList, setTechList] = useState([]);
    const [draggedIndex, setDraggedIndex] = useState(null);

    useEffect(() => {
        if(Array.isArray(props.project.techStack)) {
            const transformed = [...props.project.techStack];
            setTechList(transformed);
        }
    }, [props.project.techStack]);

    const dragStart = (index) => {
        setDraggedIndex(index);
    }

    const dragOver = (event, index) => {
        event.preventDefault();
        if (draggedIndex === null || draggedIndex === index) return;
        const newList = [...techList];
        const draggedItem = newList[draggedIndex];
        newList.splice(draggedIndex, 1);
        newList.splice(index, 0, draggedItem);
        setDraggedIndex(index);
        setTechList(newList);
    }

    const drop = async () => {
        setDraggedIndex(null);
        const newProject = {
            id: props.project.id,
            title: props.project.title,
            createdDate: props.project.createdDate,
            content: props.project.content,
            techStack: techList,
            appLink: props.project.appLink,
            isProfessional: props.project.isProfessional,
        }
        props.handlePrepareUpdate(newProject);
    }

    const getDateInputValue = (dateString) => {
        if (!dateString) return '';
        return new Date(dateString).toISOString().split('T')[0];
    }

    return (
        <form ref={props.formRef} onSubmit={props.handleCreateProject}>
            <div className='formTextInput'>
                <h5>Title *</h5>
                <input type="text" placeholder='Title *' title='Title' name='title' value={props.project.title || ''} onChange={props.prepareProject} />
            </div>
            <div className='formTextInput'>
                <h5>Created date</h5>
                <input type="date" placeholder='Created date' title='Created date' name='createdDate' value={getDateInputValue(props.project.createdDate)} onChange={props.prepareProject} />
            </div>
            <div className='formTextInput'>
                <h5>Content *</h5>
                <textarea placeholder='Content *' title='Content' name='content' value={props.project.content || ''} onChange={props.prepareProject}></textarea>
            </div>
            <div className='formTextInput'>
                <h5>App link</h5>
                <input type="text" placeholder='App link' title='App link' name='appLink' value={props.project.appLink || ''} onChange={props.prepareProject} />
            </div>
            {props.project.techStack.length > 0 &&
            <ul>
                {techList.map((techStack, index) =>
                    <li
                        key={techStack}
                        className={`
                            ${techStack === props.existedTech ? 'projectThisTech' : ''}
                            ${techStack === props.addedTech ? 'projectAddedTech' : ''}
                            ${techStack === props.deletedTech ? 'projectDeletedTech' : ''}
                        `}
                        draggable
                        onDragStart={() => dragStart(index)}
                        onDragOver={e => dragOver(e, index)}
                        onDrop={drop}
                    >
                        {techStack} <span onClick={() => props.handleDeleteTech(techStack)}>🗑️</span>
                    </li>
                )}
            </ul>}
            <div className='formTextInput'>
                <h5>Tech stack</h5>
                <div style={{ display: 'flex', gap: '15px' }}>
                    <input
                        ref={props.techRef}
                        type="text"
                        placeholder='Tech stack'
                        title='Tech stack'
                        name='techStack'
                        value={props.tech || ''}
                        onChange={e => props.setTech(e.target.value)} style={{ width: '100%' }}
                        onKeyDown={e => e.key === 'Enter' && props.prepareProjectList}
                    />
                    {props.tech.trim() &&
                    <button style={{ width: '20%' }} type='button' onClick={() => props.prepareProjectList(props.tech)}>Add</button>}
                </div>
            </div>
            <label>
                <input type="checkbox" checked={props.project.isProfessional}
                onChange={() => props.setProject(prev => ({
                    ...prev, isProfessional: !prev.isProfessional
                }))} /> Professional project
            </label>
            <div style={{ display: 'flex', gap: '15px' }}>
                <button style={{ width: '100%' }} type='submit'>{props.project.id ? 'Update' : 'Save'}</button>
                {(props.project.title || props.project.content || props.project.createdDate || props.project.title || props.project.title ||  props.project.techStack.length > 0 || props.project.appLink || props.project.isProfessional) &&
                <button style={{ width: '20%' }} type='button' onClick={() => props.clearFields()}>{props.project.id ? 'Cancel' : 'Clear'}</button>}
            </div>
        </form>
    )
}

export default ProjectSettingsForm;