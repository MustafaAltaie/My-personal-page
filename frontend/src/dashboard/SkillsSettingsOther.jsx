import { useState, useEffect, useRef } from 'react';
import {
    useCreateOtherSkillMutation,
    useReadOtherSkillsQuery,
    useUpdateOtherSkillsMutation,
    useDeleteOtherSkillsMutation,
    useUpdateOtherListMutation
} from '../features/portfolioApi';

const SkillsSettingsOther = () => {
    const [otherList, setOtherList] = useState([]);
    const [createOtherSkill] = useCreateOtherSkillMutation();
    const { data: otherSkills, isOtherLoading } = useReadOtherSkillsQuery();
    const [updateOtherSkills] = useUpdateOtherSkillsMutation();
    const [deleteOtherSkills] = useDeleteOtherSkillsMutation();
    const [updateOtherList] = useUpdateOtherListMutation();
    const [draggedIndex, setDraggedIndex] = useState(null);

    useEffect(() => {
        if(Array.isArray(otherSkills) && !isOtherLoading) {
            const transformed = otherSkills.map(skill => ({
                id: skill._id,
                title: skill.title,
                description: skill.description
            }));
            setOtherList(transformed);
        }
    }, [otherSkills, isOtherLoading]);

    const handleDragStart = (index) => {
        setDraggedIndex(index);
    }

    const handleDragOver = (event, index) => {
        event.preventDefault();
        if (draggedIndex === null || draggedIndex === index) return;
        const newList = [...otherList];
        const draggedItem = newList[draggedIndex];
        newList.splice(draggedIndex, 1);
        newList.splice(index, 0, draggedItem);
        setDraggedIndex(index);
        setOtherList(newList);
    }

    const handleDrop = async () => {
        setDraggedIndex(null);
        await updateOtherList(otherList).unwrap();
    }

    const [otherForm, setOtherForm] = useState(false);
    const [otherObj, setOtherObj] = useState({
        id: '',
        title: '',
        description: ''
    });
    const otherFormRef = useRef(null);

    const prepareOtherObj = (e) => {
        setOtherObj(prev => ({
            ...prev, [e.target.name]: e.target.value
        }));
    }

    const handleSaveOtherSkill = async (e) => {
        e.preventDefault();
        const { id, title, description } = otherObj;
        const isValid = title && description;
        if(!isValid) return;
        try {
            id ?
            await updateOtherSkills(otherObj).unwrap() :
            await createOtherSkill(otherObj).unwrap()
            clearOtherFields();
        } catch {
            alert('Error saving skill');
            console.error('error saving skills:', err);
        }
    }

    const prepareOtherUpdate = (skill) => {
        setOtherObj({
            id: skill.id,
            title: skill.title,
            description: skill.description
        });
        setOtherForm(true);
        setTimeout(() => {
            otherFormRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 10);
    }

    const handleDeleteOtherSkill = async (id) => {
        if(!id) return;
        const confirmDeleting = confirm('Confirm deleting skill?');
        if(!confirmDeleting) return;
        try {
            await deleteOtherSkills(id).unwrap();
        } catch (err) {
            console.error('Error deleting skill:', err);
            alert('Error deleting skill');
        }
    }

    const clearOtherFields = () => {
        setOtherObj({
            id: '',
            title: '',
            description: ''
        });
    }

    return (
        <>
        {isOtherLoading && <p>Loading...</p>}
        {otherList.map((otherSkill, index) => 
        <div
            key={otherSkill.id}
            className="skill dottedElement"
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={e => handleDragOver(e, index)}
            onDrop={handleDrop}
        >
            <p><span>{otherSkill.title}: </span>{otherSkill.description}</p>
            <div className='toolsWrapper'>
                <span onClick={() => prepareOtherUpdate(otherSkill)}>🖋️</span>
                <span onClick={() => handleDeleteOtherSkill(otherSkill.id)}>🗑️</span>
            </div>
        </div>
        )}
        <h1 className={`showFormButton ${otherForm ? 'showFormButtonOn' : ''}`} onClick={() => {setOtherForm(!otherForm); clearOtherFields()}}>+</h1>
        {otherForm &&
        <form ref={otherFormRef} onSubmit={handleSaveOtherSkill}>
            <div className='formTextInput'>
                <h5>Title *</h5>
                <input type="text" placeholder='Title *' title='Title' name='title' value={otherObj.title || ''} onChange={prepareOtherObj} />
            </div>
            <div className='formTextInput'>
                <h5>Description *</h5>
                <textarea name="description" placeholder='Description *' title='Description' value={otherObj.description || ''} onChange={prepareOtherObj}></textarea>
            </div>
            <button type='submit'>{otherObj.id ? 'Update' : 'Save'}</button>
        </form>}
        </>
    )
}

export default SkillsSettingsOther;