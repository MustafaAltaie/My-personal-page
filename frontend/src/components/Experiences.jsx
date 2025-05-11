import { useState, forwardRef } from 'react';
import '../styles/experience.css';
import { motion } from 'framer-motion';

const Experiences = forwardRef((props, ref) => {
    const [list, setList] = useState([
        { company: 'IT Ansvarig Karthago Matchning AB', address: 'Katrineholm, Flen och Vingåker', date: '2023.10 - pågår', description: 'Ansvarar för installation, konfiguration och reparation av datorsystem och hårdvara. Tillhandahåller teknisk support till användare, felsöker problem och säkerställer en effektiv drift av IT-utrustning.' },
        { company: 'Programmerare / Skolvärd', address: 'Järvenskolan-Katrineholm', date: '2020.03 – 2021.03', description: 'Utvecklade en app för skolans elever där de kunde beställa mat från skolans cafeteria. Använde Node.js, Express, MongoDB, JavaScript, HTML5 och CSS3 för att bygga appen.' },
        { company: 'Frilansande Webb­utvecklare', address: 'På distans', date: '2018.03 – 2020.03', description: 'Arbetade på olika projekt för kunder, med fokus på fullstackutveckling. Levererade kundanpassade lösningar inom både frontend- och backend-utveckling.' },
        { company: 'IT-tekniker', address: 'Saja Bibliotek - Irak, Bagdad', date: '2013.02 – 2015.12', description: 'Utförde frontendutveckling med HTML, CSS och JavaScript. Hjälpte till med underhåll och förbättringar av bibliotekets digitala system.' },
        { company: 'Frilansfotograf', address: 'Mustafa Photography - Irak, Bagdad', date: '2008.06 – 2013.01', description: 'Fotograferade och videofilmade vid evenemang som bröllop, fester och dop. Arbetade med redigering och efterbearbetning av bilder i Photoshop.' },
    ]);

    const [draggedIndex, setDraggedIndex] = useState(null);

    const handleDragStart = (index) => {
        setDraggedIndex(index);
    }

    const handleDragOver = (event, index) => {
        event.preventDefault();
        if (draggedIndex === null || draggedIndex === index) return;
        const newList = [...list];
        const draggedItem = newList[draggedIndex];
        newList.splice(draggedIndex, 1);
        newList.splice(index, 0, draggedItem);
        setDraggedIndex(index);
        setList(newList);
    }

    const handleDrop = () => {
        setDraggedIndex(null);
    }

    return (
        <section ref={ref} className="experienceSection">
            <motion.h1
                className="sectionTitle"
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true, amount: 0.4 }}
            ><i className="fa-solid fa-briefcase"></i>Arbetslivserfarenhet</motion.h1>
            <div className="experienceMainWrapper flexColumn">
                {/* Experience */}
                {list.map((experience, index) => 
                <div
                    key={index}
                    className="experience"
                    draggable
                    onDragStart={() => handleDragStart(index)}
                    onDragOver={e => handleDragOver(e, index)}
                    onDrop={handleDrop}
                >
                    <motion.div
                        className="experienceColumn1"
                        initial={{ opacity: 0, x: -100 }}
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
                        initial={{ opacity: 0, x: 100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7 }}
                        viewport={{ once: true, amount: 0 }}

                    >
                        <div>
                            <p>{experience.date}</p>
                            <p>{experience.description}</p>
                        </div>
                    </motion.div>
                </div>)}
            </div>
        </section>
    )
});

export default Experiences;