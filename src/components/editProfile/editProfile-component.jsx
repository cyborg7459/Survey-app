import React from 'react';
import { connect } from 'react-redux';

import { firestore } from '../../firebase/firebase.utils';
import { setUser } from '../../redux/users/user-actions';
import Loader from '../loader/loader.component';
import './editProfile-styles.scss';

class EditProfileDialogue extends React.Component {

    state = {
        isLoading : false
    }

    updateUser = async () => {
        this.setState({
            isLoading : true
        })
        const newName = document.getElementById('new-name').value;
        const userRef = firestore.collection('users').doc(this.props.user.id);
        await userRef.update({
            name: newName
        });
        const userSnap = await userRef.get();
        const user = {
            ...userSnap.data(),
            id : userRef.id
        }
        this.props.setUser(user);
        this.props.hide();
    }

    render() {
        return (
            <div className="black-overlay">
                {
                    this.state.isLoading ? <Loader text = "Updating user details" /> : null
                }
                <div id="edit-dialogue">
                    <div className="heading d-flex justify-content-between align-items-center">
                        <h4>Edit your profile</h4>
                        <span style={{cursor: "pointer"}} onClick={this.props.hide} className='size17 mb-2'>&times;</span>
                    </div>
                    <hr className='mt-0 mb-4'/>
                    <div className='mb-4'>
                        <strong className='size11'>Display name : </strong>
                        <input id='new-name' type="text" className='input' defaultValue={this.props.user.name} />
                    </div>
                    <div>
                        <strong className='size11 mr-4'>Profile image : </strong>
                        <input type="file" accept="image/png, image/jpeg" />
                    </div>
                    <div onClick={this.updateUser} className='btn mt-5'>Save changes</div>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    setUser : user => dispatch(setUser(user))
})

export default connect(null, mapDispatchToProps)(EditProfileDialogue);