import { toast } from 'react-toastify';
import'./signin.scss';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useEffect } from 'react';

const SignIn = (props) => {

    const navigate = useNavigate();

    useEffect(() => {
        if(props.user.email){
            navigate('/');
        }
    }, []);

    //handle submit
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            email: e.target.email.value,
            password: e.target.password.value
        }
    
        axios
        .post(
            'https://palcement-cell-server.onrender.com/employee/create-session', 
            data,
            {
                headers:{
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                withCredentials: true
            }
        )
        .then(res => {
            console.log(res);
            return res.data;
        })
        .then(data => {
            if(data.success === true){
                toast.success(data.message);
                localStorage.setItem('user',JSON.stringify({id:data.user._id,name:data.user.name,email:data.user.email}));
                props.setActiveUser(data.user);
                navigate('/');
            }
            else{
                toast.error("Error in Sign In, Invalid Credentials");
            }
        })
        .catch(err => {
            toast.error(err.response.data.message);
        })
    }
    return (
        <div className='SignIn user-form'>
            
            <form onSubmit={handleSubmit}>
                <h1>Sign In</h1>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" className="form-control"
                        id="email" />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password"
                        className="form-control" id="password" />
                </div>
                <Link to="/signup"><small>Don't have an account?</small></Link>
                <button type="submit" className="user-btn">Sign In</button>
            </form>
        </div>
    );  
}
export default SignIn;