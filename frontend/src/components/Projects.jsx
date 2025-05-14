import { useState, forwardRef, useEffect } from 'react';
import '../styles/project.css';
import Project from './Project';
import { useReadProjectsQuery } from '../features/portfolioApi';

const Projects = forwardRef((props, ref) => {
    const [list, setList] = useState([]);
    const { data: projects, isLoading } = useReadProjectsQuery();

    useEffect(() => {
        if(Array.isArray(projects) && !isLoading) {
            const transformed = projects.map(project => ({
                id: project._id,
                title: project.title,
                createdDate: project.createdDate,
                content: project.content,
                techStack: project.techStack,
                appLink: project.appLink,
                isProfessional: project.isProfessional,
            }));
            setList(transformed);
        }
    }, [projects, isLoading]);

    return (
        <section ref={ref} className="projectSection">
            <h1 className="sectionTitle"><i className="fa-brands fa-node-js"></i>Projekt</h1>
            <p><span>Här är några webbappar som jag utvecklat på fritiden, under skoltiden eller i yrkeslivet – de finns tillgängliga på GitHub.<br />Projekt med<i className="fa-solid fa-briefcase"></i>ikonen är yrkesprojekt som jag har utvecklat i arbetssammanhang.</span></p>
            <div className="projectMainWrapper">
                {isLoading && <p>Loading...</p>}
                {/* Project */}
                {list.map((project, index) => project.title &&
                    <Project key={index} project={project} />
                )}
            </div>
        </section>
    )
});

export default Projects;