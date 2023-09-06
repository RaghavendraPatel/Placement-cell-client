import './footer.scss'
import {AiFillGithub} from 'react-icons/ai'
const Footer = ()=>{
    return(
        <div className="Footer">
            <a href="https://github.com/RaghavendraPatel" target="_blank">
                <div className="footer-left">
                <i><AiFillGithub/></i><span>Raghavendra Patel</span>
                </div>
            </a>
            <div className="footer-right">
                <span>@ Placement Cell Dashboard</span>
            </div>
        </div>
    );
}
export default Footer;