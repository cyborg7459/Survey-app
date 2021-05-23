import React from 'react';
import {Row, Col} from 'react-bootstrap';

import './profilepage-styles.scss';

class ProfilePage extends React.Component {
    render() {
        return (
            <div className="page-container">
                <div className="page-inner">
                    <h1>Hello World</h1>
                    <h5>This is the profile page</h5>
                </div>
            </div>
        )
    }
}

export default ProfilePage;