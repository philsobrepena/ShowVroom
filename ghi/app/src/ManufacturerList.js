import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';


function ManufacturerList(props) {
    const [manufacturers, setManufacturers] = useState([])

    const fetchData = async () =>{
        const response = await fetch('	http://localhost:8100/api/manufacturers/')
        if (response.ok){
            const data = await response.json();
            console.log(data.manufacturers)
            setManufacturers(data.manufacturers)
        }
    }

    useEffect(() => {
        fetchData()
    }, []);

    return(
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>id</th>
                    <th>name</th>
                </tr>
            </thead>
            <tbody>
                {manufacturers.map(manufacturer => {
                    return(
                        <tr key={manufacturer.href} >
                            <td>{manufacturer.id}</td>
                            <td>{manufacturer.name}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>

    )

}

export default ManufacturerList
