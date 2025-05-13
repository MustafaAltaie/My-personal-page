const Education = ({
    education,
    index,
    handleDragStart,
    handleDragOver,
    handleDrop,
    prepareUpdate,
    handleDelete,
    deleted
}) => {
    return (
        <div
            className='educationWrapper'
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={e => handleDragOver(e, index)}
            onDrop={handleDrop}
            style={{ transform: `translateX(${deleted === education.id ? '-100%' : '0%'})`, opacity: deleted === education.id ? 0 : 1 }}
        >
            <h3
                className='educationText dottedElement'
                style={{ display: 'flex', justifyContent: 'space-between' }}>{education.title}
                    <div className='flex20'>
                        <span style={{ cursor: 'pointer' }} onClick={() => handleDelete(education.id)}>🗑️</span>
                        <span style={{ cursor: 'pointer' }} onClick={() => prepareUpdate(education)}>🖋️</span>
                    </div>
            </h3>
            <h5 className='educationText5'>{ `${education.dateFrom} - ${education.dateTo ? education.dateTo : 'Pågår'} | ${education.school}, ${education.city} ${education.country && '-'} ${education.country}`}</h5>
            <p className='educationText'>{education.content}</p>
        </div>
    )
}

export default Education;