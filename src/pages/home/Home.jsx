import './home.scss';
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AiOutlineSearch } from 'react-icons/ai';
import axios from 'axios';

const Home = (props) => {
    const Navigate = useNavigate();
    const [jobsArr,setJobsArr] = useState([]);
    const searchRef = useRef();

    const base_url = process.env.REACT_APP_API_PATH||'';

    const handleSearch = () => {
        const search = searchRef.current.value;
        const data = {
            what:search
        }
        if(search===''){
            toast.error('Please Enter a valid search');
            return;
        }
        axios.post(
            `${base_url}/jobs/search`, 
            data,
            {
                headers:{
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        )
        .then((response) => {
            console.log(response);
            setJobsArr(response.data.jobs);
        });
    }

    useEffect(() => {
        console.log(process.env.REACT_APP_API_PATH);
        if(!props.user.email){
            toast.info('Please Sign In to continue');
            Navigate('/signin');
        }
        else{
            axios.get(`${base_url}/jobs`).then((response) => {
                console.log(response.data.jobs);
                setJobsArr(response.data.jobs);
            });
        }
    }, [props.user.email]);

    return  (
        <div className="home">
            <div className="header">
                <span>Jobs</span>
                <div className="header-right">
                    <input type="text" placeholder = "Search For Jobs" ref={searchRef}/>
                    <button className="search-button" onClick={handleSearch}>Search</button>
                </div>
            </div>
            <div className="jobs">
                {jobsArr.map((job) => {
                    return (
                        <div className="job-card" key={job.id}>
                            <div className="job-title">{job.title}</div>
                            <div className="job-company">{job.company.display_name}</div>
                            <div className="job-location">{job.location.display_name}</div>
                            <div className="job-salary">Salary: £ {job.salary_max}</div>
                            <div className="job-description">{job.description}</div>
                            <a href={job.redirect_url} target="_blank" rel="noopener noreferrer" className='job-apply'>Apply</a>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
export default Home;