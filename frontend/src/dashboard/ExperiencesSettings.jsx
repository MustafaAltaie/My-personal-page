import { useState, forwardRef, useRef, useEffect } from 'react';
import '../styles/experience.css';
import {
    useCreateExperienceMutation,
    useReadExperienceQuery,
    useUpdateExperienceMutation,
    useDeleteExperienceMutation,
    useUpdateExperienceListMutation,
} from '../features/portfolioApi.js';

const Experiences = forwardRef((props, ref) => {
    const [list, setList] = useState([]);

    const [draggedIndex, setDraggedIndex] = useState(null);
    const [form, setForm] = useState(false);
    const formRef = useRef(null);
    const [experienceObj, setExperienceObj] = useState({
        id: '',
        company: '',
        address: '',
        dateFrom: '',
        dateTo: '',
        description: '',
    });
    const [disableBtn, setDisableBtn] = useState(false);
    const [createExperience] = useCreateExperienceMutation();
    const { data: experiences, isLoading } = useReadExperienceQuery();
    const [updateExperience] = useUpdateExperienceMutation();
    const [deleteExperience] = useDeleteExperienceMutation();
    const [updateExperienceList] = useUpdateExperienceListMutation();

    useEffect(() => {
        if(formRef) {
            if(form) {
                formRef.current.style.maxHeight = `${formRef.current.scrollHeight}px`;
                setTimeout(() => {
                    formRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 300)
            } else {
                formRef.current.style.maxHeight = '0px';
            }
        }
    }, [form]);

    useEffect(() => {
        if(Array.isArray(experiences) && !isLoading) {
            const transformed = experiences.map(exp => ({
                id: exp._id,
                company: exp.company,
                address: exp.address,
                dateFrom: exp.dateFrom,
                dateTo: exp.dateTo,
                description: exp.description,
            }));
            setList(transformed);
        }
    }, [experiences, isLoading]);

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
        await updateExperienceList(list).unwrap();
    }

    const prepareExperienceObj = (e) => {
        setExperienceObj(prev => ({
            ...prev, [e.target.name]: e.target.value
        }));
    }

    const handleSaveExperience = async (e) => {
        e.preventDefault();
        const { id, company, address, dateFrom, dateTo, description } = experienceObj;
        const isValid = company && address && dateFrom && description;
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
            await updateExperience(experienceObj).unwrap() :
            await createExperience(experienceObj).unwrap()
            clearFields();
        } catch (err) {
            console.error('Error saving experience:', err);
            alert('Error while saving experience');
        } finally {
            setDisableBtn(false);
            setForm(false);
        }
    }

    const handlePrepareUpdate = (exp) => {
        setExperienceObj({
            id: exp.id,
            company: exp.company,
            address: exp.address,
            dateFrom: exp.dateFrom,
            dateTo: exp.dateTo,
            description: exp.description,
        });
        setForm(true);
    }

    const handleDeletion = async (id) => {
        if(!id) return;
        const isConfirmed = confirm('Confirm deleting experience?');
        if(!isConfirmed) return;
        try {
            await deleteExperience(id).unwrap();
        } catch (err) {
            alert('Error deleting experience.');
            console.error('Error deleting experience:', err);
        }
    }

    const clearFields = () => {
        setExperienceObj({
            id: '',
            company: '',
            address: '',
            dateFrom: '',
            dateTo: '',
            description: '',
        });
    }

    return (
        <section ref={ref} className="experienceSection">
            <h1 className="sectionTitle"><i className="fa-solid fa-briefcase"></i>Arbetslivserfarenhet</h1>
            {isLoading && <p>...loading</p>}
            <div className="experienceMainWrapper flexColumn">
                {/* Experience */}
                {list.map((experience, index) => 
                <div
                    key={index}
                    className="experience"
                    draggable
                    onDragStart={() => handleDragStart(index)}
                    onDragOver={e => handleDragOver(e, index)}
                    onDrop={handleDrop}
                >
                    <div className="experienceColumn1">
                        <div>
                            <h5>{experience.company}</h5>
                            <h5>{experience.address}</h5>
                        </div>
                    </div>
                    <div className="experienceColumn2 dottedElement">
                        <div style={{ paddingRight: '30px' }}>
                            <p>{experience.dateFrom} - {experience.dateTo ? experience.dateTo : 'Pågår'}</p>
                            <p>{experience.description}</p>
                        </div>
                        <div className='toolsWrapper'>
                            <span onClick={() => handlePrepareUpdate(experience)}>🖋️</span>
                            <span onClick={() => handleDeletion(experience.id)}>🗑️</span>
                        </div>
                    </div>
                </div>)}
            </div>
            <h1 className={`showFormButton ${form ? 'showFormButtonOn' : ''}`} onClick={() => {setForm(!form); clearFields()}}>+</h1>
            <form ref={formRef} onSubmit={handleSaveExperience}>
                <div className='formTwoInputs'>
                    <div className='formTextInput'>
                        <h5>Date from *</h5>
                        <input type="date" name='dateFrom' placeholder='Date from' title='Date From' value={experienceObj.dateFrom || ''} onChange={prepareExperienceObj} />
                    </div>
                    <div className='formTextInput'>
                        <h5>Date to</h5>
                        <input type="date" name='dateTo' placeholder='Date To' title='Date To' value={experienceObj.dateTo || ''} onChange={prepareExperienceObj} />
                    </div>
                </div>
                <div className='formTextInput'>
                    {experienceObj.company && <h5>Job title *</h5>}
                    <input type="text" name='company' placeholder='Job title *' title='Company' value={experienceObj.company || ''} onChange={prepareExperienceObj} />
                </div>
                <div className='formTextInput'>
                    {experienceObj.address && <h5>Work address *</h5>}
                    <input type="text" name='address' placeholder='Work address *' title='Address' value={experienceObj.address || ''} onChange={prepareExperienceObj} />
                </div>
                <div className='formTextInput'>
                    {experienceObj.description && <h5>Description *</h5>}
                    <textarea name='description' placeholder='Description *' title='Description' value={experienceObj.description || ''} onChange={prepareExperienceObj}></textarea>
                </div>
                <button type='submit' disabled={disableBtn}>{experienceObj.id ? 'Update' : 'Save'}</button>
            </form>
        </section>
    )
});

export default Experiences;