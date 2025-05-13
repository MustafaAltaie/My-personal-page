import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import {
    useCreateSoftSkillMutation,
    useReadSoftSkillsQuery,
    useUpdateSoftSkillsMutation,
    useDeleteSoftSkillsMutation,
    useUpdateSoftListMutation
} from '../features/portfolioApi';

const SkillsSettingsSoft = () => {
    const [softList, setSoftList] = useState([]);
    const [createSoftSkill] = useCreateSoftSkillMutation();
    const { data: softSkills, isSoftLoading } = useReadSoftSkillsQuery();
    const [updateSoftSkills] = useUpdateSoftSkillsMutation();
    const [deleteSoftSkills] = useDeleteSoftSkillsMutation();
    const [updateSoftList] = useUpdateSoftListMutation();
    const [draggedIndex, setDraggedIndex] = useState(null);

    useEffect(() => {
        if(Array.isArray(softSkills) && !isSoftLoading) {
            const transformed = softSkills.map(skill => ({
                id: skill._id,
                title: skill.title,
                description: skill.description
            }));
            setSoftList(transformed);
        }
    }, [softSkills, isSoftLoading]);

    const handleDragStart = (index) => {
        setDraggedIndex(index);
    }

    const handleDragOver = (event, index) => {
        event.preventDefault();
        if (draggedIndex === null || draggedIndex === index) return;
        const newList = [...softList];
        const draggedItem = newList[draggedIndex];
        newList.splice(draggedIndex, 1);
        newList.splice(index, 0, draggedItem);
        setDraggedIndex(index);
        setSoftList(newList);
    }

    const handleDrop = async () => {
        setDraggedIndex(null);
        await updateSoftList(softList).unwrap();
    }

    const [softForm, setSoftForm] = useState(false);
    const [softObj, setSoftObj] = useState({
        id: '',
        title: '',
        description: ''
    });
    const softFormRef = useRef(null);

    const prepareSoftObj = (e) => {
        setSoftObj(prev => ({
            ...prev, [e.target.name]: e.target.value
        }));
    }

    const handleSaveSoftSkill = async (e) => {
        e.preventDefault();
        const { id, title, description } = softObj;
        const isValid = title && description;
        if(!isValid) return;
        try {
            id ?
            await updateSoftSkills(softObj).unwrap() :
            await createSoftSkill(softObj).unwrap()
            clearSoftFields();
        } catch {
            alert('Error saving skill');
            console.error('error saving skills:', err);
        }
    }

    const prepareSoftUpdate = (skill) => {
        setSoftObj({
            id: skill.id,
            title: skill.title,
            description: skill.description
        });
        setSoftForm(true);
        setTimeout(() => {
            softFormRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 10);
    }

    const handleDeleteSoftSkill = async (id) => {
        if(!id) return;
        const confirmDeleting = confirm('Confirm deleting skill?');
        if(!confirmDeleting) return;
        try {
            await deleteSoftSkills(id).unwrap();
        } catch (err) {
            console.error('Error deleting skill:', err);
            alert('Error deleting skill');
        }
    }

    const clearSoftFields = () => {
        setSoftObj({
            id: '',
            title: '',
            description: ''
        });
    }

    return (
        <>
        {isSoftLoading && <p>Loading...</p>}
        {softList.map((softSkill, index) => 
        <motion.div
            key={softSkill.id}
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
            <p><span>{softSkill.title}: </span>{softSkill.description}</p>
            <div className='skillsToolsWrapper'>
                <span onClick={() => prepareSoftUpdate(softSkill)}>🖋️</span>
                <span onClick={() => handleDeleteSoftSkill(softSkill.id)}>🗑️</span>
            </div>
        </motion.div>
        )}
        <h1 className={`showFormButton ${softForm ? 'showFormButtonOn' : ''}`} onClick={() => {setSoftForm(!softForm); clearSoftFields()}}>+</h1>
        {softForm &&
        <form ref={softFormRef} onSubmit={handleSaveSoftSkill}>
            <input type="text" placeholder='Title' title='Title' name='title' value={softObj.title || ''} onChange={prepareSoftObj} />
            <textarea name="description" placeholder='Description' title='Description' value={softObj.description || ''} onChange={prepareSoftObj}></textarea>
            <button type='submit'>{softObj.id ? 'Update' : 'Save'}</button>
        </form>}
        </>
    )
}

export default SkillsSettingsSoft;