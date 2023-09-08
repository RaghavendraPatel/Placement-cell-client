import './students.scss'
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import StudentCard from "../../components/card/StudentCard";
import StudentForm from "../../components/form/StudentForm";

const Students = (props) => {

    const Navigate = useNavigate();

    const [studentsArr,setStudentsArr]= useState([]);
    const [formVisible,setFormVisible] = useState(false);
    const [editForm,setEditForm] = useState(false);
    const [editStudent,setEditStudent] = useState({});
    const base_url = process.env.REACT_APP_API_PATH||'';

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

    const handleEdit = (student) => {
        setEditForm(true);
        setEditStudent(student);
        toggleForm();
    }

    const handleDelete = (id) => {
        console.log(id);
        axios.delete(`${base_url}/student/delete/${id}`,{withCredentials:true}).then((response) => {
            console.log(response.data);
            fetchStudents();
            toast.success('Student Deleted Successfully');
        }).catch((err) => {
            console.log(err);
            toast.error('Failed to delete Student');
        });
    }

    const toggleForm = () => {
        if(editForm){
            setEditForm(false);
            setEditStudent({});
        }
        setFormVisible(!formVisible);
    }

    useEffect(() => {
        if(!props.user.email){
            toast.info('Please Sign In to continue');
            Navigate('/signin');
        }
        else{
            fetchStudents();
        }
    }, [props.user.email]);

    return (
        <div className="Students">
            <div className="header">
                <span>Students</span>
                <button className="add-btn" onClick={toggleForm}>{ formVisible?'Cancle':'Add Student'}</button>
            </div>
            {formVisible?<StudentForm fetchStudents={fetchStudents} toggleForm={toggleForm} editForm={editForm} editStudent={editStudent}/>:null}
            <div className="students-list">
                {
                    studentsArr.map((student) => <StudentCard student={student} handleEdit={handleEdit} handleDelete={handleDelete} key={student._id}/>)
                }
            </div>
        </div>
    );
};

export default Students;