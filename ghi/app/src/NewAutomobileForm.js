import React, { useEffect, useState } from 'react';

function NewAutomobileForm(){
    const [color, setColor] = useState('');
    const [year, setYear] = useState('');
    const [vin, setVin] = useState('');
    const [model_id, setModelId] = useState('');
    const [models, setModels] = useState([]);
    const [hasSignedUp, setHasSignedUp] = useState(false);

    const fetchData = async () => {
        const response = await fetch('http://localhost:8100/api/models/')
        if (response.ok){
            const data = await response.json()
            setModels(data.models)
        }
    };

    useEffect(() => {
        fetchData();

    }, [])

    const handleSumbit = async (event) => {
        event.preventDefault();
        const data = {
          color,
          year,
          vin,
          model_id,
        };

        const automobileUrl = 'http://localhost:8100/api/automobiles/';
        const fetchOptions = {
          method: 'post',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
        };

        const automobileResponse = await fetch(automobileUrl, fetchOptions);
        if (automobileResponse.ok) {
          setColor('');
          setYear('');
          setVin('');
          setModelId('');
          setHasSignedUp(true);
        }
    };

    const handleChangeColor = (event) => {
        const value = event.target.value;
        setColor(value)
    }
    const handleChangeYear = (event) => {
        const value = event.target.value;
        setYear(value);
      };

      const handleChangeVin = (event) => {
        const value = event.target.value;
        setVin(value);
      };

      const handleChangeModelId = (event) => {
        const value = event.target.value;
        setModelId(value);
      };

      // CSS classes for rendering
      let dropdownClasses = 'form-select d-none';
      if (models.length > 0) {
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
                  <form className={formClasses} onSubmit={handleSumbit} id="create-automobile-form">
                    <h1 className="card-title">Add a New Automobile</h1>
                    <p className="mb-3">Tell us about the automobile</p>
                    <div className="row">
                      <div className="col">
                        <div className="form-floating mb-3">
                          <input onChange={handleChangeColor} required placeholder="Color" type="text" id="color" name="color" className="form-control" />
                          <label htmlFor="color">Color</label>
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-floating mb-3">
                          <input onChange={handleChangeYear} required placeholder="Year" type="number" id="year" name="year" className="form-control" />
                          <label htmlFor="year">Year</label>
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-floating mb-3">
                          <input onChange={handleChangeVin} required placeholder="VIN" type="text" id="vin" name="vin" className="form-control" />
                          <label htmlFor="vin">VIN</label>
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-floating mb-3">
                          <select onChange={handleChangeModelId} name="model_id" id="model_id" className={dropdownClasses} required>
                            <option value="">Choose a model</option>
                            {models.map(model => {
                              return (
                                <option key={model.id} value={model.id}>{model.name}</option>
                              );
                            })}
                          </select>
                          <label htmlFor="model_id">Model</label>
                        </div>
                      </div>
                    </div>
                    <button className="btn btn-lg btn-primary">Submit!</button>
                  </form>
                  <div className={messageClasses} id="success-message">
                    Congratulations! You've added a new automobile!
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    export default NewAutomobileForm;
