import axios from "axios";
// const url = "https://pixelpulseapi-0sgu.onrender.com";
const url = "http://localhost:8000";

export async function getUserTasks(team) {
  try {
    const tasks = await axios.post(`${url}/task/getAssignedTasks`, {
      team: team,
    });

    return tasks;
  } catch (error) {
    console.error(error);
  }
}

export async function claimTask(taskID, user) {
  try {
    const response = await axios.post(`${url}/task/claimTask`, {
      taskID: taskID,
      user: user,
    });
    console.log(response);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function getTicketTasks(ticketNumber) {
  try {
    // console.log("Param ticeket num:", ticketNumber);
    const response = await axios.post(`${url}/task/getTicketTasks`, {
      ticketNumber: ticketNumber,
    });

    // console.log("RESPONSE: ", response.data.tasks);
    return response.data.tasks;
  } catch (error) {
    throw error;
  }
}

export async function updateTaskStatus(taskID, status) {
  try {
    const response = await axios.post(`${url}/task/updateTaskStatus`, {
      taskID: taskID,
      status: status,
    });
    // console.log(response);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function deleteTaskByID(taskID) {
  try {
    const response = await axios.post(`${url}/task/deleteTaskByID`, {
      taskID: taskID,
    });
    // console.log(response);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function createTask(
  ticketNumber,
  assignedTeam,
  description,
  completeBy,
  submittedBy
) {
  try {
    const response = await axios.post(`${url}/task/createTask`, {
      ticketNumber: ticketNumber,
      assignedTeam: assignedTeam,
      description: description,
      completeBy: new Date(completeBy),
      submittedBy: submittedBy,
    });
    console.log(response);
    return "Task Created!";
  } catch (error) {
    console.log(error);
  }
}
