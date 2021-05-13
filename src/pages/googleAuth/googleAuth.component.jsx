import { withRouter } from "react-router"

const GoogleAuth = () => {
    return (
        <div className='pt-5'>
            <button className='mt-5 btn ml-5'>Register with Google</button>
            <button className='btn mt-5 ml-5'>Sign in with Google</button>
        </div>
    )
}

export default withRouter(GoogleAuth);