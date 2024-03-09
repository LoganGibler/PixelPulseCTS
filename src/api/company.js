import axios from "axios";
// const url = "https://pixelpulseapi-0sgu.onrender.com";
const url = "http://localhost:8000";

export async function getCompanyTeams() {
  try {
    const response = await axios.get(`${url}/companyInfo/getCompanyTeams`);
    // console.log(response);
    return response.data.companyTeams.teams;
  } catch (error) {
    throw error;
  }
}
