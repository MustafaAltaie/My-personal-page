
const ProjectsSettingsProject = (props) => {
    return (
        <div
            className="project flexColumn"
            draggable
            onDragStart={() => props.handleDragStart(index)}
            onDragOver={e => props.handleDragOver(e, index)}
            onDrop={props.handleDrop}
        >
            {props.project.isProfessional &&
            <i className="fa-solid fa-briefcase projectLabel"></i>}
            <div className='flexColumn projectUpperPart'>
                <div>
                    <h3><span>{props.project.title}</span></h3>
                    <h1><i className="fa-brands fa-github"></i></h1>
                </div>
                <p>{props.project.content}</p>
                <ul className='projectTechStack flexColumn'>
                    <h5><span>Teknikstack som användes i denna applikation</span></h5>
                    {props.project.techStack.map(tech =>
                        <li key={tech}>{tech}</li>
                    )}
                </ul>
            </div>
            <div className='projectLowerPart'>
                <h6>Skapad: {props.project.createdDate}</h6>
                <button>Visa på GitHub<i className="fa-solid fa-arrow-right"></i></button>
            </div>
        </div>
    )
}

export default ProjectsSettingsProject