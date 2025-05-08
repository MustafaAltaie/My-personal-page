import '../styles/education.css';
import { motion } from 'framer-motion';

const Educations = ({ darkMode }) => {
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
                <motion.div
                    className='educationWrapper'
                    initial={{ opacity: 0, x: -150 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true, amount: 0.4 }}
                >
                    <h3 className='educationText'>Fullstack - JavaScript | Yrkeshögskoleutbildning</h3>
                    <h5 className='educationText5'>2023-09 - 2025-06 | Chas Academy, Linköping</h5>
                    <p className='educationText'>Jag studerade Fullstack JavaScript-utveckling på distans vid Chas Academy. Utbildningen var 100%. Studierna bedrevs både på svenska och engelska.</p>
                </motion.div>
                <motion.div
                    className='educationWrapper'
                    initial={{ opacity: 0, x: 150 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true, amount: 0.4 }}
                >
                    <h3 className='educationText'>4-årig kandidatexamen inom IT</h3>
                    <h5 className='educationText5'>2012-09 - 2015-12 | Al-Rafidain universitet, Irak</h5>
                    <p className='educationText'>Jag studerade 4 år på fakulteten för datateknik. Utbildningen är validerad och godkänd i Sverige av UHR.</p>
                </motion.div>
            </div>
            <div className="educationIconWrapper flexMiddle">
                <img src={darkMode ? "../../public/images/educationDark.png" : "../../public/images/educationLight.png"} alt="Education" />
            </div>
        </section>
    )
}

export default Educations;