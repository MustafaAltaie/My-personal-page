import { useState, useEffect, useRef } from 'react';
import {
    useCreateBackendSkillMutation,
    useReadBackendSkillsQuery,
    useUpdateBackendSkillsMutation,
    useDeleteBackendSkillsMutation,
    useUpdateBackendListMutation
} from '../features/portfolioApi';

const SkillsSettingsBackend = () => {
    const [backendList, setBackendList] = useState([]);
    const [createBackendSkill] = useCreateBackendSkillMutation();
    const { data: backendSkills, isBackendLoading } = useReadBackendSkillsQuery();
    const [updateBackendSkills] = useUpdateBackendSkillsMutation();
    const [deleteBackendSkills] = useDeleteBackendSkillsMutation();
    const [updateBackendList] = useUpdateBackendListMutation();
    const [draggedIndex, setDraggedIndex] = useState(null);

    useEffect(() => {
        if(Array.isArray(backendSkills) && !isBackendLoading) {
            const transformed = backendSkills.map(skill => ({
                id: skill._id,
                title: skill.title,
                description: skill.description
            }));
            setBackendList(transformed);
        }
    }, [backendSkills, isBackendLoading]);

    const handleDragStart = (index) => {
        setDraggedIndex(index);
    }

    const handleDragOver = (event, index) => {
        event.preventDefault();
        if (draggedIndex === null || draggedIndex === index) return;
        const newList = [...backendList];
        const draggedItem = newList[draggedIndex];
        newList.splice(draggedIndex, 1);
        newList.splice(index, 0, draggedItem);
        setDraggedIndex(index);
        setBackendList(newList);
    }

    const handleDrop = async () => {
        setDraggedIndex(null);
        await updateBackendList(backendList).unwrap();
    }

    const [backendForm, setBackendForm] = useState(false);
    const [backendObj, setBackendObj] = useState({
        id: '',
        title: '',
        description: ''
    });
    const backendFormRef = useRef(null);

    const prepareBackendObj = (e) => {
        setBackendObj(prev => ({
            ...prev, [e.target.name]: e.target.value
        }));
    }

    const handleSaveBackendSkill = async (e) => {
        e.preventDefault();
        const { id, title, description } = backendObj;
        const isValid = title && description;
        if(!isValid) return;
        try {
            id ?
            await updateBackendSkills(backendObj).unwrap() :
            await createBackendSkill(backendObj).unwrap()
            clearBackFields();
        } catch {
            alert('Error saving skill');
            console.error('error saving skills:', err);
        }
    }

    const prepareBackendUpdate = (skill) => {
        setBackendObj({
            id: skill.id,
            title: skill.title,
            description: skill.description
        });
        setBackendForm(true);
        setTimeout(() => {
            backendFormRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 10);
    }

    const handleDeleteBackSkill = async (id) => {
        if(!id) return;
        const confirmDeleting = confirm('Confirm deleting skill?');
        if(!confirmDeleting) return;
        try {
            await deleteBackendSkills(id).unwrap();
        } catch (err) {
            console.error('Error deleting skill:', err);
            alert('Error deleting skill');
        }
    }

    const clearBackFields = () => {
        setBackendObj({
            id: '',
            title: '',
            description: ''
        });
    }

    return (
        <>
        {isBackendLoading && <p>Loading...</p>}
        {backendList.map((backendSkill, index) => 
        <div
            key={backendSkill.id}
            className="skill dottedElement"
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={e => handleDragOver(e, index)}
            onDrop={handleDrop}
        >
            <p><span>{backendSkill.title}: </span>{backendSkill.description}</p>
            <div className='toolsWrapper'>
                <span onClick={() => prepareBackendUpdate(backendSkill)}>🖋️</span>
                <span onClick={() => handleDeleteBackSkill(backendSkill.id)}>🗑️</span>
            </div>
        </div>
        )}
        <h1 className={`showFormButton ${backendForm ? 'showFormButtonOn' : ''}`} onClick={() => {setBackendForm(!backendForm); clearBackFields()}}>+</h1>
        {backendForm &&
        <form ref={backendFormRef} onSubmit={handleSaveBackendSkill}>
            <div className='formTextInput'>
                <h5>Title *</h5>
                <input type="text" placeholder='Title *' title='Title' name='title' value={backendObj.title || ''} onChange={prepareBackendObj} />
            </div>
            <div className='formTextInput'>
                <h5>Description *</h5>
                <textarea name="description" placeholder='Description *' title='Description' value={backendObj.description || ''} onChange={prepareBackendObj}></textarea>
            </div>
            <button type='submit'>{backendObj.id ? 'Update' : 'Save'}</button>
        </form>}
        </>
    )
}

export default SkillsSettingsBackend;