import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

function VehiclesList() {
    const [models, setVehicles] = useState([]);

    const fetchData = async () => {
        const response = await fetch('http://localhost:8100/api/models/');
        if (response.ok) {
            const data = await response.json();
            console.log(data.models);
            setVehicles(data.models);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>id</th>
                    <th>name</th>
                    <th>picture_url</th>
                    <th>manufacturer id</th>
                    <th>manufacturer name</th>
                </tr>
            </thead>
            <tbody>
                {models.map(model => {
                    return (
                        <tr key={model.id}>
                            <td>{model.id}</td>
                            <td>{model.name}</td>
                            <td>
                                <img src={model.picture_url}/>
                            </td>
                            <td>{model.manufacturer.id}</td>
                            <td>{model.manufacturer.name}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}

export default VehiclesList;
