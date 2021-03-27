import './header-style.scss';
import { withRouter } from 'react-router-dom';

const Header = (...props) => {
    return (
        <div id="header-container">
            <div id="header">
                <span onClick={() => {
                    props[0].history.push('/');
                }} style={{cursor : 'pointer'}} className='size20'>What's your opinion ?</span>
            </div>
        </div>
    )
}

export default withRouter(Header);