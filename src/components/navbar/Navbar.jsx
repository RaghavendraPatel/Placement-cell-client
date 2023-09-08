import logo from '../../logo.svg';
import './navbar.scss';
import {FaUserAstronaut} from 'react-icons/fa';
import {FiLogOut} from 'react-icons/fi';
const Navbar = (props)=>{
    return(
        <div className="Navbar">
            <div className="logo">
                <img src = {logo} alt="logo" />
                <span>Placement Cell</span>
            </div>
            <div className="nav-user">
                <i><FaUserAstronaut/></i>
                <span>{props.user.name||'Guest'}</span>
            </div>
        </div>
    );
}
export default Navbar;