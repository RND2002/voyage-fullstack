import { apiClient } from "./ApiClient";

export const executeAuthenticationService = (email, password) => {
    const requestBody = {
        email: email,
        password: password
    };

    // Make a POST request with the JSON data in the body
    return apiClient.post(`/auth/authenticate`, requestBody, {
        headers: {
            'Content-Type': 'application/json' // Set content type as JSON
        }
    });
};

export const executeSignupApi=(signUpData)=>{
    return apiClient.post(`/auth/register`,signUpData,{

    })
}
// export const executeActivateAccountApi=(token)=>{
//     return apiClient.get(`/auth/activate-account`,token,{

//     })
// }
export const executeActivateAccountApi = async (token) => {
    // eslint-disable-next-line no-useless-catch
    
      return apiClient.get(`/auth/activate-account?token=${token}`);
    
  };
  
