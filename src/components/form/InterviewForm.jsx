import './form.scss'

import axios from "axios";
import { useEffect } from 'react';
import { toast } from "react-toastify";

const InterviewForm = (props) => {

    useEffect(() => {
        if(props.editForm===true){
            const date = new Date(props.editInterview.date);
            const interview = props.editInterview;
            document.getElementById('company').value = interview.company;
            document.getElementById('venue').value = interview.venue;
            document.getElementById('date').value = `${date.getFullYear().toString().padStart(2,0)}-${(date.getMonth()+1).toString().padStart(2,0)}-${date.getDate().toString().padStart(2,0)}`
            document.getElementById('time').value = interview.time;
        }
    }, [props.editForm,props.editInterview]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const payload = Object.fromEntries(formData);
        const data = {
            company:payload.company,
            venue:payload.venue,
            date:payload.date,
            time:payload.time
        }
        console.log(data);
        if(props.editForm){
            axios.post(
                `https://palcement-cell-server.onrender.com/interview/update/${props.editInterview._id}`,
                data,
                {
                    headers:{
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    withCredentials: true
                }
            )
            .then((response) => {
                console.log(response.data);
                props.fetchInterviews();
                props.toggleForm();
                toast.success('Interview Updated Successfully');
            })
            .catch((err) => {
                console.log(err);
                toast.error('Failed to update Interview');
            });
        }
        else{
            axios.post(
                'https://palcement-cell-server.onrender.com/interview/create',
                data,
                {
                    headers:{
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    withCredentials: true
                }
            )
            .then((response) => {
                console.log(response.data);
                props.fetchInterviews();
                props.toggleForm();
                toast.success('Interview Added Successfully');
            })
            .catch((err) => {
                console.log(err);
                toast.error('Failed to add Interview');
            });
        }

    }
    return (
        <div className="Form">
            <div className="form-container">
                <div className="close-btn" onClick={props.toggleForm}>X</div>
                <div className="form-header">{props.editForm?'Update Interview Details':'Add New Interview'}</div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="company">Company</label>
                        <input type="text" name="company" id="company" placeholder="Enter Company Name" required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="venue">Venue</label>
                        <input type="text" name="venue" id="venue" placeholder="Enter Venue" required/>
                    </div>
                    <div className="form-group date-time">
                        <div className="form-group">
                            <label htmlFor="date">Date</label>
                            <input type="date" name="date" id="date" required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="time">Time</label>
                            <input type="time" name="time" id="time" required/>
                        </div>
                    </div>
                    <div className="form-btn">
                        <button type="submit">{props.editForm?'Update':'Add Interview'}</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default InterviewForm;