import React, { useState, useEffect } from "react";
// import './manufacturerlist.css';

function HistoryList(){
    const [appointments, setAppointments] = useState([]);
    const [autos, setAutos] = useState([])
    const fetchAutomobiles = async () =>{
        const autoUrl= 'http://localhost:8100/api/automobiles/';
        const response = await fetch(autoUrl);
        if (response.ok){
            const autoData = await response.json();
            setAutos(autoData.automobiles);
            
            console.log("fetch automobiles", autoData);
        }
        else{
            console.error(response);
        }
    }
    const fetchAppointments = async () =>{
        const response = await fetch('http://localhost:8080/api/appointments/');
        if (response.ok){
            const apptData = await response.json();
            // console.log("fetch appointments", data);
            const inProgress = apptData.appointments.filter(appt => appt.status==="in progress")
            console.log('inProgress', inProgress);
            setAppointments(inProgress)
        }
    }

    useEffect(() => {
        fetchAppointments();
        fetchAutomobiles();
    }, [])



    

    return(
        <table className="table table-dark table-hover table-striped">
            <thead>
                <tr>
                    <th>VIN</th>
                    <th>Is a VIP?</th>
                    <th>Customer</th>
                    <th>Date/Time</th>
                    <th>Technician</th>
                    <th>Reason</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                { appointments.map(appointment => {
                    return (
                        <tr key={appointment.id}>
                            <td>{appointment.vin}</td>
                            <td>{appointment.vip ? 'Yes' : 'No'}</td>
                            <td>{appointment.customer}</td>
                            <td>{appointment.date_time}</td>
                            <td>{appointment.technician.first_name} {appointment.technician.last_name}</td>
                            <td>{appointment.reason}</td>
                            <td>{appointment.status}</td>

                        </tr>
                    )
                })}
            </tbody>
        </table>
    );
}

export default HistoryList;