import React, { useState, useEffect } from "react";
// import './manufacturerlist.css';

function ManufacturerList(){
    const [manufacturers, setManufacturers] = useState([]);

    const getManufacturers = async () =>{
        const url= 'http://localhost:8100/api/manufacturers/';
        const response = await fetch(url);
        if (response.ok){
            const data = await response.json();
            setManufacturers(data.manufacturers);
        }
    }

    useEffect(() => {
        getManufacturers();
    }, [])

    const deleteManufacturer = async (id) => {
        const manufacturerUrl = `http://localhost:8100/api/manufacturers/${id}`;
        const response = await fetch(manufacturerUrl, {method: "DELETE"}).then(() => {
            getManufacturers();
        });
    }


    return(
        <table className="table table-dark table-hover table-striped">
            <thead>
                <tr>
                    <th>Manufacturer Name</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                { manufacturers.map(manufacturer => {
                    return (
                        <tr key={manufacturer.id}>
                            <td>{manufacturer.name}</td>
                            <td>
                                <button className='btn btn-danger' onClick={() => {deleteManufacturer(manufacturer.id)}}>
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

export default ManufacturerList;
