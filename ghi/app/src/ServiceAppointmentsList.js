import React, { useState, useEffect } from "react";
// import './manufacturerlist.css';

function AppointmentsList(){
    const [appointments, setAppointments] = useState([]);
    const [automobiles, setAutomobiles] = useState([])
    const fetchAutomobiles = async () =>{
        const autoUrl= 'http://localhost:8100/api/automobiles/';
        const response = await fetch(autoUrl);
        if (response.ok){
            const data = await response.json();
            setAutomobiles(data.automobiles);
            // console.log("fetch automobiles", data);
        }
        else{
            console.error(response);
        }
    }
    const fetchAppointments = async () =>{
        const response = await fetch('http://localhost:8080/api/appointments/');
        if (response.ok){
            const data = await response.json();
            // console.log("fetch appointments", data);
            const inProgress = data.appointments.filter(appt => appt.status==="canceled")
            console.log('inProgress', inProgress)
        }
    }

    useEffect(() => {
        fetchAppointments();
        fetchAutomobiles();
    }, [])

    // change this to canceled or finished
    const updateAppointment = async (id) => {
        const appointmentUrl = `http://localhost:8080/api/appointments/${id}`;
        // const response 
        // const response = await fetch(appointmentUrl, {method: "DELETE"}).then(() => {
        //     getAppointments();
        // });
    }


    // return(
    //     <table className="table table-dark table-hover table-striped">
    //         <thead>
    //             <tr>
    //                 <th>VIN</th>
    //                 <th>Is VIP?</th>
    //                 <th>Customer</th>
    //                 <th>Date/Time</th>
    //                 <th>Technician</th>
    //                 <th>Reason</th>
    //                 <th>Status</th>
    //             </tr>
    //         </thead>
    //         <tbody>
    //             { technicians.map(technician => {
    //                 return (
    //                     <tr key={technician.id}>
    //                         <td>{technician.employee_id}</td>
    //                         <td>{technician.first_name}</td>
    //                         <td>{technician.last_name}</td>
    //                         <td>
    //                             <button className='btn btn-danger' onClick={() => {deleteTechnician(technician.id)}}>
    //                                 Delete
    //                             </button>
    //                         </td>
    //                     </tr>
    //                 )
    //             })}
    //         </tbody>
    //     </table>
    // );
}

export default AppointmentsList;