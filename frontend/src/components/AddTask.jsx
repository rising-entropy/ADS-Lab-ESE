import React, {useEffect, useState} from 'react'
import axios from 'axios'

export default function AddTask(props) {

    const [theEmpNo, setTheEmpNo] = useState(0);
    const [theName, setTheName] = useState("");
    const [theAddress, setTheAddress] = useState("");
    const [theGrade, setTheGrade] = useState(0);
    const [theSalary, setTheSalary] = useState("");
    const [thedateOfJoining, setDateOfJoining] = useState("2022-05-17");

    

    const formSubmitHandler = (e) => {
        e.preventDefault();
        let body = {
            "empNo": parseInt(theEmpNo),
            "name": theName,
            "address": theAddress,
            "grade": parseInt(theGrade),
            "salary": theSalary,
            "dateOfJoining": thedateOfJoining
        }
        axios.post('http://localhost:8000/api/employees', body)
        .then((response)=>{
            if(response.data.status === "201 OK")
            {
                setTheEmpNo(0)
                setTheName("")
                setTheAddress("")
                setTheGrade("")
                setTheSalary("")
                setDateOfJoining(0)
                props.triggerUpdate()
            }
            else
            {
                alert("Emp No already exists")
            }
        })
        .catch((err)=>{
            console.log(err)
        })
    }

  return (
    <div className="container container-fluid text-center" style={{fontSize: '1.5rem'}}>
        <form onSubmit={formSubmitHandler}>
            <div className="row">
                <input onChange={(e)=>{
                    setTheEmpNo(e.target.value)
                }} placeholder='Emp No' style={{borderRadius: '30px'}} type="number" value={theEmpNo} required/>
            </div>
            <div className="row">
                <input onChange={(e)=>{
                    setTheName(e.target.value)
                }} placeholder='Name' style={{borderRadius: '30px'}} type="text" value={theName} required/>
            </div>
            <div className="row">
                <input onChange={(e)=>{
                    setTheAddress(e.target.value)
                }} placeholder='Address' style={{borderRadius: '30px'}} type="text" value={theAddress} required/>
            </div>
            <div className="row">
                <input onChange={(e)=>{
                    setTheGrade(e.target.value)
                }} placeholder='Grade' style={{borderRadius: '30px'}} type="number" value={theGrade} required/>
            </div>
            <div className="row">
                <input onChange={(e)=>{
                    setTheSalary(e.target.value)
                }} placeholder='Salary' style={{borderRadius: '30px'}} type="text" value={theSalary} required/>
            </div>
            <div className="row">
                <input onChange={(e)=>{
                    setDateOfJoining(e.target.value)
                }} placeholder='Date of Joining' style={{borderRadius: '30px'}} type="date" value={thedateOfJoining} required/>
            </div>
            <div className="row text-center">
                <button style={{width: '180px', margin: '10px auto', borderRadius: '20px', boxShadow: "rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px", backgroundColor: '#DFDFDE', }} type="submit">Add</button>
            </div>
        </form>
    </div>
  )
}
