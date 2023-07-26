import React, { useState } from 'react';

function ManufacturerForm() {
  const [name, setName] = useState('');

  const handleManufacturerNameChange = (event) => {
    const value = event.target.value;
    setName(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = { name };
    const manufacturerUrl = 'http://localhost:8100/api/manufacturers/';
    const fetchConfig = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch(manufacturerUrl, fetchConfig);
    if (response.ok) {
      setName('');
      setHasSignedUp(true);
    }
  };

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Create a new Manufacturer</h1>
          <form onSubmit={handleSubmit} id="create-manufacturer-form">
            <div className="form-floating mb-3">
              <input
                onChange={handleManufacturerNameChange}
                placeholder="Name"
                required
                type="text"
                name="name"
                id="name"
                className="form-control"
              />
              <label htmlFor="name">Name</label>
            </div>
            <button className="btn btn-primary">Create</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ManufacturerForm;
