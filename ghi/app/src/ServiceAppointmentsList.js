import React, { useState, useEffect } from "react";
// import './manufacturerlist.css';

function AppointmentsList(){
    const [appointments, setAppointments] = useState([]);
    const [autos, setAutos] = useState([])
    const fetchAutomobiles = async () =>{
        const autoUrl= 'http://localhost:8100/api/automobiles/';
        const response = await fetch(autoUrl);
        if (response.ok){
            const autoData = await response.json();
            setAutos(autoData.automobiles);
            
            // console.log("fetch automobiles", autoData);
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
            // console.log('inProgress', inProgress);
            setAppointments(inProgress)
        }
    }

    useEffect(() => {
        fetchAppointments();
        fetchAutomobiles();
    }, [])

    const handleStatusChange = async (event) =>{
        event.preventDefault();
        const value = event.target.value;
        setAppointments(value);
    };
    


    // change this to canceled or finished
    const handleFinish = async (id) => {
        const finishUrl = `http://localhost:8080/api/appointments/${id}/finish/`;
        const fetchOptions = {
            method: "PUT",
            headers:{'Content-Type': 'application/json'},

        }
        const response = await fetch(finishUrl, fetchOptions).then(() => {
            fetchAppointments();
        });
        // if (response.ok){
        //     console.log("message: status updated to finished")
        //     fetchAppointments();
        // }
        
    };
    const handleCancel = async (id) => {
        const cancelUrl = `http://localhost:8080/api/appointments/${id}/cancel/`
        const fetchOptions = {
            method: "PUT",
            headers:{'Content-Type': 'application/json'},

        }
        const response = await fetch(cancelUrl, fetchOptions).then(() => {
            fetchAppointments();
        });
        // if (response.ok){
        //     console.log("message: status updated to canceled")
        //     // fetchAppointments();
        //     }
};
    

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
                    <th>Finish</th>
                    <th>Cancel</th>
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
                            <td><button name="finish"  onClick={() => handleFinish(`${appointment.id}`)}>Finish?</button></td>
                            <td><button name="cancel"  onClick={() => handleCancel(`${appointment.id}`)}>Cancel?</button></td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    );
}
// https://www.freecodecamp.org/news/how-the-question-mark-works-in-javascript/
export default AppointmentsList;