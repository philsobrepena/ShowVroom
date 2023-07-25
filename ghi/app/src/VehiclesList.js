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
                    <th>name</th>
                    <th>manufacturer</th>
                    <th>picture_url</th>
                </tr>
            </thead>
            <tbody>
                {models.map(model => {
                    return (
                        <tr key={model.id}>
                            <td>{model.name}</td>
                            <td>{model.manufacturer.name}</td>
                            <td>
                                <img src={model.picture_url}/>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}

export default VehiclesList;
