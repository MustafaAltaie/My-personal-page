import { motion } from 'framer-motion';

const SkillsSettingsFrontend = ({
    frontendSkill,
    index,
    handleDragStart,
    handleDragOver,
    handleDrop,
    frontendList,
    setFrontendList,
    prepareFrontendUpdate,
    handleDeleteFrontSkill,
}) => {

    return (
        <>
        <motion.div
            className="skill dottedElement"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.3 }}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={e => handleDragOver(e, index, frontendList, setFrontendList)}
            onDrop={handleDrop}
        >
            <p><span style={{ color: '#a70' }}>{frontendSkill.title}: </span>{frontendSkill.description}</p>
            <span style={{ cursor: 'pointer', marginLeft: '10px' }} onClick={() => prepareFrontendUpdate(frontendSkill)}>🖋️</span>
            <span style={{ cursor: 'pointer', marginLeft: '10px' }} onClick={() => handleDeleteFrontSkill(frontendSkill.id)}>🗑️</span>
        </motion.div>
        </>
    )
}

export default SkillsSettingsFrontend;