import '../styles/home.css';
import { motion } from 'framer-motion';
import { forwardRef } from 'react';

const Home = forwardRef((props, ref) => {
    return (
        <section ref={ref} className="homeSection">
            <div className="homeImageWrapper">
                <img src={props.darkMode ? 'https://cdn.pixabay.com/photo/2023/04/28/07/16/man-7956041_1280.jpg' : 'https://cdn.pixabay.com/photo/2016/03/26/14/43/young-1280694_1280.jpg'} alt="homeImage" />
            </div>
            <motion.div
                className='homeProfileWrapper'
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, ease: 'easeInOut' }}
                viewport={{ once: true, amount: 0 }}
            >
                <h1>Profile</h1>
                <p>I'm a full-stack JavaScript developer passionate about building scalable, responsive web applications from front to back. I specialize in crafting clean, maintainable code using the MERN stack (MongoDB, Express, React, Node.js), with strong attention to performance, accessibility, and user experience. I’ve developed and deployed full-featured applications, including dashboards, e-commerce platforms, REST APIs, and modern SPAs. Whether building a project from scratch or optimizing existing codebases, I aim for elegant solutions and seamless functionality.</p>
            </motion.div>
        </section>
    )
});

export default Home;