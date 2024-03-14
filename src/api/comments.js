import axios from "axios";
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

export async function getComments(ticketNumber) {
  try {
    const response = await axios.post(
      `${url}/comment/getComments`,
      {
        ticketNumber: ticketNumber,
      },
      {
        headers: {
          authorization: finalHeaders.session_token,
          user_id: finalHeaders.user_id,
        },
      }
    );
    // console.log(response);
    return response.data.ticketComments;
  } catch (error) {
    throw error;
  }
}

export async function createComment(ticketNumber, user, comment) {
  try {
    const response = await axios.post(
      `${url}/comment/createComment`,
      {
        ticketNumber: ticketNumber,
        author: user,
        comment: comment,
      },
      {
        headers: {
          authorization: finalHeaders.session_token,
          user_id: finalHeaders.user_id,
        },
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
}

export async function updateComment(comment_id, comment, user, ticketNumber) {
  try {
    const response = await axios.post(
      `${url}/comment/updateComment`,
      {
        comment_id: comment_id,
        comment: comment,
        user: user,
        ticketNumber: ticketNumber,
      },
      {
        headers: {
          authorization: finalHeaders.session_token,
          user_id: finalHeaders.user_id,
        },
      }
    );

    // console.log("Response from ticket update:", response);
    return response;
  } catch (error) {
    throw error;
  }
}
