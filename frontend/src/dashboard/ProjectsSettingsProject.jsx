
const ProjectsSettingsProject = (props) => {
    return (
        <div
            className="project flexColumn"
            draggable
            onDragStart={() => props.handleDragStart(props.index)}
            onDragOver={e => props.handleDragOver(e, props.index)}
            onDrop={props.handleDrop}
            style={{ paddingTop: '40px' }}
        >
            {props.project.isProfessional &&
            <i className="fa-solid fa-briefcase projectLabel"></i>}
            <div className='flexColumn projectUpperPart'>
                <div className='toolsWrapper' style={{ position: 'absolute', top: '10px', left: '20px' }}>
                    <span onClick={() => props.handlePrepareUpdate(props.project)}>🖋️</span>
                    <span onClick={() => props.handleDeleteProject(props.project.id)}>🗑️</span>
                </div>
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
                <h6>Skapad: {new Date(props.project.createdDate).toLocaleDateString()}</h6>
                <button>Visa på GitHub<i className="fa-solid fa-arrow-right"></i></button>
            </div>
        </div>
    )
}

export default ProjectsSettingsProject;