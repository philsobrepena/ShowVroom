import React, { useEffect, useState } from 'react';

function NewModelForm() {
  const [name, setName] = useState('');
  const [picture_url, setPictureUrl] = useState('');
  const [manufacturer_id, setManufacturerId] = useState('');
  const [manufacturers, setManufacturers] = useState([]);
  const [hasSignedUp, setHasSignedUp] = useState(false);

  const fetchData = async () => {
    const response = await fetch('http://localhost:8100/api/manufacturers/');
    if (response.ok) {
      const data = await response.json();
      setManufacturers(data.manufacturers);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      name,
      picture_url,
      manufacturer_id
    };

    const vehicleUrl = 'http://localhost:8100/api/models/';
    const fetchOptions = {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const vehicleResponse = await fetch(vehicleUrl, fetchOptions);
    if (vehicleResponse.ok) {
      setName('');
      setPictureUrl('');
      setManufacturerId('');
      setHasSignedUp(true);
    }
  };

  const handleChangeName = (event) => {
    const value = event.target.value;
    setName(value);
  };

  const handleChangePictureURL = (event) => {
    const value = event.target.value;
    setPictureUrl(value);
  };

  const handleChangeManufacturer = (event) => {
    const value = event.target.value;
    setManufacturerId(value);
  };

  // CSS classes for rendering
  let dropdownClasses = 'form-select d-none';
  if (manufacturers.length > 0) {
    dropdownClasses = 'form-select';
  }

  let messageClasses = 'alert alert-success d-none mb-0';
  let formClasses = '';
  if (hasSignedUp) {
    messageClasses = 'alert alert-success mb-0';
    formClasses = 'd-none';
  }

  return (
    <div className="my-5 container">
      <div className="row">
        <div className="col">
          <div className="card shadow">
            <div className="card-body">
              <form className={formClasses} onSubmit={handleSubmit} id="create-vehicle-form">
                <h1 className="card-title">Add a New Vehicle</h1>
                <p className="mb-3">Tell us about the vehicle</p>
                <div className="row">
                  <div className="col">
                    <div className="form-floating mb-3">
                      <input onChange={handleChangeName} required placeholder="Name" type="text" id="name" name="name" className="form-control" />
                      <label htmlFor="name">Name</label>
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-floating mb-3">
                      <input onChange={handleChangePictureURL} required placeholder="Picture URL" type="url" id="picture_url" name="picture_url" className="form-control" />
                      <label htmlFor="picture_url">Picture URL</label>
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-floating mb-3">
                      <select onChange={handleChangeManufacturer} name="manufacturer_id" id="manufacturer_id" className={dropdownClasses} required>
                        <option value="">Choose a manufacturer</option>
                        {manufacturers.map(manufacturer => {
                          return (
                            <option key={manufacturer.id} value={manufacturer.id}>{manufacturer.name}</option>
                          );
                        })}
                      </select>
                      <label htmlFor="manufacturer_id">Manufacturer</label>
                    </div>
                  </div>
                </div>
                <button className="btn btn-lg btn-primary">Submit!</button>
              </form>
              <div className={messageClasses} id="success-message">
                Congratulations! You've added a new vehicle!
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewModelForm;
