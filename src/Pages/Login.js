
import { useState } from 'react'
import Loading from '../Components/Loading'
import { isAuthenticated } from '../Services/Auth';
import { Navigate } from 'react-router-dom';
import { storeUserData } from '../Services/Storage';
import { RegisterUser, authCheck } from '../Services/Api';
import Navigation from '../Components/Navigation';

function Login() {

  const initialStateErrors = {
		email: { required: false },
		password: { required: false },
		custom_error: null,
	};
	
  const [errors, setErrors] = useState(initialStateErrors);

  const [loading, setLoading] = useState(false);

  const handleSubmit = (event) => {
    console.log('submitted');
    event.preventDefault();
    let errorsInput = initialStateErrors;
    let hasError = false;
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

      authCheck(inputs)
      .then((res) => {
        storeUserData(res.data.idToken)
      })
      .catch((error) => {
        let errorData = error.response.data.error;
        console.log('fail', errorData)
        errorsInput.custom_error = "Invalid Login Credentials " + errorData.message;
      })
      .finally(() => {
        setLoading(false);
      })  
    }
    
    setErrors(errorsInput);
    
  };

  const [inputs, setInputs] = useState({
    name: "",
    email: "",
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
      <div className='container'>
        <div className='row justify-content-center'>
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">Login</div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                
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
  )
}

export default Login