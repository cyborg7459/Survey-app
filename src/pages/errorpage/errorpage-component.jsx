import { withRouter } from 'react-router-dom';

import './errorpage-styles.scss';
import errorImg from '../../gallery/Scarecrow.png'

const ErrorPage = (...props) => {
    return (
        <div id='error-page' className="full-screen">
            <div className="custom-shape-divider-bottom-1620380295" >
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" class="shape-fill"></path>
                </svg>
            </div>
            <div className="error-inner">
                <img src={errorImg} className='mb-5'/>
                <h1 className='text-center mx-5 mb-0'>OOPS !!! WE ARE UNABLE TO FIND WHAT YOU'RE LOOKING FOR</h1>
                <button onClick = {() => {
                    props[0].history.push('/');
                }} className='btn'>Return to homepage</button>
            </div>    
        </div>
    )
}

export default withRouter(ErrorPage);