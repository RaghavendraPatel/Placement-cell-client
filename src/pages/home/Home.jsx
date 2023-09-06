import './home.scss';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Home = (props) => {
    const Navigate = useNavigate();

    useEffect(() => {
        if(!props.user.email){
            toast.info('Please Sign In to continue');
            Navigate('/signin');
        }
    }, [props.user.email]);

    return  (
        <div className="home">
            <h1>Home</h1>
        </div>
    );
}
export default Home;