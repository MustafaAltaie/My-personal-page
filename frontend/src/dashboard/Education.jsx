import { motion } from 'framer-motion';

const Education = ({
    education,
    index,
    handleDragStart,
    handleDragOver,
    handleDrop,
    prepareUpdate,
    handleDelete
}) => {
    return (
        <motion.div
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
            <h3
                className='educationText dottedElement'
                style={{ display: 'flex', justifyContent: 'space-between' }}>{education.title}
                    <div className='flex20'>
                        <span style={{ cursor: 'pointer' }} onClick={() => handleDelete(education._id)}>🗑️</span>
                        <span style={{ cursor: 'pointer' }} onClick={() => prepareUpdate(education)}>🖋️</span>
                    </div>
            </h3>
            <h5 className='educationText5'>{ `${education.dateFrom} - ${education.dateTo} | ${education.school}, ${education.city} - ${education.country}`}</h5>
            <p className='educationText'>{education.content}</p>
        </motion.div>
    )
}

export default Education;