import './form.scss'

import axios from "axios";
import { useEffect } from 'react';
import { toast } from "react-toastify";


const StudentForm = (props) => {

    const base_url = process.env.REACT_APP_API_PATH||'';

    useEffect(() => {
        if(props.editForm===true){
            const student = props.editStudent;
            document.getElementById('name').value = student.name;
            document.getElementById('email').value = student.email;
            document.getElementById('batch').value = student.batch;
            document.getElementById('branch').value = student.branch;
            document.getElementById('rollno').value = student.roll_no;
            document.getElementById('college').value = student.college;
            document.getElementById('placement').value = student.placement;
            document.getElementById('dsa').value = student.score.dsa;
            document.getElementById('webd').value = student.score.webd;
            document.getElementById('react').value = student.score.react;
        }
    }, [props.editForm,props.editStudent]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const payload = Object.fromEntries(formData);
        const data = {
            name:payload.name,
            email:payload.email,
            batch:payload.batch,
            branch:payload.branch,
            roll_no:payload.rollno,
            college:payload.college,
            placement:payload.placement,
            score:{
                dsa:payload.dsa,
                webd:payload.webd,
                react:payload.react
            }
        }
        console.log(data);
        if(props.editForm){
            axios.post(
                `${base_url}/student/update/${props.editStudent._id}`,
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
                props.fetchStudents();
                props.toggleForm();
                toast.success('Student Updated Successfully');
            })
            .catch((err) => {
                console.log(err);
                toast.error(`${err.response.data.message} Loggin in again`);
            });
        }
        else{
            axios.post(
                `${base_url}/student/create`,
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
                props.fetchStudents();
                props.toggleForm();
                toast.success('Student Added Successfully');
            })
            .catch((err) => {
                console.log(err);
                toast.error(`${err.response.data.message} Loggin in again`);
            });
        }
    }
    return (
        <div className="Form">
            <div className="form-container">
                <div className="close-btn" onClick={props.toggleForm}>X</div>
                <div className="form-header">{props.editForm?'Update Student Details':'Add New Student'}</div>
                <form onSubmit = {handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" id="name" placeholder='Enter Student Name'/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="text" name="email" id="email" placeholder='Enter Email'/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="batch">Batch</label>
                        <input type="text" name="batch" id="batch" placeholder='Enter Batch'/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="branch">Branch</label>
                        <input type="text" name="branch" id="branch" placeholder='Enter Branch'/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="rollno">Roll No.</label>
                        <input type="number" name="rollno" id="rollno" placeholder='Enter Roll No.'/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="college">College</label>
                        <input type="text" name="college" id="college" placeholder='Enter College Name'/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="placement">Placement Status</label>
                        <select name="placement" id="placement">
                            <option value="">Select</option>
                            <option value="true">Placed</option>
                            <option value="false">Not Placed</option>
                        </select>
                    </div>
                    <div className="form-group score">
                        <div className="score-header">Score</div>
                        <div className="score-group">
                            <div className="form-group">
                                <label htmlFor="dsa">DSA</label>
                                <input type="number" name="dsa" id="dsa" min={0} max={100}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="webd">Web Development</label>
                                <input type="number" name="webd" id="webd" min={0} max={100}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="react">React</label>
                                <input type="number" name="react" id="react" min={0} max={100}/>
                            </div>
                        </div>
                    </div>

                    <div className="form-btn">
                        <button type="submit">{props.editForm?'Update':'Add Student'}</button>
                    </div>
                </form>
            </div>
            
        </div>
    );
}
export default StudentForm;