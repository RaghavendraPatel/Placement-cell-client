import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

import './interview.scss';

import InterviewForm from '../../components/form/InterviewForm';
import InterviewCard from '../../components/card/InterviewCard';
const Interview = (props) => {
    const Navigate = useNavigate();

    const [interviewsArr,setInterviewsArr]= useState([]);
    const [formVisible,setFormVisible] = useState(false);
    const [editForm,setEditForm] = useState(false);
    const [editInterview,setEditInterview] = useState({});
    const [studentsArr,setStudentsArr] = useState([]);
    
    const base_url = process.env.REACT_APP_API_PATH||'';
    
    const fetchInterviews = () => {
        axios.get(`${base_url}/interview`,{withCredentials:true}).then((response) => {
            console.log(response.data);
            setInterviewsArr(response.data.interviews);
        }).catch((err) => {
            if(err.response.status===401){
                props.logout();
                toast.info('Session expired, Please Sign In to continue');
                Navigate('/signin');
            }
        });
    }

    const fetchStudents = () => {
        axios.get(`${base_url}/student`,{withCredentials:true}).then((response) => {
            console.log(response.data);
            setStudentsArr(response.data.students);
        }).catch((err) => {
            if(err.response.status===401){
                props.logout();
                toast.info('Session expired, Please Sign In to continue');
                Navigate('/signin');
            }
        });
    }

    const handleEdit = (interview) => {
        setEditForm(true);
        setEditInterview(interview);
        toggleForm();
    }

    const handleDelete = (id) => {
        console.log(id);
        axios.delete(`${base_url}/interview/delete/${id}`,{withCredentials:true}).then((response) => {
            console.log(response.data);
            fetchInterviews();
            toast.success('Interview Deleted Successfully');
        }).catch((err) => {
            console.log(err.response.data.message);
            toast.error(err.response.data.message);
        });
        fetchInterviews();
    }

    const toggleForm = () => {
        if(editForm){
            setEditForm(false);
            setEditInterview({});
        }
        setFormVisible(!formVisible);
    }
    useEffect(() => {
        if(!props.user.email){
            toast.info('Please Sign In to continue');
            Navigate('/signin');
        }
        else{
            fetchInterviews();
            fetchStudents();
        }
    }, [props.user.email]);
    
    return (
        <div className="Interviews">
            <div className="header">
                <span>Interviews</span>
                <button className="add-btn" onClick={toggleForm}>Add Interview</button>
            </div>
            {formVisible?<InterviewForm toggleForm={toggleForm} editForm={editForm} editInterview={editInterview} fetchInterviews={fetchInterviews}/>:null}
            <div className="interview-list">
                {interviewsArr.map((interview) => <InterviewCard interview={interview} key={interview._id} handleEdit={handleEdit} handleDelete={handleDelete} studentsArr={studentsArr} fetchInterviews={fetchInterviews}/>)}
            </div>
        </div>
    );
};
export default Interview;