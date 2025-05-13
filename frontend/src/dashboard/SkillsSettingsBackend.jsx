import { motion } from 'framer-motion';
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
        <motion.div
            key={backendSkill.id}
            className="skill dottedElement"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0 }}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={e => handleDragOver(e, index)}
            onDrop={handleDrop}
        >
            <p><span>{backendSkill.title}: </span>{backendSkill.description}</p>
            <div className='skillsToolsWrapper'>
                <span onClick={() => prepareBackendUpdate(backendSkill)}>🖋️</span>
                <span onClick={() => handleDeleteBackSkill(backendSkill.id)}>🗑️</span>
            </div>
        </motion.div>
        )}
        <h1 className={`showFormButton ${backendForm ? 'showFormButtonOn' : ''}`} onClick={() => {setBackendForm(!backendForm); clearBackFields()}}>+</h1>
        {backendForm &&
        <form ref={backendFormRef} onSubmit={handleSaveBackendSkill}>
            <input type="text" placeholder='Title' title='Title' name='title' value={backendObj.title || ''} onChange={prepareBackendObj} />
            <textarea name="description" placeholder='Description' title='Description' value={backendObj.description || ''} onChange={prepareBackendObj}></textarea>
            <button type='submit'>{backendObj.id ? 'Update' : 'Save'}</button>
        </form>}
        </>
    )
}

export default SkillsSettingsBackend;