import{Link} from 'react-router-dom';
import './menu.scss';
import{AiOutlineHome} from 'react-icons/ai';
import{PiStudentLight} from 'react-icons/pi';
import{BiSolidReport} from 'react-icons/bi';
import{AiOutlineComment} from 'react-icons/ai';
import{FiLogOut} from 'react-icons/fi';
import{IoSettingsOutline} from 'react-icons/io5';
const Menu = (props) => {
    return (
        <div className="menu">
            <div className="menu-items">
                <Link to ="/" className="menu-item">
                    <i><AiOutlineHome/></i>
                    <span>Home</span>
                </Link>
                <Link to ="/students" className="menu-item">
                    <i><PiStudentLight/></i>
                    <span>Students</span>
                </Link>
                <Link to ="/interview" className="menu-item">
                    <i><AiOutlineComment/></i>
                    <span>Interview</span>
                </Link>

                <Link to ="/report" className="menu-item">
                    <i><BiSolidReport/></i>
                    <span>Report</span>
                </Link>
            </div>
            <div className="menu-items menu-bottom">
                <div className="menu-item">
                    <i><IoSettingsOutline/></i>
                    <span>Settings</span>
                </div>
                <div className="menu-item" onClick={props.logout}>
                    <i><FiLogOut/></i>
                    <span>Logout</span>
                </div>
            </div>
        </div>
    );
}
export default Menu;