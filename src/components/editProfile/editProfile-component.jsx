import React from 'react';

import './editProfile-styles.scss';

class EditProfileDialogue extends React.Component {
    render() {
        return (
            <div className="black-overlay">
                <div id="edit-dialogue">
                    <div className="heading d-flex justify-content-between align-items-center">
                        <h4>Edit your profile</h4>
                        <span style={{cursor: "pointer"}} onClick={this.props.hide} className='size17 mb-2'>&times;</span>
                    </div>
                    <hr className='mt-0 mb-4'/>
                    <div className='mb-4'>
                        <strong className='size11'>Display name : </strong>
                        <input type="text" className='input' defaultValue={this.props.user.name} />
                    </div>
                    <div>
                        <strong className='size11 mr-4'>Profile image : </strong>
                        <input type="file" accept="image/png, image/jpeg" />
                    </div>
                    <div className='btn mt-5'>Save changes</div>
                </div>
            </div>
        )
    }
}

export default EditProfileDialogue;