import React, {useEffect, useState} from 'react'
import axios from 'axios'

export default function TaskInstance(props) {
    let data = props.data

    const [isEditting, setIsEditting] = useState(false)
    // const [theSalutation, setTheSalutation] = useState(data.SALUTATION);
    // const [theFName, setTheFName] = useState(data.FIRST_NAME);
    // const [theLName, setTheLName] = useState(data.LAST_NAME);
    // const [theAddress, setTheAddress] = useState(data.STREET_ADDRESS);
    // const [theZip, setTheZip] = useState(data.ZIP);
    // const [thePhone, setThePhone] = useState(data.PHONE);
    // const [theEmployer, setTheEmployer] = useState(data.EMPLOYER);


    const [theEmpNo, setTheEmpNo] = useState(data.empNo);
    const [theName, setTheName] = useState(data.name);
    const [theAddress, setTheAddress] = useState(data.address);
    const [theGrade, setTheGrade] = useState(data.grade);
    const [theSalary, setTheSalary] = useState(data.salary);
    const [thedateOfJoining, setDateOfJoining] = useState(data.dateOfJoining);

    const deleteHandler = () => {
        axios.delete(`http://localhost:8000/api/employee/${data.empNo}`)
        .then((response)=>{
            props.triggerUpdate();
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    const formSubmitHandler = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8000/api/employee/${data.empNo}`,  {
            "empNo": parseInt(theEmpNo),
            "name": theName,
            "address": theAddress,
            "grade": parseInt(theGrade),
            "salary": theSalary,
            "dateOfJoining": thedateOfJoining
        })
        .then((response)=>{
            if(response.data.status == "202 Accepted")
            {
                props.triggerUpdate();
                setIsEditting(false)
            }
            else
            {
                alert("Some Error Occurred")
            }
            
        })
        .catch((err)=>{
            console.log(err)
        })
    }
  return (
    <div className='col-12 col-lg-12 col-md-12 col-sm-12' style={{margin: '28px auto'}}>
        <div className="container container-fluid" style={{boxShadow: "#D6337C 0px 4px 6px, #D6337C 0px 8px 24px, #D6337C 0px 6px 40px", padding: '10px auto', borderRadius: '20px'}}>
            <div className="row" style={{paddingTop: '5px'}}>
                <div className="col-lg-10 col-md-10 col-sm-12">
                    {!isEditting ? <p style={{textAlign: 'left', padding: '10px auto'}}>
                        Emp No: {data.empNo}<br />
                        Name: {data.name}<br />
                        Address: {data.address}<br />
                        Grade: {data.grade}<br />
                        Salary: {data.salary}<br />
                        Date of Joining: {data.dateOfJoining}
                    </p> : 
                    <form className="text-start" onSubmit={formSubmitHandler}>
                        <input style={{borderRadius: '20px', fontSize: '1.6rem', marginBottom: '10px'}} type="number" defaultValue={theEmpNo} onChange={(e)=>setTheEmpNo(e.target.value)} />
                        <input style={{borderRadius: '20px', fontSize: '1.6rem', marginBottom: '10px'}} type="text" defaultValue={theName} onChange={(e)=>setTheName(e.target.value)} />
                        <input style={{borderRadius: '20px', fontSize: '1.6rem', marginBottom: '10px'}} type="text" defaultValue={theAddress} onChange={(e)=>setTheAddress(e.target.value)} />
                        <input style={{borderRadius: '20px', fontSize: '1.6rem', marginBottom: '10px'}} type="number" defaultValue={theGrade} onChange={(e)=>setTheGrade(e.target.value)} />
                        <input style={{borderRadius: '20px', fontSize: '1.6rem', marginBottom: '10px'}} type="text" defaultValue={theSalary} onChange={(e)=>setTheSalary(e.target.value)} />
                        <input style={{borderRadius: '20px', fontSize: '1.6rem', marginBottom: '10px'}} type="date" defaultValue={thedateOfJoining} onChange={(e)=>setDateOfJoining(e.target.value)} />

                        <button style={{borderRadius: '20px', fontSize: '1.6rem'}} type="submit">Update</button>
                    </form>}
                </div>
                <div className="col-lg-2 col-md-2 col-sm-12">
                    <i onClick={()=>setIsEditting(!isEditting)} style={{margin: '10px 20px', cursor: 'pointer', padding: '10px auto'}} class="fas fa-edit"></i>
                    <i onClick={deleteHandler} style={{margin: '10px 20px', cursor: 'pointer', padding: '10px auto'}} class="fa-solid fa-trash-can"></i>
                </div>
            </div>
        </div>
    </div>
  )
}
