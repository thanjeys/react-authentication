import { useState } from "react";
import { RegisterUser } from "../Services/Api";
import Loading from "../Components/Loading";
import { storeUserData } from "../Services/Storage";
import { isAuthenticated } from "../Services/Auth";
import Navigation from "../Components/Navigation";
import { Navigate } from "react-router-dom";

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
    let errorsInput = {...initialStateErrors};
    let hasError = false;
    if (inputs.name === "") {
      errorsInput.name.required = true;
      hasError = true;
    }
    if (inputs.email === "") {
      errorsInput.email.required = true;
      hasError = true;
    }
    if (inputs.password === "") {
      errorsInput.password.required = true;
      hasError = true;
    }
	
    if (!hasError) {
      setLoading(true);

      RegisterUser(inputs)
      .then((res) => {
        storeUserData(res.data.idToken)
      })
      .catch((error) => {
        let errorData = error.response.data.error;
        console.log('fail', errorData.message)
        if (errorData.message === "EMAIL_EXISTS")
          errorsInput.custom_error = "Email already exists";
        else
          errorsInput.custom_error = "Server Error " + errorData.message;
      })
      .finally(() => {
        setLoading(false);
      })  
    }
    
    setErrors({...errorsInput});
    
  };

  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };
  
  if (isAuthenticated())
  {
     return <Navigate to="/dashboard" />
  }
  return (
    <>
    <Navigation />
    <div className="container">
      <div className="row justify-content-center">
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
                  {errors.name.required === true ? (
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
                {errors.custom_error ? (
                    <p className="text-danger">{ errors.custom_error }</p>
                  ) : null}
                
                { loading &&  <Loading />}
                <br />
                <button type="submit" disabled={loading} className="btn btn-primary">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default Register;
