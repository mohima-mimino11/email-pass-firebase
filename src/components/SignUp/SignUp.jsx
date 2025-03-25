import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase.init";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";


const SignUp = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handleSignUp = e =>{
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const terms = e.target.terms.checked;

    console.log(email, password, terms);
    // Regex to enforce password rules
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;

    // reset states
    setErrorMessage('');
    setSuccess(false)
    // setShowPassword(false)
    if(password.length < 6){
      setErrorMessage('Password must be 6 characters or longer')
      return
    }
    if(!passwordRegex.test(password)){
      setErrorMessage('Password Needs  at one uppercase, at least one lowercase, at least one number and at least one special character.')
      return
    }

    if(!terms){
      setErrorMessage("Please Accept Our terms and conditions")
    }
    // create user with email and password
    createUserWithEmailAndPassword(auth, email, password)
      .then(result =>{
        console.log(result.user);
        setSuccess(true);
      })
      .catch(error =>{
        console.log("Sign Up error:", error);
        
      })
    
  }
  return (
    <div className="space-y-6">
      <h1 className="text-5xl font-bold text-center mt-3">Sign Up</h1>
      <div className="card mx-auto bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <form onSubmit={handleSignUp} className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input type="email" placeholder="email" name="email" className="input input-bordered" required />
          </div>
          <div className="form-control relative">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <button onClick={() => setShowPassword(!showPassword)} className="btn btn-xs absolute right-6 top-6 z-10">
              {
                showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>
              }
              
            </button>
            <input type={showPassword ? 'text' : 'password'} placeholder="password" name="password" className="input input-bordered" required />
            <label className="label">
              <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
            </label>
          </div>
          <div className="form-control">
            <label className="label cursor-pointer">
              <input type="checkbox" name="terms" className="checkbox" />
              <span className="label-text">Accept Our Terms and Conditions</span>
            </label>
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-primary btn-wide">Sign Up</button>
          </div>
          {
            errorMessage && <p className="text-red-500">{errorMessage}</p>
          }
          {
            success && <p className="text-green-400">Sign Up Successful!</p>
          }
          
        </form>
      </div>
    </div>
  );
};

export default SignUp;