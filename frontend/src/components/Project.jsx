import { motion } from 'framer-motion';

const Project = ({ project }) => {
    return (
        <div className="project flexColumn">
            {project.isProfessional &&
            <i className="fa-solid fa-briefcase projectLabel"></i>}
            <div className='flexColumn projectUpperPart'>
                <div>
                    <motion.h3
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true, amount: 0.4 }}
                    ><span>{project.title}</span></motion.h3>
                    <h1><i className="fa-brands fa-github"></i></h1>
                </div>
                <motion.p
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true, amount: 0.4 }}
                >{project.content}</motion.p>
                <ul className='projectTechStack flexColumn'>
                    <h5><span>Teknikstack som användes i denna applikation</span></h5>
                    {project.techStack.map(tech =>
                        <motion.li
                            key={tech}
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true, amount: 0.4 }}
                        >{tech}</motion.li>
                    )}
                </ul>
            </div>
            <div className='projectLowerPart'>
                <h6>Skapad: {project.createdDate}</h6>
                <button>Visa på GitHub<i className="fa-solid fa-arrow-right"></i></button>
            </div>
        </div>
    )
}

export default Project;