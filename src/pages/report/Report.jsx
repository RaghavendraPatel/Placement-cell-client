import React, { useEffect,useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { PiDownload } from 'react-icons/pi';
import './report.scss';
import DataTable from 'react-data-table-component';
import { CSVDownload,CSVLink } from 'react-csv';

const Report = (props) => {
    const Navigate = useNavigate();
    const [tableData,setTableData] = useState([]);
    

    const fetchReport = () => {
        axios.get('/student',{withCredentials:true}).then((response) => {
            setTableData([]);
            response.data.students.forEach((student) => {
                const placement = (student.placement)?'Placed':'Not Placed';
                if(student.interviews.length===0){
                    const data = {
                        name:student.name,
                        email:student.email,
                        college:student.college,
                        batch:student.batch,
                        branch:student.branch,
                        roll_no:student.roll_no,
                        dsa_score:student.score.dsa,
                        webd_score:student.score.webd,
                        react_score:student.score.react,
                        placement:placement,
                        company:'-',
                        date:'-',
                        time:'-',
                        venue:'-',
                        result:'-',
                    }
                    setTableData((tableData) => [...tableData,data]);
                }
                else{
                    for(let i=0;i<student.interviews.length;i++){
                        const data = {
                            name:student.name,
                            email:student.email,
                            college:student.college,
                            batch:student.batch,
                            branch:student.branch,
                            roll_no:student.roll_no,
                            dsa_score:student.score.dsa,
                            webd_score:student.score.webd,
                            react_score:student.score.react,
                            placement:placement,
                            company:student.interviews[i].interview.company,
                            date:student.interviews[i].interview.date,
                            time:student.interviews[i].interview.time,
                            venue:student.interviews[i].interview.venue,
                            result:student.interviews[i].result,
                        }
                        setTableData((tableData) => [...tableData,data]);
                    }
                }
            });
            console.log(tableData)
        }).catch((err) => {
            if(err.response.status===401){
                props.logout();
                toast.info('Session expired, Please Sign In to continue');
                Navigate('/signin');
            }
        });
    }
    const downloadReport = () => {
        toast.info('Downloading Report');
    }
    useEffect(() => {

        if(!props.user.email){
            toast.info('Please Sign In to continue');
            Navigate('/signin');
        }
        else{
            fetchReport();
        }
    }, [props.user.email]);

    return (
        <div className="Report">
            <div className="header">
                <span>Report</span>
                <CSVLink data={tableData} filename="report.csv">
                    <button className="btn" onClick={downloadReport}>
                        <i><PiDownload/></i>
                        Export
                    </button>
                </CSVLink>
            </div>
            <div className="table">
                <DataTable
                    columns={[
                        {
                            name:'Name',
                            selector:'name',
                            sortable:true,
                        },
                        {
                            name:'Email',
                            selector:'email',
                            sortable:true,
                        },
                        {
                            name:'College',
                            selector:'college',
                            sortable:true,
                        },
                        {
                            name:'Batch',
                            selector:'batch',
                            sortable:true,
                        },
                        {
                            name:'Branch',
                            selector:'branch',
                            sortable:true,
                        },
                        {
                            name:'Roll No',
                            selector:'roll_no',
                            sortable:true,
                        },
                        {
                            name:'DSA Score',
                            selector:'dsa_score',
                            sortable:true,
                        },
                        {
                            name:'WebD Score',
                            selector:'webd_score',
                            sortable:true,
                        },
                        {
                            name:'React Score',
                            selector:'react_score',
                            sortable:true,
                        },
                        {
                            name:'Placement',
                            selector:'placement',
                            sortable:true,
                        },
                        {
                            name:'Company',
                            selector:'company',
                            sortable:true,
                        },
                        {
                            name:'Date',
                            selector:'date',
                            sortable:true,
                        },
                        {
                            name:'Time',
                            selector:'time',
                            sortable:true,
                        },
                        {
                            name:'Venue',
                            selector:'venue',
                            sortable:true,
                        },
                        {
                            name:'Result',
                            selector:'result',
                            sortable:true,
                        },
                    ]}
                    data={tableData}
                    pagination={true}
                    paginationPerPage={10}
                    paginationRowsPerPageOptions={[10]}
                    fixedHeader={true}
                    highlightOnHover={true}
                    pointerOnHover={true}
                    striped={true}
                    responsive={true}
                    noDataComponent={<span>No Data Found</span>}
                />
            </div>
        </div>
    );
};
export default Report;