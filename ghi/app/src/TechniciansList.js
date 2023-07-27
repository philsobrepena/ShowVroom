import React, { useState, useEffect } from "react";
// import './manufacturerlist.css';

function TechniciansList(){
    const [technicians, setTechnicians] = useState([]);

    const getTechnicians = async () =>{
        const url= 'http://localhost:8080/api/technicians/';
        const response = await fetch(url);
        if (response.ok){
            const data = await response.json();
            setTechnicians(data.technicians);
            // console.log(data);
        }
    }

    useEffect(() => {
        getTechnicians();
    }, [])

    const deleteTechnician = async (id) => {
        const technicianUrl = `http://localhost:8080/api/technicians/${id}`;
        const response = await fetch(technicianUrl, {method: "DELETE"}).then(() => {
            getTechnicians();
        });
    }


    return(
        <table className="table table-dark table-hover table-striped">
            <thead>
                <tr>
                    <th>Employee ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                { technicians.map(technician => {
                    return (
                        <tr key={technician.id}>
                            <td>{technician.employee_id}</td>
                            <td>{technician.first_name}</td>
                            <td>{technician.last_name}</td>
                            <td>
                                <button className='btn btn-danger' onClick={() => {deleteTechnician(technician.id)}}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    );
}

export default TechniciansList;