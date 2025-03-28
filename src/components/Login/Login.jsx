import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase.init";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const emailRef = useRef();
  const handleLogin = (e) =>{
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);
    // reset states
    setSuccess(false);
    setErrorMessage('');
    signInWithEmailAndPassword(auth, email, password)
      .then(result=>{
        console.log(result.user);
        // email verification checking for login
        if(!result.user.emailVerified){
          setErrorMessage('Please Verify Your email.')
        }
        else{
          setSuccess(true)
        }
        
        
      })
      .catch(error =>{
        console.log("Login Error", error.message);
        setErrorMessage(error.message)
      })
    

  }

  const handleForgotPassword = () =>{
    const email = emailRef.current.value;
    // console.log('give me an email', email);
    // password reset method added
    sendPasswordResetEmail(auth, email)
      .then(()=>{
        console.log('password reset email sent');
        
      })
      .catch(error =>{
        setErrorMessage(error.message)
      })
  }
  return (
    <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
              quasi. In deleniti eaque aut repudiandae et a id nisi.
            </p>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form onSubmit={handleLogin} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="email" name="email" placeholder="email" ref={emailRef} className="input input-bordered" required />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                <label onClick={handleForgotPassword} className="label">
                  <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Login</button>
              </div>
              <p className="m-2">Don't Have any account? Please <Link to="/signUp">Sign Up!</Link> </p>
              {
                success && <p className="text-green-400">Login Successful!</p>
              }
              {
                errorMessage && <p className="text-red-500">{errorMessage}</p>
              }
            </form>
          </div>
        </div>
    </div>
  );
};

export default Login;