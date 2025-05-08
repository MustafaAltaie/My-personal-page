import { useState } from 'react';
import '../styles/education.css';
import { motion } from 'framer-motion';

const Educations = ({ darkMode }) => {
    const [list, setList] = useState([
        {
            title: 'Fullstack - JavaScript | Yrkeshögskoleutbildning',
            date: '2023-09 - 2025-06 | Chas Academy, Linköping',
            content: 'Jag studerade Fullstack JavaScript-utveckling på distans vid Chas Academy. Utbildningen var 100%. Studierna bedrevs både på svenska och engelska.'
        },
        {
            title: '4-årig kandidatexamen inom IT',
            date: '2012-09 - 2015-12 | Al-Rafidain universitet, Irak',
            content: 'Jag studerade 4 år på fakulteten för datateknik. Utbildningen är validerad och godkänd i Sverige av UHR.'
        }
    ]);
    const [draggedIndex, setDraggedIndex] = useState(null);

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

    return (
        <section className="educationSection">
            <div className='educationMainWrapper'>
                <motion.h1
                    className='educationText'
                    initial={{ opacity: 0, x: -100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true, amount: 0.4 }}
                ><i className="fa-solid fa-user-graduate"></i>Utbildningar</motion.h1>
                <br /><br />
                {list.map((education, index) => 
                <motion.div
                    key={index}
                    className='educationWrapper'
                    initial={{ opacity: 0, x: -150 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true, amount: 0.4 }}
                    draggable
                    onDragStart={() => handleDragStart(index)}
                    onDragOver={e => handleDragOver(e, index)}
                    onDrop={handleDrop}
                >
                    <h3 className='educationText'>{education.title}</h3>
                    <h5 className='educationText5'>{education.date}</h5>
                    <p className='educationText'>{education.content}</p>
                </motion.div>
                )}
            </div>
            <div className="educationIconWrapper flexMiddle">
                <img src={darkMode ? "../../public/images/educationDark.png" : "../../public/images/educationLight.png"} alt="Education" />
            </div>
        </section>
    )
}

export default Educations;