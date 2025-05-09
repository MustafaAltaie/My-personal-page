import { useState } from 'react';
import '../styles/project.css';

const Projects = () => {
    const [list, setList] = useState([
        { title: 'Trafikskola app', content: 'Jag utvecklade applikationen med hjälp av MongoDB, Express, React.js och Node.js (MERN-stack). För state management och effektiv datahämtning använde jag Redux och RTK Query. Applikationen innehåller ett administrativt dashboard där ägaren kan skapa, uppdatera och ta bort innehåll.' },
        { title: 'E-handelsapplikation', content: 'Jag utvecklade denna e-handelsapplikation som ett hobbyprojekt med hjälp av MERN-stacken (MongoDB, Express, React.js, Node.js), samt Redux och RTK Query för state management och datahämtning. Applikationen är byggd för att beställa elektronikprodukter online och innehåller ett administrativt dashboard där man kan skapa, uppdatera och radera produkter.' },
        { title: '', content: '' },
        { title: '', content: '' },
        { title: '', content: '' },
        { title: '', content: '' },
    ]);

    return (
        <section className="projectSection">
            <h1 className="sectionTitle"><i className="fa-brands fa-node-js"></i>Projekt</h1>
            <p>Här är några webbappar som jag utvecklat på fritiden, under skoltiden eller i yrkeslivet – de finns tillgängliga på GitHub.</p>
            <div className="projectMainWrapper">
                {/* Project */}
                {list.map((project, index) => project.title && 
                <div key={index} className="project flexColumn">
                    <div className='flexColumn'>
                        <div>
                            <h3>{project.title}</h3>
                            <h1><i className="fa-brands fa-github"></i></h1>
                        </div>
                        <p>{project.content}</p>
                    </div>
                    <button>Gå till GitHub<i className="fa-solid fa-arrow-right"></i></button>
                </div>)}
            </div>
        </section>
    );
}

export default Projects;