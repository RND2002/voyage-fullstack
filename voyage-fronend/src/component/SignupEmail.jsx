// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { executeActivateAccountApi, executeSignupApi } from "../api/AuthApiService";


// const SignupEmail = () => {
//   const [signUpData,setSignUpData]=useState[{
//     firstname:'',
//     lastname:'',
//     email:'',
//     password:''
//   }]
//   const [token,setToken]=useState(null)
//   const [errorMessage,setErrorMessage]=useState('')
//   const navigate=useNavigate()
//   const handleFormChange=(e)=>{
//     const {name,value}=e.target
//     setSignUpData(prevData=>({
//       ...prevData,
//       [name]:value
//     }))
//   }
//   async function handleSubmit(){
//     const response=await executeSignupApi(signUpData)
//     if(response.staus===200){
//       const response=await executeActivateAccountApi(token)
//       if(response.status===200){
//         navigate('/profile')
//       }else{
//         setErrorMessage("Invalid Token Please check the token")
//       }
//     }else{
//       setErrorMessage("Sorry for the inconvenience try again")
//     }
//   }
//   return (
//     <div className="min-h-screen bg-dirtWhite flex justify-center items-center">
//       <div className="flex flex-col items-center border rounded-md bg-white w-full h-[80vh] max-w-md p-6">
//         <h2 className="text-2xl md:text-3xl font-poppins font-medium mt-6">Signup with Email</h2>

//         <div className="mt-10 mx-4">
//           <h3 className="font-medium text-center">
//             Enter your email address to create an account.
//           </h3>
//         </div>
//         <form onSubmit={handleSubmit}>
//         <div className="flex flex-row mr-2">
//         <div className="mt-10">
//           <h3 className="font-normal text-xs">First Name</h3>
//           <input
//             type="text"
//             placeholder="First Name"
//             value={signUpData.firstname}
//             onChange={handleFormChange}
//             className="border-b border-gray-800 w-full px-3 py-2 focus:outline-none"
//           />
//         </div>
//         <div className="mt-10">
//           <h3 className="font-normal text-xs">last Name</h3>
//           <input
//             type="text"
//             placeholder="Last Name"
//             value={signUpData.lastname}
//             onChange={handleFormChange}
//             className="border-b border-gray-800 w-full px-3 py-2 focus:outline-none"
//           />
//         </div>
//         </div>

//         <div className="mt-10">
//           <h3 className="font-normal text-xs">Your Email</h3>
//           <input
//             type="email"
//             placeholder="Email"
//             value={signUpData.email}
//             onChange={handleFormChange}
//             className="border-b border-gray-800 w-full px-3 py-2 focus:outline-none"
//           />
//         </div>
//        <div className="flex flex-row mr-2">
//        <div className="mt-10">
//           <h3 className="font-normal text-xs">Password</h3>
//           <input
//             type="password"
//             placeholder="Password"
//             value={signUpData.password}
//             onChange={handleFormChange}
//             className="border-b border-gray-800 w-full px-3 py-2 focus:outline-none"
//           />
//         </div>
        
//         <div className="mt-10">
//           <h3 className="font-normal text-xs">Confirm Password</h3>
//           <input
//             type="password"
//             placeholder="Confirm Password"
//             className="border-b border-gray-800 w-full px-3 py-2 focus:outline-none"
//           />
//         </div>
//        </div>

//         <div className="flex justify-center mt-10">
//           <button className="flex justify-center items-center border border-black bg-black rounded-full h-10 w-full max-w-sm px-4 text-white">
//             Continue
//           </button>
//         </div>
//         </form>


//         <div className="mt-20 mx-4">
//           <p className="font-normal text-xs text-center">
//             This site is protected by reCAPTCHA Enterprise and the Google Privacy Policy and Terms of Service apply.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignupEmail;
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { executeActivateAccountApi, executeSignupApi } from "../api/AuthApiService";


const SignupEmail = () => {
  const [signUpData, setSignUpData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: ''
  });
  const [token, setToken] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showTokenInput, setShowTokenInput] = useState(false);
  const navigate = useNavigate();

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setSignUpData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  async function handleSubmit(e) {
    e.preventDefault()
    const response = await executeSignupApi(signUpData);
    if (response.status === 202) {
      console.log(response.status)
      setShowTokenInput(true);
    } else {
      setErrorMessage("Sorry for the inconvenience, please try again.");
    }
  }

    async function handleTokenSubmit(e) {
      // const tokenData= {
      //   token:token
      // }
      
      e.preventDefault()
      const response = await executeActivateAccountApi(token);
      if (response.status === 200) {
        navigate('/profile');
      } else {
        setErrorMessage("Invalid token. Please check the token and try again.");
      }
    }

  return (
    <div className="min-h-screen bg-dirtWhite flex justify-center items-center">
      <div className="flex flex-col items-center border rounded-md bg-white w-full h-[80vh] max-w-md p-6">
        <h2 className="text-2xl md:text-3xl font-poppins font-medium mt-6">Signup with Email</h2>

        <div className="mt-10 mx-4">
          <h3 className="font-medium text-center">
            Enter your email address to create an account.
          </h3>
        </div>
        <form onSubmit={handleSubmit} >
          <div className="flex flex-row mr-2">
            <div className="mt-10">
              <h3 className="font-normal text-xs">First Name</h3>
              <input
                type="text"
                placeholder="First Name"
                name="firstname"
                value={signUpData.firstname}
                onChange={handleFormChange}
                className="border-b border-gray-800 w-full px-3 py-2 focus:outline-none"
              />
            </div>
            <div className="mt-10">
              <h3 className="font-normal text-xs">last Name</h3>
              <input
                type="text"
                placeholder="Last Name"
                name="lastname"
                value={signUpData.lastname}
                onChange={handleFormChange}
                className="border-b border-gray-800 w-full px-3 py-2 focus:outline-none"
              />
            </div>
          </div>

          <div className="mt-10">
            <h3 className="font-normal text-xs">Your Email</h3>
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={signUpData.email}
              onChange={handleFormChange}
              className="border-b border-gray-800 w-full px-3 py-2 focus:outline-none"
            />
          </div>
          <div className="flex flex-row mr-2">
            <div className="mt-10">
              <h3 className="font-normal text-xs">Password</h3>
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={signUpData.password}
                onChange={handleFormChange}
                className="border-b border-gray-800 w-full px-3 py-2 focus:outline-none"
              />
            </div>

            <div className="mt-10">
              <h3 className="font-normal text-xs">Confirm Password</h3>
              <input
                type="password"
                placeholder="Confirm Password"
                className="border-b border-gray-800 w-full px-3 py-2 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex justify-center mt-10">
            <button type="submit" className="flex justify-center items-center border border-black bg-black rounded-full h-10 w-full max-w-sm px-4 text-white">
              Continue
            </button>
          </div>
        </form>

        {showTokenInput && (
          <div className="mt-4">
            <h3 className="font-medium text-center mb-2">Enter Token</h3>
            <input
              type="text"
              placeholder="Token"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              className="border-b border-gray-800 w-full px-3 py-2 focus:outline-none"
            />
            <button onClick={handleTokenSubmit} className="block mx-auto mt-4 bg-black text-white px-4 py-2 rounded-lg">Submit Token</button>
          </div>
        )}

        <div className="mt-20 mx-4">
          <p className="font-normal text-xs text-center">
            This site is protected by reCAPTCHA Enterprise and the Google Privacy Policy and Terms of Service apply.
          </p>
        </div>

        {errorMessage && (
          <div className="mt-4 text-red-500">{errorMessage}</div>
        )}
      </div>
    </div>
  );
};

export default SignupEmail;
