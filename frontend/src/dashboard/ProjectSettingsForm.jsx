
const ProjectSettingsForm = (props) => {
    return (
        <form ref={props.formRef} onSubmit={props.handleCreateProject}>
            <div className='formTextInput'>
                <h5>Title *</h5>
                <input type="text" placeholder='Title *' title='Title' name='title' value={props.project.title || ''} onChange={props.prepareProject} />
            </div>
            <div className='formTextInput'>
                <h5>Created date</h5>
                <input type="date" placeholder='Created date' title='Created date' name='createdDate' value={props.project.createdDate || ''} onChange={props.prepareProject} />
            </div>
            <div className='formTextInput'>
                <h5>Content *</h5>
                <input type="text" placeholder='Content *' title='Content' name='content' value={props.project.content || ''} onChange={props.prepareProject} />
            </div>
            <div className='formTextInput'>
                <h5>App link</h5>
                <input type="text" placeholder='App link' title='App link' name='appLink' value={props.project.appLink || ''} onChange={props.prepareProject} />
            </div>
            {props.project.techStack.length > 0 &&
            <ul>
                {props.project.techStack.map(techStack =>
                    <li
                        key={techStack}
                        className={`
                            ${techStack === props.existedTech ? 'projectThisTech' : ''}
                            ${techStack === props.addedTech ? 'projectAddedTech' : ''}
                            ${techStack === props.deletedTech ? 'projectDeletedTech' : ''}
                        `}
                    >
                        {techStack} <span onClick={() => props.handleDeleteTech(techStack)}>🗑️</span>
                    </li>
                )}
            </ul>}
            <div className='formTextInput'>
                <h5>Tech stack</h5>
                <div style={{ display: 'flex', gap: '15px' }}>
                    <input
                        ref={props.techRef}
                        type="text"
                        placeholder='Tech stack'
                        title='Tech stack'
                        name='techStack'
                        value={props.tech || ''}
                        onChange={e => props.setTech(e.target.value)} style={{ width: '100%' }}
                        onKeyDown={e => e.key === 'Enter' && props.prepareProjectList}
                    />
                    {props.tech.trim() &&
                    <button style={{ width: '20%' }} type='button' onClick={() => props.prepareProjectList(props.tech)}>Add</button>}
                </div>
            </div>
            <label>
                <input type="checkbox" checked={props.project.isProfessional}
                onChange={() => props.setProject(prev => ({
                    ...prev, isProfessional: !prev.isProfessional
                }))} /> Professional project
            </label>
            <div style={{ display: 'flex', gap: '15px' }}>
                <button style={{ width: '100%' }} type='submit'>Save</button>
                {(props.project.title || props.project.content || props.project.createdDate || props.project.title || props.project.title ||  props.project.techStack.length > 0 || props.project.appLink || props.project.isProfessional) &&
                <button style={{ width: '20%' }} type='button' onClick={() => props.clearFields()}>Clear</button>}
            </div>
        </form>
    )
}

export default ProjectSettingsForm;