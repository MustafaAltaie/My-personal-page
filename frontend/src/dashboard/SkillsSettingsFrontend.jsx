import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import {
    useCreateFrontendSkillMutation,
    useReadFrontendSkillsQuery,
    useUpdateFrontendSkillsMutation,
    useDeleteFrontendSkillsMutation,
    useUpdateFrontendListMutation
} from '../features/portfolioApi';

const SkillsSettingsFrontend = () => {
    const [frontendList, setFrontendList] = useState([]);
    const [createFrontendSkill] = useCreateFrontendSkillMutation();
    const { data: frontendSkills, isFrontendLoading } = useReadFrontendSkillsQuery();
    const [updateFrontendSkills] = useUpdateFrontendSkillsMutation();
    const [deleteFrontendSkills] = useDeleteFrontendSkillsMutation();
    const [updateFrontendList] = useUpdateFrontendListMutation();
    const [draggedIndex, setDraggedIndex] = useState(null);

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

    const handleDragOver = (event, index) => {
        event.preventDefault();
        if (draggedIndex === null || draggedIndex === index) return;
        const newList = [...frontendList];
        const draggedItem = newList[draggedIndex];
        newList.splice(draggedIndex, 1);
        newList.splice(index, 0, draggedItem);
        setDraggedIndex(index);
        setFrontendList(newList);
    }

    const handleDrop = async () => {
        setDraggedIndex(null);
        await updateFrontendList(frontendList).unwrap();
    }

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
        <>
        {isFrontendLoading && <p>Loading...</p>}
        {frontendList.map((frontendSkill, index) => 
        <motion.div
            key={frontendSkill.id}
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
            <p><span>{frontendSkill.title}: </span>{frontendSkill.description}</p>
            <div className='skillsToolsWrapper'>
                <span onClick={() => prepareFrontendUpdate(frontendSkill)}>🖋️</span>
                <span onClick={() => handleDeleteFrontSkill(frontendSkill.id)}>🗑️</span>
            </div>
        </motion.div>
        )}
        <h1 className={`showFormButton ${frontendForm ? 'showFormButtonOn' : ''}`} onClick={() => {setFrontendForm(!frontendForm); clearFrontFields()}}>+</h1>
        {frontendForm &&
        <form ref={frontendFormRef} onSubmit={handleSaveFrontendSkill}>
            <input type="text" placeholder='Title' title='Title' name='title' value={frontendObj.title || ''} onChange={prepareFrontendObj} />
            <textarea name="description" placeholder='Description' title='Description' value={frontendObj.description || ''} onChange={prepareFrontendObj}></textarea>
            <button type='submit'>{frontendObj.id ? 'Update' : 'Save'}</button>
        </form>}
        </>
    )
}

export default SkillsSettingsFrontend;