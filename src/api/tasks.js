import axios from "axios";
const url = "https://pixelpulseapi-0sgu.onrender.com";
// const url = "http://localhost:8000";

const headersTemp = document.cookie.split(";"); // <-- this get all cookies saves and splits them in the array.
const finalHeaders = {};
if (headersTemp[0] !== "") {
	headersTemp.forEach((header) => {
		// <-- looping on all cookies
		const headerTemp = header.split("="); // <-- split each cookie to get key and value
		finalHeaders[headerTemp[0].trim()] = headerTemp[1].trim(); // <-- save on object to access using keys.
	});
}

export async function getUserTasks(team) {
	try {
		const tasks = await axios.post(
			`${url}/task/getAssignedTasks`,
			{
				team: team,
			},
			{
				headers: {
					authorization: finalHeaders.session_token,
					user_id: finalHeaders.user_id,
				},
			}
		);

		return tasks;
	} catch (error) {
		console.error(error);
	}
}

export async function claimTask(taskID, user) {
	try {
		const response = await axios.post(
			`${url}/task/claimTask`,
			{
				taskID: taskID,
				user: user,
			},
			{
				headers: {
					authorization: finalHeaders.session_token,
					user_id: finalHeaders.user_id,
				},
			}
		);
		// console.log(response);
		return response;
	} catch (error) {
		throw error;
	}
}

export async function getTicketTasks(ticketNumber) {
	try {
		// console.log("Param ticeket num:", ticketNumber);
		const response = await axios.post(
			`${url}/task/getTicketTasks`,
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

		// console.log("RESPONSE: ", response.data.tasks);
		return response.data.tasks;
	} catch (error) {
		throw error;
	}
}

export async function updateTaskStatus(taskID, status) {
	try {
		const response = await axios.post(
			`${url}/task/updateTaskStatus`,
			{
				taskID: taskID,
				status: status,
			},
			{
				headers: {
					authorization: finalHeaders.session_token,
					user_id: finalHeaders.user_id,
				},
			}
		);
		// console.log(response);
		return response;
	} catch (error) {
		throw error;
	}
}

export async function deleteTaskByID(taskID) {
	try {
		const response = await axios.post(
			`${url}/task/deleteTaskByID`,
			{
				taskID: taskID,
			},
			{
				headers: {
					authorization: finalHeaders.session_token,
					user_id: finalHeaders.user_id,
				},
			}
		);
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
		const response = await axios.post(
			`${url}/task/createTask`,
			{
				ticketNumber: ticketNumber,
				assignedTeam: assignedTeam,
				description: description,
				completeBy: new Date(completeBy),
				submittedBy: submittedBy,
			},
			{
				headers: {
					authorization: finalHeaders.session_token,
					user_id: finalHeaders.user_id,
				},
			}
		);
		// console.log(response);
		return "Task Created!";
	} catch (error) {
		console.log(error);
	}
}
