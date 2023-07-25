import React, { useState, useEffect } from 'react';

function ServiceAppointmentForm(){
    const [vin, setVin] = useState('');
    const [customer, setCustomer] = useState('');
    const [date, setDate] = useState('');
    // const [time, setTime] = useState('');
    const [technician, setTechnician] = useState('');
    const [technicians, setTechnicians] = useState([]);
    const [reason, setReason] = useState('');

    const fetchTechnicians = async () => {
        const response = await fetch('http://localhost:8080/api/technicians/');
        if (response.ok){
            const data = await response.json();
            setTechnicians(data.technicians);
            console.log(data.technicians)
        }
        else{
            console.error(response);
        }
    }

    const handleVinChange = async (event) =>{
        const value = event.target.value;
        setVin(value);
    };

    const handleCustomerChange = async (event) =>{
        const value = event.target.value;
        setCustomer(value);
    };

    const handleDateChange = async (event) =>{
        const value = event.target.value;
        setDate(value);
    };

    // const handleTimeChange = async (event) =>{
    //     const value = event.target.value;
    //     setTime(value);
    // };

    const handleTechnicianChange = async (event) =>{
        const value = event.target.value;
        setTechnician(value);
    };

    const handleReasonChange = async (event) =>{
        const value = event.target.value;
        setReason(value);
    };

    const handleSubmit = async (event) =>{
        event.preventDefault();

        const data = {};
        data.vin = vin;
        data.customer = customer;
        data.date_time = date;
        // data.time = time;
        data.technician = technician;
        data.reason = reason;
        data.status = "in progress";
        console.log(data);

        const url = 'http://localhost:8080/api/appointments/';
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            },
        };
        const response = await fetch(url, fetchConfig);
        if (response.ok){
            const newAppointment = await response.json();
            setVin('');
            setCustomer('');
            setDate('');
            // setTime('');
            setTechnician('');
            setReason('');
            console.log(newAppointment);
            
        }
        
    };
    useEffect(() => {
        fetchTechnicians();
    }, []);
    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Create a service appointment</h1>
                    <form onSubmit={handleSubmit} id="create-service-appointment-form">

                    <div className="form-floating mb-3">
                        <input value={vin} 
                        onChange={handleVinChange}
                        placeholder="VIN" 
                        required type="text" 
                        name="vin" id="vin" 
                        className="form-control"/>
                        <label htmlFor="vin">VIN</label>
                    </div>

                    <div className="form-floating mb-3">
                        <input value={customer} 
                        onChange={handleCustomerChange}
                        placeholder="customer" 
                        required type="text" 
                        name="customer" id="customer" 
                        className="form-control"/>
                        <label htmlFor="customer">Customer Name</label>
                    </div>

                    <div className="form-floating mb-3">
                        <input value={date} 
                        onChange={handleDateChange}
                        placeholder="Scheduled Time and Date" 
                        required type="datetime-local" 
                        name="scheduled-time-and-date" id="scheduled-time-and-date" 
                        className="form-control"/>
                        <label htmlFor="scheduled-time-and-date">Scheduled Time and Date</label>
                    </div>

                    <div className="form-floating mb-3">
                        <input value={reason} 
                        onChange={handleReasonChange}
                        placeholder="Reason for Service" 
                        required type="text" 
                        name="reason-for-service" id="reason-for-service" 
                        className="form-control"/>
                        <label htmlFor="reason-for-service">Reason for Service</label>
                    </div>

                    <div className="mb-3">
                        <select value={technician} onChange={handleTechnicianChange} required name="technician" id="technician" className="form-select">
                        <option value="">Choose a technician</option>
                        {technicians.map(technician =>{
                            return(
                                <option key={technician.id} value={technician.employee_id}>
                                    {technician.first_name} {technician.last_name}
                                </option>
                            );
                            })}

                        </select>
                    </div>

                    <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ServiceAppointmentForm;