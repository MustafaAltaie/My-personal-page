import { useState, forwardRef, useEffect } from 'react';
import '../styles/education.css';
import { motion } from 'framer-motion';
import { useReadEducationQuery } from '../features/portfolioApi.js';

const Educations = forwardRef((props, ref) => {
    const { data: educations, isLoading } = useReadEducationQuery();
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
                <br />
                {isLoading && <p>Loading...</p>}
                {list.map((education, index) => 
                <motion.div
                    key={index}
                    className='educationWrapper'
                    initial={{ opacity: 0, x: -150 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true, amount: 0.4 }}
                >
                    <h3 className='educationText dottedElement'>{education.title}</h3>
                    <h5 className='educationText5'>{education.date}</h5>
                    <p className='educationText'>{education.content}</p>
                </motion.div>
                )}
            </div>
        </section>
    )
});

export default Educations;