import './homepage-style.scss';
import { Row, Col } from 'react-bootstrap';

import coverimg from '../../gallery/main.svg';

const Homepage = () => {
    return (
        <div id="homepage-container">
            <Row id="homepage-inner">
                <Col xl={7}>            
                    <img id="coverImg" src={coverimg} alt=""/>
                </Col>
                <Col className='text-col' xl={5}>
                    <h1 className='main-heading size32'>Share your opinion with the world</h1>
                    <br/>
                    <p className='size16'>Participate in surveys ranging a variety of topics from sports to politics to education to science. Compare your views with the general ones. 
                    <br/> <br/> Or create your own survey and share among your friends
                    </p>
                    <div className="btn btn-lg">Get started</div>
                </Col>
            </Row>
        </div>
    )
}

export default Homepage;