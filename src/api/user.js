import axios from "axios";
import Cookies from "universal-cookie";
const cookies = new Cookies();

// const url = "https://pixelpulseapi-0sgu.onrender.com";
const url = "http://localhost:8000"

// export async function createUser(){
//     try {
//         const createdUser = await axios.post(`${url}/user/createUser`, {

//         })
//     } catch (error) {

//     }
// }

export async function loginUser(email, password) {
  try {
    const response = await axios.post(`${url}/user/loginUser`, {
      email: email,
      password: password,
    });

    document.cookie = `session_token=${response.data.token}`;
    document.cookie = `user_id=${response.data.userID}`;
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function userList() {
  try {
    const userList = await axios.get(`${url}/user/getAllUsers`);
    return userList.data.users;
  } catch (error) {
    console.error(error);
  }
}
