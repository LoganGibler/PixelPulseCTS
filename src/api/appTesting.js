import axios from "axios";
const url = "http://localhost:8000";

// async function createManyUsers() {
//   try {
//     for (let i = 116; i < 130; i++) {
//       const response = await axios.post(`${url}/user/createUser`, {
//         name: "JohnDoe" + i,
//         email: "JohnDoe" + i + "@pixelpulse.tech",
//         role: "user",
//         team: ["Supply Chain"],
//         officePhone: "(+1) 555-555-5555",
//         pagerPhone: "(+1) 555-555-5555",
//       });
//       console.log(`User created: ${response.data.user.name}`);
//     }
//     console.log("All users created successfully!");
//   } catch (error) {
//     console.error("Error creating users:", error);
//     throw error; // Optional: rethrow the error if needed
//   }
// }

// createManyUsers();

async function createManyTickets() {
  try {
    for (let i = 1; i < 10; i++) {
      const requestBody = {
        title:
          i +
          " " +
          "This Change ticket was created with a script for testing. A realistic production environment must be created for proper QA testing.",
        type: "Change",
        description:
          "Accumsan tortor posuere ac ut consequat semper viverra nam libero. Lectus arcu bibendum at varius vel pharetra vel turpis. Aliquam id diam maecenas ultricies mi eget. Tempor commodo ullamcorper a lacus vestibulum sed arcu non. Etiam erat velit scelerisque in dictum non consectetur a. Elementum integer enim neque volutpat ac tincidunt vitae semper quis. Hendrerit dolor magna eget est lorem ipsum dolor sit. Velit ut tortor pretium viverra suspendisse potenti nullam. Adipiscing commodo elit at imperdiet dui accumsan. Vitae turpis massa sed elementum tempus egestas.",
        involvedTeams: [
          "EAI Infrastructure",
          "Cloud & Microsoft Services",
          "DBA Oracle",
          "DBA SQL",
        ],
        team: "DatacenterOps",
        priority: "4",
        master: false,
        paging: false,
        submitter: "Jane Doe",
        completeBy: "2024-03-18T18:18:00.000Z",
        implementationStart: "2024-03-29T18:45:00.000Z",
        implementationEnd: "2024-03-30T18:45:00.000Z",
        elevatedAccess: "",
        relatedTicket: "",
        emergency: false,
      };

      const response = await axios.post(
        `${url}/ticket/createTicket`,
        requestBody
      );

      console.log(`Ticket ${i + 1} created:`, response.data.createdTicket);
    }
  } catch (error) {
    console.error("Error creating users:", error);
    throw error; // Optional: rethrow the error if needed
  }
}

createManyTickets();
