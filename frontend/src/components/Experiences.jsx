import { useState, forwardRef, useEffect } from 'react';
import '../styles/experience.css';
import { motion } from 'framer-motion';
import { useReadExperienceQuery } from '../features/portfolioApi.js';

const Experiences = forwardRef((props, ref) => {
    const [list, setList] = useState([]);
    const { data: experiences, isLoading } = useReadExperienceQuery();

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

    return (
        <section ref={ref} className="experienceSection">
            <motion.h1
                className="sectionTitle"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true, amount: 0.4 }}
            ><i className="fa-solid fa-briefcase"></i>Arbetslivserfarenhet</motion.h1>
            <div className="experienceMainWrapper flexColumn">
                {/* Experience */}
                {list.map((experience, index) => 
                <div key={index} className="experience">
                    <motion.div
                        className="experienceColumn1"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7 }}
                        viewport={{ once: true, amount: 0 }}
                    >
                        <div>
                            <h5>{experience.company}</h5>
                            <h5>{experience.address}</h5>
                        </div>
                    </motion.div>
                    <motion.div
                        className="experienceColumn2 dottedElement"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7 }}
                        viewport={{ once: true, amount: 0 }}

                    >
                        <div>
                            <p>{experience.dateFrom} - {experience.dateTo ? experience.dateTo : 'Pågår'}</p>
                            <p>{experience.description}</p>
                        </div>
                    </motion.div>
                </div>)}
            </div>
        </section>
    )
});

export default Experiences;