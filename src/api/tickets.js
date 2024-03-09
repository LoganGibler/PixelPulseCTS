import axios from "axios";
// const url = "https://pixelpulseapi-0sgu.onrender.com";
const url = "http://localhost:8000";
import moment from "moment";

const headersTemp = document.cookie.split(";"); // <-- this get all cookies saves and splits them in the array.
const finalHeaders = {};
if (headersTemp[0] !== "") {
  headersTemp.forEach((header) => {
    // <-- looping on all cookies
    const headerTemp = header.split("="); // <-- split each cookie to get key and value
    finalHeaders[headerTemp[0].trim()] = headerTemp[1].trim(); // <-- save on object to access using keys.
  });
}

export async function getTeamsTickets(type, userData) {
  let team = userData.team;
  try {
    const tickets = await axios.post(`${url}/ticket/getTicketsByTeamsAndDate`, {
      team: team,
      type: type,
    });

    let elements = tickets.data.ticketArray;

    if (elements === undefined || elements === 0 || elements === null) {
      return;
    }

    if (type === "Service Request") {
      return elements;
    } else {
      if (
        elements.length === 0 ||
        elements === null ||
        elements === undefined
      ) {
        return;
      } else {
        elements.sort((a, b) => a.dateCreated - b.dateCreated);
        elements.reverse();
        return elements;
      }
    }
  } catch (error) {
    console.log(error);
  }
}

export async function claimTicket(guideID, userData) {
  try {
    console.log(userData.name);
    const response = await axios.post(`${url}/ticket/assignTicket`, {
      _id: guideID,
      name: userData.name,
    });
    console.log(response);
  } catch (error) {
    console.log(error);
  }
}

export async function createTicket(
  type,
  title,
  description,
  involvedTeams,
  assignedTeam,
  priority,
  isPaging,
  isMaster,
  userData,
  completeBy,
  implementationStart,
  implementationEnd,
  permissions,
  relatedTicket,
  emergency
) {
  try {
    const response = await axios.post(`${url}/ticket/createTicket`, {
      title: title,
      type: type,
      description: description,
      involvedTeams: involvedTeams,
      team: assignedTeam,
      priority: priority,
      master: isMaster,
      paging: isPaging,
      submitter: userData.name,
      completeBy: completeBy,
      implementationStart: implementationStart,
      implementationEnd: implementationEnd,
      elevatedAccess: permissions,
      relatedTicket: relatedTicket,
      emergency: emergency,
    });
    // console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function getAllUnresolvedTickets(type) {
  try {
    const response = await axios.post(`${url}/ticket/getAllUnresolvedTickets`, {
      type: type,
    });
    const sortedTickets = response.data.tickets.sort(
      (a, b) => parseInt(b.ticketNumber) - parseInt(a.ticketNumber)
    );
    return sortedTickets;
  } catch (error) {
    console.error(error);
  }
}

export async function searchTickets(search) {
  try {
    const response = await axios.post(`${url}/ticket/searchTickets`, {
      search: search,
    });

    // console.log(response.data.tickets);
    return response.data.tickets;
  } catch (error) {
    console.error(error);
  }
}

export async function findTicketByTicketNumber(ticketNumber) {
  try {
    const response = await axios.post(`${url}/ticket/getTicketByTicketNumber`, {
      ticketNumber: ticketNumber,
    });

    // console.log(response.data.ticket);
    return response.data.ticket;
  } catch (error) {
    console.error(error);
  }
}

export async function updateTicket(ticketValues, user) {
  console.log(ticketValues);
  try {
    const response = await axios.post(`${url}/ticket/updateTicket`, {
      ticketValues: ticketValues,
      user: user,
    });

    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
  }
}
