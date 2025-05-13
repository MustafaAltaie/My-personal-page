import { useState, forwardRef, useRef, useEffect } from 'react';
import '../styles/education.css';
import {
    useCreateEducationMutation,
    useReadEducationQuery,
    useUpdateEducationMutation,
    useDeleteEducationMutation,
    useUpdateEducationsListMutation
} from '../features/portfolioApi.js';
import Education from './education.jsx';

const Educations = forwardRef((props, ref) => {
    const [draggedIndex, setDraggedIndex] = useState(null);
    const [createEducation] = useCreateEducationMutation();
    const { data: educations, isLoading } = useReadEducationQuery();
    const [updateEducation] = useUpdateEducationMutation();
    const [deleteEducation] = useDeleteEducationMutation();
    const [updateEducationsList] = useUpdateEducationsListMutation();
    const [educationObj, setEducationObj] = useState({
        id: '',
        title: '',
        dateFrom: '',
        dateTo: '',
        content: '',
        city: '',
        country: '',
        school: ''
    });
    const formRef = useRef(null);
    const [settings, setSettings] = useState(false);
    const [disableBtn, setDisableBtn] = useState(false);
    const [list, setList] = useState([]);
    const [deleted, setDeleted] = useState('');

    useEffect(() => {
        if(Array.isArray(educations) && !isLoading) {
            const transformed = educations.map(edu => ({
                id: edu._id,
                title: edu.title,
                dateFrom: edu.dateFrom,
                dateTo: edu.dateTo,
                content: edu.content,
                city: edu.city,
                country: edu.country,
                school: edu.school
            }));
            setList(transformed);
        }
    }, [educations, isLoading]);

    useEffect(() => {
        if(formRef.current) {
            if(settings) {
                formRef.current.style.maxHeight = `${formRef.current.scrollHeight}px`;
                setTimeout(() => {
                    formRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 200);
            } else {
                formRef.current.style.maxHeight = '0px';
            }
        }
    }, [settings]);

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
        await updateEducationsList(list).unwrap();
    }

    const prepareEducation = (e) => {
        setEducationObj(prev => ({
            ...prev, [e.target.name]: e.target.value
        }));
    }

    const prepareUpdate = (edu) => {
        setEducationObj({
            id: edu.id,
            title: edu.title,
            dateFrom: edu.dateFrom,
            dateTo: edu.dateTo,
            content: edu.content,
            city: edu.city,
            country: edu.country,
            school: edu.school
        });
        setSettings(true);
    }

    const handleCreateUpdateEducations = async (e) => {
        e.preventDefault();
        const { id, title, dateFrom, content, city, dateTo } = educationObj;
        const isValid = title && dateFrom && content && city;
        if(!isValid) {
            alert('Please fill in all required fields.');
            return;
        }
        if(dateFrom > dateTo && dateTo) {
            alert('Start date cannot be after end date.');
            return;
        }
        setDisableBtn(true);
        try {
            id ?
            await updateEducation(educationObj).unwrap() :
            await createEducation(educationObj).unwrap()
            clearFields();
            setSettings(false);
        } catch (err) {
            console.error('Error saving data:', err);
            alert('Error saving data');
        } finally {
            setDisableBtn(false);
        }
    }

    const handleDelete = async (id) => {
        if(!id) return;
        const confirmDeletion = confirm('Confirm deleting this?');
        if(!confirmDeletion) return;
        setDeleted(id);
        try {
            await deleteEducation(id).unwrap();
        } catch (err) {
            console.error('Error deleting education:', err);
            alert('Error deleting education');
        } finally {
            setTimeout(() => {
                setDeleted('');
            }, 1000);
        }
    }

    const clearFields = () => {
        setEducationObj({
            id: '',
            title: '',
            dateFrom: '',
            dateTo: '',
            content: '',
            city: '',
            country: '',
            school: ''
        });
    }

    return (
        <section ref={ref} className="educationSection">
            <div className='educationMainWrapper'>
                <h1 className='educationText'><i className="fa-solid fa-user-graduate"></i>Utbildningar</h1>
                <br />
                {isLoading && <p>Loading...</p>}
                {list.map((education, index) => 
                    <Education
                        key={education.id}
                        education={education}
                        index={index}
                        handleDragStart={handleDragStart}
                        handleDragOver={handleDragOver}
                        handleDrop={handleDrop}
                        prepareUpdate={prepareUpdate}
                        handleDelete={handleDelete}
                        deleted={deleted}
                    />
                )}
            </div>
            <h1 className={`showEducationFormBtn showFormButton ${settings ? 'showFormButtonOn' : ''}`} onClick={() => {setSettings(!settings); clearFields()}}>+</h1>
            <form ref={formRef} className='educationForm' onSubmit={handleCreateUpdateEducations}>
                <div className='formTwoInputs'>
                    <div className='formTextInput'>
                        <h5>Date from *</h5>
                        <input type="date" name='dateFrom' placeholder='Date from' title='Date from' value={educationObj.dateFrom || ''} onChange={prepareEducation} />
                    </div>
                    <div className='formTextInput'>
                        <h5>Date to</h5>
                        <input type="date" name='dateTo' placeholder='Date to' title='Date to' value={educationObj.dateTo || ''} onChange={prepareEducation} />
                    </div>
                </div>
                <div className='formTwoInputs'>
                    <div className='formTextInput'>
                        <h5>City *</h5>
                        <input type="text" name='city' placeholder='City *' title='City' value={educationObj.city || ''} onChange={prepareEducation} />
                    </div>
                    <div className='formTextInput'>
                        <h5>Country</h5>
                        <input type="text" name='country' placeholder='Country' title='Country' value={educationObj.country || ''} onChange={prepareEducation} />
                    </div>
                </div>
                <div className='formTextInput'>
                    <h5>Education title *</h5>
                    <input type="text" name='title' placeholder='Education title *' title='Title' value={educationObj.title || ''} onChange={prepareEducation} />
                </div>
                <div className='formTextInput'>
                    <h5>School name *</h5>
                    <input type="text" name='school' placeholder='School name *' title='School' value={educationObj.school || ''} onChange={prepareEducation} />
                </div>
                <div className='formTextInput'>
                    <h5>Description *</h5>
                    <textarea name="content" placeholder='Description *' title='Description' value={educationObj.content || ''} onChange={prepareEducation}></textarea>
                </div>
                <button type='submit' disabled={disableBtn}>{educationObj?.id ? 'Update education' : 'Save education'}</button>
            </form>
        </section>
    )
});

export default Educations;