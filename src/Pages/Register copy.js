import { useState } from "react";

function Register() {
	
	const [inputs, setInputs] = useState({
		name: "",
		email: "",
		password: "",
	});
	
	const [errors, setErrors] = useState({});

	const handleInput = (e) => {
		setInputs({...inputs, [e.target.name]: e.target.value});
	}
	
	const handleSubmit = (e) => {
		e.preventDefault();
		
		let errorInput = {};
		let hasError = false;
		if (inputs.name === "") {
			errorInput.name = "Name is required";
			hasError = true;
		}
		
		if (inputs.email === "") {
			errorInput.email = "Email is required";
			hasError = true;
		}
		
		if (inputs.password === "") {
			errorInput.password = "Password is required";
			hasError = true;
		}
		
		if (!hasError) {
			alert('success');
		}
		
		setErrors(errorInput);
		
		
		
	}

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6"> 
          <div className="card">
            <div className="card-header">Register</div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
              <div className="mb-3">
                  <label className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    onChange={handleInput}
                  />
                  { errors.name && (<span className="text-danger" >{errors.name}</span>)}
                </div>
                <div className="mb-3">
                  <label className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    onChange={handleInput}
                  />
                  { errors.email && (<span className="text-danger" >{errors.email}</span>)}
                </div>
                <div className="mb-3">
                  <label className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    onChange={handleInput}
                  />
                  { errors.password && (<span className="text-danger" >{errors.password}</span>)}
                </div>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
