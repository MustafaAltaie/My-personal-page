import { useState, forwardRef, useRef, useEffect } from 'react';
import '../styles/education.css';
import { motion } from 'framer-motion';
import { useCreateEducationMutation, useReadEducationQuery, useUpdateEducationMutation, useDeleteEducationMutation } from '../features/portfolioApi.js';
import Education from './education.jsx';

const Educations = forwardRef((props, ref) => {
    const [draggedIndex, setDraggedIndex] = useState(null);
    const [createEducation] = useCreateEducationMutation();
    const { data: educations, isLoading } = useReadEducationQuery();
    const [updateEducation] = useUpdateEducationMutation();
    const [deleteEducation] = useDeleteEducationMutation();
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

    useEffect(() => {
        if(Array.isArray(educations) && !isLoading) {
            const transformed = educations.map(edu => ({
                id: edu._id,
                title: edu.title,
                date: `${edu.dateFrom} - ${edu.dateTo} | ${edu.school}, ${edu.city} - ${edu.country}`,
                content: edu.content
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

    const handleDrop = () => {
        setDraggedIndex(null);
    }

    const prepareEducation = (e) => {
        setEducationObj(prev => ({
            ...prev, [e.target.name]: e.target.value
        }));
    }

    const prepareUpdate = (edu) => {
        setEducationObj({
            id: edu._id,
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
        setDisableBtn(true);
        const { id, title, dateFrom, dateTo, content } = educationObj;
        const isValid = title && content && dateFrom && dateTo;
        if(!isValid) return;
        try {
            id ?
            await updateEducation(educationObj).unwrap() :
            await createEducation(educationObj).unwrap()
            clearFields();
            setSettings(false);
            setDisableBtn(false);
        } catch (err) {
            console.error('Error saving data:', err);
            alert('Error saving data');
        }
    }

    const handleDelete = async (id) => {
        if(!id) return;
        try {
            await deleteEducation(id).unwrap();
        } catch (err) {
            console.log('Error deleting education:', err);
            alert('Error deleting education');
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
                <motion.h1
                    className='educationText'
                    initial={{ opacity: 0, x: -100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true, amount: 0.4 }}
                ><i className="fa-solid fa-user-graduate"></i>Utbildningar</motion.h1>
                <br /><br />
                {isLoading && <p>Loading...</p>}
                {educations?.map((education, index) => 
                    <Education
                        key={index}
                        education={education}
                        index={index}
                        handleDragStart={handleDragStart}
                        handleDragOver={handleDragOver}
                        handleDrop={handleDrop}
                        prepareUpdate={prepareUpdate}
                        handleDelete={handleDelete}
                    />
                )}
            </div>
            <h1 className={`showEducationFormBtn showFormButton ${settings ? 'showFormButtonOn' : ''}`} onClick={() => {setSettings(!settings); clearFields()}}>+</h1>
            <form ref={formRef} className='educationForm' onSubmit={handleCreateUpdateEducations}>
                <div className='formTwoInputs'>
                    <div>
                        <p>Date from</p>
                        <input type="date" name='dateFrom' placeholder='Date from' title='Date from' value={educationObj.dateFrom || ''} onChange={prepareEducation} />
                    </div>
                    <div>
                        <p>Date to</p>
                        <input type="date" name='dateTo' placeholder='Date to' title='Date to' value={educationObj.dateTo || ''} onChange={prepareEducation} />
                    </div>
                </div>
                <div className='formTwoInputs'>
                    <div>
                        <input type="text" name='city' placeholder='City' title='City' value={educationObj.city || ''} onChange={prepareEducation} />
                    </div>
                    <div>
                        <input type="text" name='country' placeholder='Country' title='Country' value={educationObj.country || ''} onChange={prepareEducation} />
                    </div>
                </div>
                <input type="text" name='title' placeholder='Title' title='Title' value={educationObj.title || ''} onChange={prepareEducation} />
                <input type="text" name='school' placeholder='School' title='School' value={educationObj.school || ''} onChange={prepareEducation} />
                <textarea name="content" placeholder='Content' title='Content' value={educationObj.content || ''} onChange={prepareEducation}></textarea>
                <button type='submit' disabled={disableBtn}>{educationObj?.id ? 'Update education' : 'Save education'}</button>
            </form>
        </section>
    )
});

export default Educations;