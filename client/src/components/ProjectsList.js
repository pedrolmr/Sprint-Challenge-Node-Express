import React from 'react';

const ProjectsList = (props) => {
    return(
        <div>
            {props.projects.map(project => {
                return(
                    <div>
                        <h3>{project.name}</h3>
                        <p>{project.description}</p>
                    </div>
                );
            })}
        </div>
    );
}

export default ProjectsList;