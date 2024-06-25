import axios from "axios";
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

export async function getCompanyTeams() {
  try {
    const response = await axios.get(`${url}/companyInfo/getCompanyTeams`, {
      headers: {
        authorization: finalHeaders.session_token,
        user_id: finalHeaders.user_id,
      },
    });
    // console.log(response);
    return response.data.companyTeams.teams;
  } catch (error) {
    throw error;
  }
}

export async function getTeams() {
  try {
    const response = await axios.get(`${url}/teamInfo/getTeams`, {
      headers: {
        authorization: finalHeaders.session_token,
        user_id: finalHeaders.user_id,
      },
    });
    return response.data.teams;
  } catch (error) {
    throw error;
  }
}

export async function getTeamById(id) {
  try {
    const response = await axios.post(
      `${url}/teamInfo/getTeamById`,
      { id: id },
      {
        headers: {
          authorization: finalHeaders.session_token,
          user_id: finalHeaders.user_id,
        },
      }
    );
    return response.data.team;
  } catch (error) {
    console.error(error);
  }
}
