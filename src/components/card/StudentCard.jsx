import React, {  useState } from "react";
import './card.scss'
import { FaAngleDown, FaAngleUp} from "react-icons/fa";
const StudentCard = ({ student,handleDelete,handleEdit }) => {
    const [show, setShow] = useState(false);

    const handleToggle = () => {
        setShow(!show);
    }
    return (
        <div className="card" onClick={handleToggle}>
            <div className="card-header">
                <div className="left">
                    <div className="image">
                        <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png"/>
                    </div>
                    <div className="title">{student.name}</div>
                </div>
                <div className="right">
                    <button className="edit-btn" onClick={()=>handleEdit(student)}>Edit</button>
                    <button className="delete-btn" onClick={()=>handleDelete(student._id)}>Delete</button>
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
                <div className="student-details section-header">Details</div>
                <div className="student-info section-info">
                    <div className="student-name"><span>Name</span>{student.name}</div>
                    <div className="student-email"><span>Email</span>{student.email}</div>
                    <div className="student-batch"><span>Batch</span>{student.batch}</div>
                    <div className="student-branch"><span>Branch</span>{student.branch}</div>
                    <div className='student-rollno'><span>Roll No.</span>{student.roll_no}</div>
                    <div className="student-college"><span>College</span>{student.college}</div>
                    <div className = 'student-placement'><span>Placement Status</span>{student.placement?'Placed':'Not Placed'}</div>
                </div>
                <hr />
                <div className='score-header section-header'>Score</div>
                <div className="student-score section-info">
                    <div className="student-dsa"><span>DSA</span>{student.score.dsa}</div>
                    <div className="student-webd"><span>Wev Development</span>{student.score.webd}</div>
                    <div className="student-react"><span>React</span>{student.score.react}</div>
                </div>
                <hr />
                <div className="student-interviews">
                    <div className="interview-header section-header">Interviews</div>{
                    (student.interviews.length>0)?
                    (<table className="interviews">                      
                        <tr className="interview-head">
                            <th>Company</th>
                            <th>Date</th>
                            <th>Status</th>
                        </tr>
                        {student.interviews.map((interview) => {
                        let date = new Date(interview.interview.date);
                        return (
                            <tr className="interview-details">
                                <td className="interview-company">{interview.interview.company}</td>
                                <td className="interview-date">{date.getDate()}-{date.getMonth()}-{date.getFullYear()}</td>
                                <td className="interview-status">{interview.result}</td>
                            </tr>
                        );
                    })}</table>):(<div>No Interviews</div>)
                }</div>
            </div>
        </div>
    );
};

export default StudentCard;