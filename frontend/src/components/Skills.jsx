import { useState } from 'react';
import '../styles/skills.css';
import { motion } from 'framer-motion';

const Skills = () => {
    const [frontendList, setFrontendList] = useState([
        { title: 'React.js', description: '(including Hooks, Context API, and Functional Components)' },
        { title: 'Next.js', description: '(Server-side rendering, Static site generation, API routes, File-based routing)' },
        { title: 'Redux', description: '(State management, Action creators, Reducers, Thunk)' },
        { title: 'RTK Query', description: '(Efficient data fetching, Caching, and API integration with Redux)' },
        { title: 'JavaScript (ES6+)', description: '(Async/Await, Promises, Arrow functions, Destructuring)' },
        { title: 'CSS3 / HTML5', description: '(Responsive design, Flexbox, Grid, Media Queries)' },
    ]);
    const [backendList, setBackendList] = useState([
        { title: 'Node.js', description: '(Server-side JavaScript runtime, REST API development)' },
        { title: 'Express.js', description: '(Web framework for building RESTful APIs)' },
        { title: 'MongoDB', description: '(NoSQL database, Mongoose ORM for managing data models)' },
        { title: 'GraphQL', description: '(API querying language for optimized data fetching)' },
        { title: 'PostgreSQL', description: '(SQL database, pgAdmin)' },
    ]);
    const [otherList, setOtherList] = useState([
        { title: 'Redux Toolkit', description: '(Modern Redux with less boilerplate, RTK Query for data fetching)' },
        { title: 'Git', description: '(Version control, Branching, Merging, Rebase)' },
        { title: 'Postman', description: '(API testing and documentation)' },
        { title: 'Agile', description: '(Scrum, Sprint Planning, Jira)' },
        { title: 'CI/CD', description: '(Continuous Integration, Continuous Deployment using GitHub Actions, Jenkins)' },
        { title: 'RESTful API Design', description: '(CRUD operations, Authorization, and Authentication)' },
        { title: 'Version Control with Git', description: '(Collaboration and managing feature branches)' },
    ]);
    const [softList, setSoftList] = useState([
        { title: 'Svenska & Engelska', description: 'Mycket goda kommunikativa färdigheter i tal och skrift' },
        { title: 'Samarbetsförmåga / problemlösning', description: 'Är bekväm att jobba i grupp eller självständigt och har mycket bra problemlösningsförmåga' },
        { title: 'Adaptability', description: 'Quick to learn and implement new technologies' },
    ]);
    const [draggedIndex, setDraggedIndex] = useState(null);

    const handleDragStart = (index) => {
        setDraggedIndex(index);
    }

    const handleDragOver = (event, index, list, set) => {
        event.preventDefault();
        if (draggedIndex === null || draggedIndex === index) return;
        const newList = [...list];
        const draggedItem = newList[draggedIndex];
        newList.splice(draggedIndex, 1);
        newList.splice(index, 0, draggedItem);
        setDraggedIndex(index);
        set(newList);
    }

    const handleDrop = () => {
        setDraggedIndex(null);
    }

    return (
        <section className='skillSection'>
            <motion.h1
                className='sectionTitle'
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true, amount: 0.4 }}
            ><i className="fa-solid fa-user-gear"></i>Kunskaper</motion.h1>
            <div className='skillsMainWrapper flexColumn'>
                {/* Frontend */}
                <div className="skillsContainer">
                    <h3 className='skillMainTitle'>Frontend-utveckling</h3>
                    {frontendList.map((frontendSkill, index) => 
                    <motion.div
                        key={index}
                        className="skill"
                        initial={{ opacity: 0, x: -100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true, amount: 0.3 }}
                        draggable
                        onDragStart={() => handleDragStart(index)}
                        onDragOver={e => handleDragOver(e, index, frontendList, setFrontendList)}
                        onDrop={handleDrop}
                    >
                        <p><span>{frontendSkill.title}: </span>{frontendSkill.description}</p>
                    </motion.div>
                    )}
                </div>
                {/* Backend */}
                <div className="skillsContainer">
                    <h3 className='skillMainTitle'>Backend-utveckling</h3>
                    {backendList.map((backendSkill, index) => 
                    <motion.div
                        key={index}
                        className="skill"
                        initial={{ opacity: 0, x: 100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true, amount: 0.3 }}
                        draggable
                        onDragStart={() => handleDragStart(index)}
                        onDragOver={e => handleDragOver(e, index, backendList, setBackendList)}
                        onDrop={handleDrop}
                    >
                        <p><span>{backendSkill.title}: </span>{backendSkill.description}</p>
                    </motion.div>
                    )}
                </div>
                {/* Other skills */}
                <div className="skillsContainer">
                    <h3 className='skillMainTitle'>Andra kunskaper</h3>
                    {otherList.map((otherSkill, index) => 
                    <motion.div
                        key={index}
                        className="skill"
                        initial={{ opacity: 0, scale: 1.4 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true, amount: 0.3 }}
                        draggable
                        onDragStart={() => handleDragStart(index)}
                        onDragOver={e => handleDragOver(e, index, otherList, setOtherList)}
                        onDrop={handleDrop}
                    >
                        <p><span>{otherSkill.title}: </span>{otherSkill.description}</p>
                    </motion.div>
                    )}
                </div>
                {/* Soft skills */}
                <div className="skillsContainer">
                    <h3 className='skillMainTitle'>Mjuka kunskaper</h3>
                    {softList.map((softSkill, index) => 
                    <motion.div
                        key={index}
                        className="skill"
                        initial={{ opacity: 0, scale: 0.6 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true, amount: 0.3 }}
                        draggable
                        onDragStart={() => handleDragStart(index)}
                        onDragOver={e => handleDragOver(e, index, softList, setSoftList)}
                        onDrop={handleDrop}
                    >
                        <p><span>{softSkill.title}: </span>{softSkill.description}</p>
                    </motion.div>
                    )}
                </div>
            </div>
        </section>
    )
}

export default Skills;