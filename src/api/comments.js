import axios from "axios";
const url = "http://localhost:8000";

export async function getComments(ticketNumber) {
  try {
    const response = await axios.post(`${url}/comment/getComments`, {
      ticketNumber: ticketNumber,
    });
    // console.log(response);
    return response.data.ticketComments;
  } catch (error) {
    throw error;
  }
}

export async function createComment(ticketNumber, user, comment) {
  try {
    const response = await axios.post(`${url}/comment/createComment`, {
      ticketNumber: ticketNumber,
      author: user,
      comment: comment,
    });
    return response;
  } catch (error) {
    throw error;
  }
}

export async function updateComment(comment_id, comment, user, ticketNumber) {
  try {
    const response = await axios.post(`${url}/comment/updateComment`, {
      comment_id: comment_id,
      comment: comment,
      user: user,
      ticketNumber: ticketNumber,
    });

    // console.log("Response from ticket update:", response);
    return response;
  } catch (error) {
    throw error;
  }
}
