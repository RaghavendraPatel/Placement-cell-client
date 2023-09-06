import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate,Link } from "react-router-dom";
import'./signin.scss';
import { useEffect } from "react";

export default function SignUp(props) {

    const Navigate = useNavigate();

    useEffect(() => {
        if(props.user!==undefined){
            Navigate('/');
        }
    }, [props.user]);

    //handle submit
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            name: e.target.name.value,
            email: e.target.email.value,
            password: e.target.password.value,
        }
        if (e.target.password.value !== e.target.confirmPassword.value) {
            toast.error("Password and Confirm Password must be same");
        }
        else {
            axios.post(
                "/employee/create", 
                data,
                {
                    headers:{
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }
            )
            .then(res => res.data)
            .then(data => {
                if(data.success === true){
                    localStorage.setItem('user',JSON.stringify(data.user));
                    toast.success(data.message);
                    Navigate('/signin');
                }
            })
            .catch(err => {
                toast.error(err.response.data.message);
            });
        }
    }

    return (
        <div className="SignUp user-form">
            
            <form onSubmit={handleSubmit}>
                <h1>Signup</h1>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control"
                        id="name" />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control"
                        id="email" />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password"
                        className="form-control" id="password" />
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input type="password"
                        className="form-control" id="confirmPassword" />
                </div>
                <Link to="/signin"><small>Already have an account?</small></Link>
                <button type="submit" className="user-btn">Sign Up</button>
            </form>
        </div>
    )
}