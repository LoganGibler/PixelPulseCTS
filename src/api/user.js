import axios from "axios";
import Cookies from "universal-cookie";
const cookies = new Cookies();

// const url = "https://pixelpulseapi-0sgu.onrender.com";
const url = "http://localhost:8000";

const headersTemp = document.cookie.split(";"); // <-- this get all cookies saves and splits them in the array.
const finalHeaders = {};
if (headersTemp[0] !== "") {
  headersTemp.forEach((header) => {
    // <-- looping on all cookies
    const headerTemp = header.split("="); // <-- split each cookie to get key and value
    finalHeaders[headerTemp[0].trim()] = headerTemp[1].trim(); // <-- save on object to access using keys.
  });
}

export async function createUser(
  username,
  email,
  team,
  officePhone,
  pagerPhone,
  role
) {
  try {
    const createdUser = await axios.post(
      `${url}/user/createUser`,
      {
        name: username,
        email: email,
        role: role,
        team: team,
        officePhone: officePhone,
        pagerPhone: pagerPhone,
      },
      {
        headers: {
          authorization: finalHeaders.session_token,
          user_id: finalHeaders.user_id,
        },
      }
    );
    console.log("HERE is created user: ", createUser);
    return createdUser.data;
  } catch (error) {
    throw error;
  }
}

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
    const userList = await axios.get(`${url}/user/getAllUsers`, {
      headers: {
        authorization: finalHeaders.session_token,
        user_id: finalHeaders.user_id,
      },
    });
    return userList.data.users;
  } catch (error) {
    console.error(error);
  }
}

export async function searchUser(search) {
  try {
    const response = await axios.post(
      `${url}/user/searchUsers`,
      {
        search: search.toString(),
      },
      {
        headers: {
          authorization: finalHeaders.session_token,
          user_id: finalHeaders.user_id,
        },
      }
    );
    // console.log("response: ", response.data.foundUsers);
    return response.data.foundUsers;
  } catch (error) {
    console.error(error);
  }
}
