import { useState, forwardRef, useEffect } from 'react';
import '../styles/education.css';
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
                <h1 className='educationText'><i className="fa-solid fa-user-graduate"></i>Utbildningar</h1>
                <br />
                {isLoading && <p>Loading...</p>}
                {list.map((education, index) => 
                <div key={index} className='educationWrapper'>
                    <h3 className='educationText dottedElement'>{education.title}</h3>
                    <h5 className='educationText5'>{education.date}</h5>
                    <p className='educationText'>{education.content}</p>
                </div>
                )}
            </div>
        </section>
    )
});

export default Educations;