import React, { useState, useEffect } from "react";
// import './manufacturerlist.css';
import { Navigate, useNavigate } from "react-router-dom";
// import Nav from "./Nav";
// const nav = useNavigate();

function HistoryList(){
    const [appointments, setAppointments] = useState([]);
    const [autos, setAutos] = useState([]);
    const [search, setSearch] = useState('');
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
            const data = await response.json();
            setAppointments(data.appointments);
                
        }
        // if (response.ok){
        //     const apptData = await response.json();
        //     // console.log("fetch appointments", data);
        //     const inProgress = apptData.appointments.filter(data.appointments.status==="in progress")
        //     console.log('inProgress', inProgress);
        //     setAppointments()
        // }
    }

    

    // function for searching by vin #
    const handleSearch = async (event) =>{
        const value = event.target.value;
        setSearch(value)
    }
    // function that handles the submit search logic/data manipulation. 
    const submit = async (event) =>{
        event.preventDefault();
        const response = await fetch('http://localhost:8080/api/appointments/');
        // console.log(response);
        if (response.ok){
            const data = await response.json();
            let search_list = [];
            // x == singular apointment objects in appointmentsJSON: data.appointments
            for(let x of data.appointments){
                // if the vin matches the search term add that term to the search list 
                if(x.vin === search){
                    search_list.push(x)
                }
            // if the search term has letters or numbers refresh the view state to just those with the search term 
            if(search != ''){
                setAppointments(search_list);
            }
            // else if the search bar is blank just render teh whole list. Eliminates need to refresh for 
            // the page to see everything again
            else{
                fetchAppointments();
                // return true;
                }
            }
        }
    }
    useEffect(() => {
        fetchAppointments();
        fetchAutomobiles();
    }, [])


    return(
        <div className="my-5 container">
            <div className="form-floating mb-3">
                <form onSubmit={submit} id="search-vin-form">
                    <input onChange={handleSearch} placeholder="Search VIN" type="text" id="search" name="search" className="form-control" />
                    {/* deleted *required* up above: submitting an empty search brings up the whole list again, no refresh needed */}
                    <label htmlFor="search"></label>
                    <button className="btn btn-md btn-primary">Search VIN</button>
                </form>
                
            </div>
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
        </div>    
    );
}

export default HistoryList;