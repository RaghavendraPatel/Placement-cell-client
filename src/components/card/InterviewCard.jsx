import React, {useEffect, useState } from "react";
import './card.scss'
import { FaAngleDown, FaAngleUp} from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";

const InterviewCard = ({ interview,handleEdit,handleDelete,studentsArr,fetchInterviews}) => {

    const [show, setShow] = useState(false);
    const [editForm,setEditForm] = useState(false);
    const [editStudent,setEditStudent] = useState({});

    const base_url = process.env.REACT_APP_API_PATH||'';

    const handleToggle = () => {
        setShow(!show);
        handelFormReset();
    }

    useEffect(() => {
        const student = document.getElementById('interview-student');
        const result = document.getElementById('interview-result');
        if(editForm===true){
            student.value = editStudent.student.email;
            student.setAttribute('disabled','disabled');
            student.style.border = 'none';
            result.value = editStudent.result;
        }
        else{
            student.removeAttribute('disabled');
            student.style.border = '1px solid #ccc';
        }
        if(!show){
            setEditForm(false);
            setEditStudent({});
        }
    },[show,editForm]);

    const handelFormReset = () => {
        document.getElementById('interview-student').value = '';
        document.getElementById('interview-result').value = '';
        setEditForm(false);
        setEditStudent({});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(editForm){
            const data = {
                result:e.target[1].value,
                studentId:editStudent._id,
                email:editStudent.student.email
            }
            axios.post(`${base_url}/interview/update-student/${interview._id}`,data,{withCredentials:true}).then((response) => {
                console.log(response.data);
                toast.success('Student Updated Successfully');
                fetchInterviews();
                handelFormReset();
            }).catch((err) => {
                console.log(err.response.data.message);
                toast.error(err.response.data.message);
            });
        }
        else{
            const data = {
                email:e.target[0].value,
                result:e.target[1].value
            }
            axios.post(`${base_url}/interview/add-student/${interview._id}`,data,{withCredentials:true}).then((response) => {
                console.log(response.data);
                fetchInterviews();
                toast.success('Student Added Successfully');
            }).catch((err) => {
                console.log(err);
                toast.error(err.response.data.message);
            });
        }
        handelFormReset();
        fetchInterviews();

    }
    const handleStudentEdit = (student) => {
        setEditForm(true);
        setEditStudent(student);
    }
    const handleStudentDelete = (student) => {
        axios.post(`${base_url}/interview/remove-student/${interview._id}/`,{studentObjId:student._id,studentId:student.student._id},{withCredentials:true}).then((response) => {
            console.log(response.data);
            fetchInterviews();
            toast.success('Student Deleted Successfully');
        }).catch((err) => {
            console.log(err);
            toast.error('Failed to delete Student');
        }
        );
        fetchInterviews();
    }

    const date = new Date(interview.date);
    return (
        <div className="card" >
            <div className="card-header" onClick={handleToggle}>
                <div className="left">
                    <div className="image">
                        <img src="https://cdn4.vectorstock.com/i/1000x1000/66/18/corporate-business-building-logo-graphic-style-vector-27726618.jpg"/>
                    </div>
                    <div className="title">{interview.company}</div>
                </div>
                <div className="right">
                    <button className="edit-btn" onClick={()=>handleEdit(interview)}>Edit</button>
                    <button className="delete-btn" onClick={()=>handleDelete(interview._id)}>Delete</button>
                    <div className="icon">
                        <span className="icon">
                            {
                                show ? <i><FaAngleUp/></i> : <i ><FaAngleDown/></i>
                            }
                        </span>
                    </div>
                </div>
            </div>
            <div className={show?"card-body visible":"hidden"}>
                <div className="interview-details section-header">Details</div>
                <div className="interview-info section-info">
                    <div className="interview-company"><span>Company</span>{interview.company}</div>
                    <div className="interview-venue"><span>Venue</span>{interview.venue}</div>
                    <div className="interview-date"><span>Date</span>{date.getDate()}-{date.getMonth()}-{date.getFullYear()}</div>
                    <div className="interview-time"><span>Time</span>{interview.time}</div>
                </div>
                <hr />
                <div className="interview-add-student section-header">Add Students</div>
                <form className="interview-add-student-form section-info" onSubmit={handleSubmit}>
                    <div className="interview-student-email" ><span>Email</span>
                        <input type="text" placeholder="Email" list = "students" id="interview-student"/>
                        <datalist id="students">
                            {studentsArr.map((student) => {
                                return (
                                    <option value={student.email}/>
                                );
                            })}
                        </datalist>
                    </div>
                    <div className="interview-student-result"><span>Result</span>
                        <select id="interview-result">
                            <option selected hidden>Select Result</option>
                            <option value="Pass">Pass</option>
                            <option value="Fail">Fail</option>
                            <option value="On Hold">On Hold</option>
                            <option value="Did not appear">Did not appear</option>
                        </select>
                    </div>
                    {editForm?<button className="interview-student-add btn"  onClick={handelFormReset}>Cancel</button>:null}
                    <button className="interview-student-add btn">{editForm?'Update':'Add'}</button>
                </form>
                <hr />
                <div className="interview-students section-header">Students</div>
                <div className="interview-students-list">
                    {(interview.students.length>0)?
                        (<table className="students">
                            <tr className="student-head">
                                <th>Name</th>
                                <th>Email</th>
                                <th>Result</th>
                            </tr>
                            {interview.students.map((student) => {
                                return (
                                    <tr className="student-details">
                                        <td className="student-name">{student.student.name}</td>
                                        <td className="student-email">{student.student.email}</td>
                                        <td className="student-result">{student.result}</td>
                                        <td className="student-btns">
                                            <button className="edit-btn" onClick={()=>handleStudentEdit(student)}>Edit</button>
                                            <button className="delete-btn" onClick={()=>handleStudentDelete(student)}>Delete</button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </table>):(<div>No Students</div>)}
                </div>
            </div>
        </div>
    );
};
export default InterviewCard;

