import { useState } from "react";



function Register() {
 
	const initialStateErrors = {
		email: { required: false },
		password: { required: false },
		name: { required: false },
		custom_error: null,
	};
	
  const [errors, setErrors] = useState(initialStateErrors);

  const [loading, setLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    let errorsInput = initialStateErrors;
    let hasError = false;
    console.log('beforestore', errors);
    if (inputs.name == "") {
      errorsInput.name.required = true;
      console.log('name errors', errors);
      hasError = true;
    }
    if (inputs.email == "") {
      errorsInput.email.required = true;
      console.log('em errors', errors);
      hasError = true;
    }
    if (inputs.password == "") {
      errorsInput.password.required = true;
      console.log('pas errors', errors);
      hasError = true;
    }
	
    if (!hasError) {
      setLoading(true);
      alert('success')
    }
    else
    {
			console.log(initialStateErrors, errors);
			setErrors(errors);
    }
  };

  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">Register</div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    onChange={handleInput}
                  />
                  {errors.name.required == true ? (
                    <p className="text-danger">Name is required</p>
                  ) : null}
                </div>
                <div className="mb-3">
                  <label className="form-label">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    onChange={handleInput}
                  />
                  {errors.email.required ? (
                    <p className="text-danger">Email is required</p>
                  ) : null}
                </div>
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    onChange={handleInput}
                  />
                  {errors.password.required ? (
                    <p className="text-danger">Password is required</p>
                  ) : null}
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
