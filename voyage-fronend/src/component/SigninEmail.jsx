import { useState } from "react";
import { MdKeyboardArrowLeft } from "react-icons/md";
import {useAuth} from '../auth/AuthContext'
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";
const SigninEmail = () => {
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [error,setError]=useState(false)
  const authContext=useAuth()
  const navigate=useNavigate()
  function handleEmailChange(e){
    setEmail(e.target.value)
   
  }

  async function goToFeedsPage(){
    await navigate(`/feeds`)
  }

  function handlePasswordChange(e){
    setPassword(e.target.value)
  }
  const handleLoginForm = async (e) => {
    e.preventDefault();
    try {
      if (await authContext.login(email, password)) {
        console.log("done");
        //console.log(authContext.token)
        // navigate(`/feeds`)
        goToFeedsPage();
      } else {
        setError(true)
        console.log("error");
      }
    } catch (error) {
      console.error("Error occurred during login:", error);
    }
  };
  
  return (
    <>
    
      <div className="h-[100vh] bg-dirtWhite flex justify-center items-center ">
        <div className="flex flex-col items-center  border rounded-md bg-white h-[90vh] w-[80vh]">
          <div className="text-2xl mt-6 md:text-3xl font-poppins font-medium">
            <h2>Sign in with Email </h2>
          </div>
          {error && <div><h5 className="text-red-700 font-bold text-md ">Email or password is not valid </h5></div>}
          <div className="mx-4 mt-20 md:mx-20 ">
            <h3 className="font-medium">
            Enter the email address associated with your account, and we’ll send a magic link to your inbox.
            </h3>
          </div>
          <form onSubmit={handleLoginForm}>
          <div className="mt-10 ">
            <h3 className="font-normal text-xs">Your Email</h3>
          </div>
          <div className="mt-10">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
              className="border-b border-gray-800 w-full px-3 py-2 focus:outline-none"
            />
            
          </div>
          <div className="mt-10">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              className="border-b border-gray-800 w-full px-3 py-2 focus:outline-none"
            />
            
          </div>
          {/* <div className="mt-1"><FaGoogle size={32}/></div> */}

          <div className="flex justify-around border border-black bg-black rounded-full h-10 w-[30vh]  mt-10">
            <button type="submit" className="text-white">Continue</button>
            
          </div>
          </form>
          {/* <div className="mt-10">
            <span className="font-medium">No account? </span>
            <span className="text-green-700 font-semibold">Create one</span>
          </div> */}
          <div className="mt-10 mx-auto flex flex-row">
          <div><MdKeyboardArrowLeft/></div>
            <div>
            <p className="text-xs text-green-800 font-medium">
              All Signin Options.
            </p>
            </div>
           
          </div>
          {/* <div className="mt-20 mx-20">
            <p className="font-normal text-xs">
            This site is protected by reCAPTCHA Enterprise and the
Google Privacy Policy and Terms of Service apply.
            </p>
          </div> */}
        </div>
      </div>
    </>
  );
};

SigninEmail.propTypes = {
  authentication: PropTypes.func.isRequired, // Ensure authentication is a function
};

export default SigninEmail;
